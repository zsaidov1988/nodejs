const myLib = require('../mylib');

describe("absolute", () => {
  it('positive - positive', () => {
    const result = myLib.absolute(1);
    expect(result).toBe(1);
  })
  
  it('negative - positive', () => {
    const result = myLib.absolute(-1);
    expect(result).toBe(1);
  })
  
  it('zero - positive', () => {
    const result = myLib.absolute(0);
    expect(result).toBe(0);
  })
})
