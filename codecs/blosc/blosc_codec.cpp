#include "emscripten/bind.h"
#include "emscripten/val.h"
#include "blosc.h"
#include <string>

using namespace emscripten;

uint8_t *last_result;
val decompress(std::string buffer)
{
    size_t cbytes;
    size_t blocksize;
    size_t nbytes;
    int nthreads = 1;

    blosc_cbuffer_sizes((const uint8_t *)buffer.c_str(), &nbytes, &cbytes, &blocksize);

    last_result = (uint8_t *)malloc(nbytes);
    blosc_decompress_ctx((const uint8_t *)buffer.c_str(), last_result, nbytes, nthreads);

    return val(typed_memory_view(nbytes, last_result));
}

val compress(std::string buffer, std::string cname, int clevel, int shuffle, int blocksize)
{
    int nbytes;
    int nthreads = 1;

    last_result = (uint8_t *)malloc(buffer.size() + BLOSC_MAX_OVERHEAD);

    nbytes = blosc_compress_ctx(
        clevel,
        shuffle,
        sizeof(int),
        buffer.size(),
        (const uint8_t *)buffer.c_str(),
        last_result,
        buffer.size() + BLOSC_MAX_OVERHEAD,
        (const char *)cname.c_str(),
        blocksize,
        nthreads);

    return val(typed_memory_view(nbytes, last_result));
}

void free_result()
{
    free(last_result);
}

EMSCRIPTEN_BINDINGS(my_module)
{
    function("decompress", &decompress);
    function("compress", &compress);
    function("free_result", &free_result);
}
