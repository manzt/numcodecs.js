#include "emscripten/bind.h"
#include "emscripten/val.h"
#include "zstd.h"
#include <string>

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
    // number of bytes to grow the output buffer if more space is needed
    const size_t DEST_GROWTH_SIZE = ZSTD_DStreamOutSize();

    // setup source buffer
    const char *source_ptr = source.c_str();
    int source_size = source.size();

    // create and initialize decompression stream / context
    // use the streaming API so that we can handle unkown frame content size
    ZSTD_DStream *zds = ZSTD_createDStream();

    size_t status = ZSTD_initDStream(zds);
    if (ZSTD_isError(status)) {
        ZSTD_freeDStream(zds);
        throw std::runtime_error("zstd codec error: " + std::string(ZSTD_getErrorName(status)));
    }

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

    // setup destination buffer
    unsigned long long dest_size = ZSTD_getFrameContentSize(source_ptr, source_size);

    // If Zstd_compressStream was used, we may not know the frame content size.
    // https://github.com/manzt/numcodecs.js/issues/46
    if (dest_size == ZSTD_CONTENTSIZE_UNKNOWN) {
        // guess decompressed buffer size based on source size
        dest_size = source_size*2;

        // Initialize the destination size to DEST_GROWTH_SIZE (default: 128 KiB) at minimum
        if (dest_size < DEST_GROWTH_SIZE)
            dest_size = DEST_GROWTH_SIZE;

    } else if (dest_size == ZSTD_CONTENTSIZE_ERROR) {
        ZSTD_freeDStream(zds);
        throw std::runtime_error("zstd codec error: content size error");
    } else if (dest_size < 0) {
        // unknown error
        ZSTD_freeDStream(zds);
        throw std::runtime_error("zstd codec error: unknown ZSTD_getFrameContentSize error");
    }

    // the output buffer will either be assigned to dest_ptr to be freed by free_result, or freed on error
    output.dst = malloc((size_t) dest_size);

    if (output.dst == NULL) {
        // error, cannot allocate memory
        ZSTD_freeDStream(zds);
        throw std::runtime_error("zstd codec error: cannot allocate output buffer");
    }

    output.size = dest_size;

    // Call ZSTD_decompressStream repeatedly until status == 0 or error (status < 0)
    do {
        status = ZSTD_decompressStream(zds, &output, &input);

        if (ZSTD_isError(status)) {
            if (dest_ptr == output.dst)
                dest_ptr = (char *) NULL;
            ZSTD_freeDStream(zds);
            free(output.dst);
            throw std::runtime_error("zstd codec error: " + std::string(ZSTD_getErrorName(status)));
        }

        if (status > 0 && output.pos == output.size ) {
            // attempt to expand output buffer in DEST_GROWTH_SIZE increments
            size_t new_size = output.size + DEST_GROWTH_SIZE;

            if (new_size < output.size || new_size < DEST_GROWTH_SIZE) {
                // overflow error
                ZSTD_freeDStream(zds);
                free(output.dst);
                throw std::runtime_error("zstd codec error: output buffer overflow");
            }

            // Increase output buffer size
            void *new_dst = realloc(output.dst, new_size);

            if (new_dst == NULL) {
                // free the original pointer if realloc fails.
                ZSTD_freeDStream(zds);
                free(output.dst);
                throw std::runtime_error("zstd codec error: could not expand output buffer");
            }
            // the old output.dst is freed by realloc is it succeeds
            output.dst = new_dst;

            output.size = new_size;
        }
        
    // status > 0 indicates there are additional bytes to process in this frame
    // status == 0 and input.pos < input.size suggests there may be an additional frame
    } while (status > 0 || input.pos < input.size);

    ZSTD_freeDStream(zds);

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
