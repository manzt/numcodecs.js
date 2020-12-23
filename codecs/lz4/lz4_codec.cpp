#include "emscripten/bind.h"
#include "emscripten/val.h"
#include "lz4.h"
#include <string>

using namespace emscripten;

static inline void store_le32(char *c, int y)
{
    uint32_t x = (uint32_t) y;
    c[0] = x & 0xff;
    c[1] = (x >> 8) & 0xff;
    c[2] = (x >> 16) & 0xff;
    c[3] = (x >> 24) & 0xff;
}


static inline int load_le32(const char *c)
{
    const uint8_t *d = (const uint8_t *) c;
    uint32_t x = d[0] | (d[1] << 8) | (d[2] << 16) | (d[3] << 24);
    return (int) x;
}

static const int UINT32_SIZE = sizeof (uint32_t);

char *dest_ptr;
val compress(std::string source, int acceleration)
{
    const char *source_ptr = source.c_str();
    int source_size = source.size();
    int dest_size = LZ4_compressBound(source_size);

    dest_ptr = (char *)malloc((size_t)dest_size + UINT32_SIZE);
    store_le32(dest_ptr, source_size);
    char *dest_start = dest_ptr + UINT32_SIZE;

    int compressed_size = LZ4_compress_fast(
        source_ptr,
        dest_start,
        source_size,
        dest_size,
        acceleration
    );
    compressed_size += UINT32_SIZE;
    return val(typed_memory_view(compressed_size, (uint8_t *)dest_ptr));
}

val decompress(std::string source)
{
    // setup source buffer
    const char *source_ptr = source.c_str();
    int source_size = source.size();

    // setup destination buffer
    dest_ptr = (char *)malloc((size_t)source_size);
    int dest_size = load_le32(source_ptr);
    const char *source_start = source_ptr + UINT32_SIZE;
    source_size -= UINT32_SIZE;

    const int decompressed_size = LZ4_decompress_safe(source_start, dest_ptr, source_size, dest_size);
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
