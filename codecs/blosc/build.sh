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
