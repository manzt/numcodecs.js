#!/bin/sh

mkdir build
cd build

# compile blosc to llvm using emscripten
emcmake cmake ../c-blosc
cmake --build .

cd ../

mkdir target

cd target
cp ../c-blosc/examples/simple.c .

emcc simple.c \
  -O3 \
  -s WASM=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' \
  -s EXPORTED_FUNCTIONS="['_free', '_malloc']" \
  -s TOTAL_MEMORY=33554432 \
  -I ../c-blosc/blosc \
  -lblosc \
  -L ../build/blosc


emcc codec.c \
  -O3 \
  -s WASM=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' \
  -s EXPORTED_FUNCTIONS="['_free', '_malloc']" \
  -s TOTAL_MEMORY=33554432 \
  -I c-blosc/blosc \
  -lblosc \
  -L build/blosc

emcc codec.c \
  -Os \
  -s STRICT=1 \
  -s EXPORT_ES6=1 \
  -s MODULARIZE=1 \
  -s MALLOC=emmalloc \
  -s EXPORTED_FUNCTIONS="['_free', '_malloc', '_b_decompress', '_b_compress', '_get_nbytes']" \
  -I c-blosc/blosc \
  -lblosc \
  -L build/blosc


