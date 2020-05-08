#!/bin/sh
set -e
mkdir build
cd build

export OPTIMIZE="-Os -flto --llvm-lto 1"
export LDFLAGS="${OPTIMIZE}"
export CFLAGS="${OPTIMIZE}"
export CPPFLAGS="${OPTIMIZE}"

echo "============================================="
echo "Compiling blosc"
echo "============================================="
# @trevor: As a note to future self and others, we use this forked c-blosc
# because I wasn't sure how to compile blosc with a wasm-compatible
# configuration otherwise.
#
# Changes:
#
# -./CMakeList.txt:
#   - BUILD_BENCHMARKS OFF
#   - BUILD_SHARED     OFF
#   - BUILD_TESTS      OFF
#   - DEACTIVATE_AVX2   ON
#   - DEACTIVATE_SSE2   ON -- AVX2 and SSE2 are not supported in WebAssembly
#
# - Add  '#include <unistd.h>' headers to ./internal-complibs/zlib-1.2.8/*:
#   - ./gzlib.c
#   - ./gzread.c
#   - ./gwrite.c
#
# Perhaps there is a way to use emscriptens zlib, but this works for now.
#
emcmake cmake ../c-blosc
cmake --build .

echo "============================================="
echo "Compiling wasm bindings"
echo "============================================="
cd ../

# Should try USE_ES6_IMPORT_META=0, to run testing?
emcc blosc_codec.c \
  ${OPTIMIZE} \
  -s STRICT=1 \
  -s EXPORT_ES6=1 \
  -s MODULARIZE=1 \
  -s MALLOC=emmalloc \
  -s EXPORTED_FUNCTIONS="['_free', '_malloc', '_b_decompress', '_b_compress', '_get_nbytes']" \
  -s 'EXPORT_NAME="blosc_codec"' \
  -I c-blosc/blosc \
  -lblosc \
  -L build/blosc \
  -o blosc_codec.js
