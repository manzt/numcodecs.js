import { expect } from 'chai';

describe('First', () => {
  it('should not error', () => {
    const foo = 'bar';
    expect(foo).to.equal('bar');
    expect(foo).to.be.a('string');
  });
});
