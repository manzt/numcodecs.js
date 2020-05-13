#!/usr/bin/env bash

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

(
  emcc blosc_codec.cpp \
    ${OPTIMIZE} \
    --closure 1 \
    --bind \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s MODULARIZE=1 \
    -s EXPORT_ES6=1 \
    -s ENVIRONMENT="web" \
    -s EXPORT_NAME="blosc_codec" \
    -x c++ \
    --std=c++11 \
    -I c-blosc/blosc \
    -lblosc \
    -L build/blosc \
    -o blosc_codec.js \
)

echo "============================================="
echo "Encode binary as base64."
echo "============================================="

echo -en "const wasmBase64 = \`" > ./blosc_codec_wasm.js
base64 ./blosc_codec.wasm | tr -d "\n" >> ./blosc_codec_wasm.js
echo -en "\`;\n\nexport default wasmBase64;\n" >> ./blosc_codec_wasm.js

echo "============================================="
echo "Finished."
echo "============================================="
