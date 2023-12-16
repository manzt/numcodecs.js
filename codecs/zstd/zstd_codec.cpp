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
    // setup source buffer
    const char *source_ptr = source.c_str();
    int source_size = source.size();

    // setup destination buffer
    int dest_size = ZSTD_getFrameContentSize(source_ptr, source_size);
    dest_ptr = (char *)malloc((size_t)dest_size);

    int decompressed_size = ZSTD_decompress(dest_ptr, dest_size, source_ptr, source_size);
    return val(typed_memory_view(decompressed_size, (uint8_t *)dest_ptr));
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
