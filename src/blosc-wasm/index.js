import Codec from '/codec.js';

const baseUrl =
  `https://gist.githubusercontent.com/manzt/` +
  `a20e2a78267b992b1f6c9ca036b91db9/raw/` +
  `c76b54c4d612871e9c4df0a124080af11eca42a5`;

(async () => {
  const chunkData = await fetch(`${baseUrl}/1.0`)
    .then((res) => res.arrayBuffer())
    .then((buf) => new Uint8Array(buf));

  const res = await fetch(`${baseUrl}/.zarray`);
  const metadata = await res.json();
  console.log(metadata.compressor);
  console.log(chunkData);
  // blocksize: 0, clevel: 5, cname: "lz4", id: "blosc", shuffle: 1
  const codec = await Codec.fromConfig(metadata.compressor);
  const decoded = codec.decode(chunkData);
  console.log(new Uint32Array(decoded.buffer));
  const encoded = codec.encode(decoded);
  console.log(encoded);
  console.log(new Uint32Array(codec.decode(encoded).buffer));
})();
