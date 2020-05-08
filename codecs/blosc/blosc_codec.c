#include "blosc.h"
#include "stdint.h"

size_t get_nbytes(uint8_t *src)
{
    size_t cbytes;
    size_t blocksize;
    size_t nbytes;
    blosc_cbuffer_sizes(src, &nbytes, &cbytes, &blocksize);
    return nbytes;
}

int b_decompress(uint8_t *src, uint8_t *dest)
{
    int dsize;
    dsize = blosc_decompress_ctx(src, dest, dsize, 1);
    return dsize;
}

int b_compress(uint8_t *src, uint8_t *dest, int clevel, int shuffle, int blocksize, int nbytes, int cindex)
{
    char *compressors[] = {"blosclz", "lz4", "lz4hc", "snappy", "zlib", "zstd"};
    const char *cname;
    int dsize;
    int cbytes;

    cname = compressors[cindex];
    cbytes = blosc_compress_ctx(
        clevel,
        shuffle,
        sizeof(int),
        nbytes,
        src,
        dest,
        nbytes + BLOSC_MAX_OVERHEAD,
        cname,
        blocksize,
        1);

    return cbytes;
}
