#include "blosc.h"
#include "emscripten.h"
#include "stdint.h"

EMSCRIPTEN_KEEPALIVE
int decode(uint8_t* data_in, uint8_t* data_out) {
    int dsize;
    dsize = blosc_decompress_ctx(data_in, data_out, dsize, 1);
    return dsize;
}
