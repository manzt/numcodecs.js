#include "emscripten/bind.h"
#include "emscripten/val.h"
#include "zstd.h"
#include <string>
#include <stdexcept>
//#include <iostream>
#include <algorithm>

using namespace emscripten;

char *dest_ptr;
val compress(std::string source, int level)
{
    const char *source_ptr = source.c_str();
    int source_size = source.size();

    int dest_size = ZSTD_compressBound(source_size);
    dest_ptr = (char *)malloc((size_t)dest_size);

    int compressed_size = ZSTD_compress(dest_ptr, dest_size, source_ptr, source_size, level);
    return val(typed_memory_view(compressed_size, (uint8_t *)dest_ptr));
}

val decompress(std::string source)
{
    // setup source buffer
    const char *source_ptr = source.c_str();
    int source_size = source.size();

    ZSTD_DStream * zds = ZSTD_createDStream();
    size_t status = ZSTD_initDStream(zds);

    ZSTD_inBuffer input = {
        .src = (void*) source.c_str(),
        .size = (size_t) source.size(),
        .pos = 0
    };
    ZSTD_outBuffer output = {
        .dst = NULL,
        .size = 0,
        .pos = 0,
    };

    if (ZSTD_isError(status)) {
        throw std::runtime_error("zstd codec error" + std::string(ZSTD_getErrorName(status)));
    }

    // setup destination buffer
    unsigned long long dest_size = ZSTD_getFrameContentSize(source_ptr, source_size);

    if (dest_size == ZSTD_CONTENTSIZE_UNKNOWN) {
        // guess
        dest_size = source_size*2;

        // Initialize the destination size to 1 MiB at minimum
        if (dest_size < 1024*1024)
            dest_size = 1024*1024;
    } else if (dest_size == ZSTD_CONTENTSIZE_ERROR) {
        // error
        throw std::runtime_error("zstd codec error: content size error");
    } else if (dest_size < 0) {
        // unknown error
        throw std::runtime_error("zstd codec error: unknown ZSTD_getFrameContentSize error");
    }


    output.dst = malloc((size_t) dest_size);

    if (output.dst == NULL) {
        // error, cannot allocate memory
        throw std::runtime_error("zstd codec error: cannot allocate output buffer");
    }

    output.size = dest_size;

    do {
        status = ZSTD_decompressStream(zds, &output, &input);

        if (ZSTD_isError(status)) {
            // error
            // TODO: free memory
            if (dest_ptr == output.dst)
                dest_ptr = (char *) NULL;
            free(output.dst);
            throw std::runtime_error("zstd codec error" + std::string(ZSTD_getErrorName(status)));
        }

        // std::cerr << "Status: " << status << std::endl;
        // std::cerr << "Size: " << output.size << std::endl;
        // std::cerr << "Pos: " << output.pos << std::endl;

        if (status > 0 && output.pos == output.size ) {
            // attempt to expand output buffer
            size_t new_size = output.size + std::max(status, (size_t) 1024*1024);

            if (new_size < output.size || new_size < status) {
                // overflow error
                if (dest_ptr == output.dst)
                    dest_ptr = (char *) NULL;
                free(output.dst);
                throw std::runtime_error("zstd codec error: output buffer overflow");
            }

            // Increase output buffer size
            void *new_dst = realloc(output.dst, new_size);

            if (new_dst == NULL) {
                if (dest_ptr == output.dst)
                    dest_ptr = (char *) NULL;
                free(output.dst);
                throw std::runtime_error("zstd codec error: could not expand output buffer");
            }
            output.dst = new_dst;

            output.size = new_size;
        }
    } while (status > 0);

    dest_ptr = (char *) output.dst;

    return val(typed_memory_view(output.pos, (uint8_t *)dest_ptr));
}

void free_result()
{
    free(dest_ptr);
}

EMSCRIPTEN_BINDINGS(my_module)
{
    function("decompress", &decompress);
    function("compress", &compress);
    function("free_result", &free_result);
}
