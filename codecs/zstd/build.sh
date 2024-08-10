#!/usr/bin/env bash
set -e

ROOT_DIR="node_modules"
rm -rf $ROOT_DIR

CODEC_URL="https://github.com/facebook/zstd"
CODEC_VERSION="v1.5.5"

CODEC_DIR="$ROOT_DIR/zstd"
BUILD_DIR="$CODEC_DIR/build"

export OPTIMIZE="-Os -flto"
export LDFLAGS=$OPTIMIZE
export CFLAGS=$OPTIMIZE
export CPPFLAGS=$OPTIMIZE

echo "============================================="
echo "Downloading facebook/zstd"
echo "============================================="

mkdir -p $CODEC_DIR
curl -L "$CODEC_URL/archive/$CODEC_VERSION.tar.gz" | tar -xzf - --strip 1 -C $CODEC_DIR

echo "============================================="
echo "Compiling zstd"
echo "============================================="

cd $BUILD_DIR
(
  emcmake cmake \
    -DZSTD_MULTITHREAD_SUPPORT=OFF \
    -DZSTD_BUILD_PROGRAMS=OFF \
    -DZSTD_BUILD_CONTRIB=OFF \
    -DZSTD_BUILD_TESTS=OFF \
    -DZSTD_BUILD_STATIC=ON \
    ./cmake
)

cmake --build .

echo "============================================="
echo "Compiling wasm bindings"
echo "============================================="

cd ../../../
(
  emcc zstd_codec.cpp \
    ${OPTIMIZE} \
    -I "$CODEC_DIR/lib" \
    --closure 1 \
    -fwasm-exceptions
    -s ALLOW_MEMORY_GROWTH=1 \
    -s MODULARIZE=1 \
    -s EXPORT_ES6=1 \
    -s USE_ES6_IMPORT_META=0 \
    -s ENVIRONMENT="webview" \
    -s MALLOC=emmalloc \
    -s EXPORT_NAME="zstd_codec" \
    -s EXPORT_EXCEPTION_HANDLING_HELPERS=1 \
    -x c++ \
    --std=c++17 \
    -lembind \
    -lzstd \
    -L "$BUILD_DIR/lib" \
    -o "zstd_codec.js"
)

echo "============================================="
echo "Finished."
echo "============================================="
