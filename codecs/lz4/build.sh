#!/usr/bin/env bash
set -e

ROOT_DIR="node_modules"
rm -rf $ROOT_DIR

CODEC_URL="https://github.com/lz4/lz4"
CODEC_VERSION="v1.9.2"

CODEC_DIR="$ROOT_DIR/lz4"

export OPTIMIZE="-Os -flto"
export LDFLAGS=$OPTIMIZE
export CFLAGS=$OPTIMIZE
export CPPFLAGS=$OPTIMIZE

echo "============================================="
echo "Downloading lz4"
echo "============================================="

mkdir -p $CODEC_DIR
curl -L "$CODEC_URL/archive/$CODEC_VERSION.tar.gz" | tar -xzf - --strip 1 -C $CODEC_DIR

echo "============================================="
echo "Compiling lz4"
echo "============================================="

cd $CODEC_DIR
emmake make

echo "============================================="
echo "Compiling wasm bindings"
echo "============================================="

cd ../../
(
  emcc lz4_codec.cpp \
    ${OPTIMIZE} \
    -I "$CODEC_DIR/lib" \
    --closure 1 \
    --bind \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s MODULARIZE=1 \
    -s EXPORT_ES6=1 \
    -s USE_ES6_IMPORT_META=0 \
    -s ENVIRONMENT="webview" \
    -s MALLOC=emmalloc \
    -s EXPORT_NAME="lz4_codec" \
    -x c++ \
    --std=c++17 \
    -llz4 \
    -L $CODEC_DIR/lib \
    -o "lz4_codec.js"
)

echo "============================================="
echo "Finished."
echo "============================================="
