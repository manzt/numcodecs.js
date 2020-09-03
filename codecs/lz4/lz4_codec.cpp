#include "emscripten/bind.h"
#include "emscripten/val.h"
#include "lz4.h"
#include <string>

using namespace emscripten;

char *dest_ptr;
val compress(std::string source, int acceleration)
{
    const char *source_ptr = source.c_str();
    const int source_size = source.size();
    const int max_dest_size = LZ4_compressBound(source_size);

    dest_ptr = (char *)malloc((size_t)max_dest_size);

    const int compressed_size = LZ4_compress_fast(
        source_ptr,
        dest_ptr,
        source_size,
        max_dest_size,
        acceleration
    );

    return val(typed_memory_view(compressed_size, (uint8_t *)dest_ptr));
}

val decompress(std::string source)
{
    // setup source buffer
    const char *source_ptr = source.c_str();
    int source_size = source.size();

    // setup destination buffer
    dest_ptr = (char *)malloc((size_t)source_size);

    const int decompressed_size = LZ4_decompress_safe(source_ptr, dest_ptr, source_size, source_size);
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
