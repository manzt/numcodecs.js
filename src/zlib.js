import * as fflate from 'fflate';

/** @typedef {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} Level */
/**
 * @typedef Config
 * @property {Level} [level]
 */

export default class Zlib {
  static codecId = 'zlib';

  /** @param {Level} */
  constructor(level = 1) {
    /** @type {Level} */
    this.level = level;
  }

  /** @param {Config} config */
  static fromConfig({ level }) {
    return new Zlib(level);
  }

  /**
   * @param {Uint8Array} data
   * @returns {Uint8Array}
   */
  encode(data) {
    return fflate.zlibSync(data, { level: this.level });
  }

  /**
   * @param {Uint8Array} data
   * @returns {Uint8Array}
   */
  decode(data) {
    return fflate.unzlibSync(data);
  }
};
