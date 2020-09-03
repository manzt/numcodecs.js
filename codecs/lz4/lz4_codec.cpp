#include "emscripten/bind.h"
#include "emscripten/val.h"
#include "lz4.h"
#include <string>

using namespace emscripten;

// https://github.com/zarr-developers/numcodecs/blob/master/numcodecs/stdint_compat.h
static const int UINT32_SIZE = sizeof (uint32_t);

static inline int load_le32(const char *c)
{
    const uint8_t *d = (const uint8_t *) c;
    uint32_t x = d[0] | (d[1] << 8) | (d[2] << 16) | (d[3] << 24);
    return (int) x;
}

static inline void store_le32(char *c, int y)
{
    uint32_t x = (uint32_t) y;
    c[0] = x & 0xff;
    c[1] = (x >> 8) & 0xff;
    c[2] = (x >> 16) & 0xff;
    c[3] = (x >> 24) & 0xff;
}

char *dest_ptr;
val compress(std::string source, int acceleration)
{
    int dest_size, compressed_size;
    char *dest_start;

    // setup destination
    // NB: mostly translated from numcodecs/lz4.pyx
    dest_size = LZ4_compressBound((int) source.size());
    dest_ptr = (char *)malloc(dest_size + UINT32_SIZE);
    store_le32(dest_ptr, source.size());
    dest_start = dest_ptr + UINT32_SIZE;

    compressed_size = LZ4_compress_fast(
        (const char *)source.c_str(),
        dest_start,
        (int) source.size(),
        dest_size,
        acceleration
    );
    compressed_size += UINT32_SIZE;
    return val(typed_memory_view(compressed_size, (const uint8_t *)dest_ptr));
}

val decompress(std::string source)
{
    const char *source_ptr;
    const char *source_start;
    int source_size, dest_size, decompressed_size;

    // setup source buffer
    source_ptr = (const char *)source.c_str();
    source_size = source.size();

    // determine uuncompressed size
    dest_size = load_le32(source_ptr);
    source_start = source_ptr + UINT32_SIZE;
    source_size -= UINT32_SIZE;

    // setup destination buffer
    dest_ptr = (char *)malloc(dest_size);

    decompressed_size = LZ4_decompress_safe(source_ptr, dest_ptr, source_size, dest_size);
    return val(typed_memory_view(decompressed_size, (const uint8_t *)dest_ptr));
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
