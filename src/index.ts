export const registry = new Map()
  .set('gzip', () => import('./gzip'))
  .set('zlib', () => import('./zlib'));
