import { median } from './common';

describe('median', () => {
  it('should return correct result for an array of odd length', () => {
    const numbers = [1, 2, 3];
    expect(median(numbers)).toBe(2);
  });
  it('should return correct result for an array of even length', () => {
    const numbers = [1, 2, 3, 4];
    expect(median(numbers)).toBe(2.5);
  });
  it('should return null for an empty', () => {
    const numbers = [];
    expect(median(numbers)).toBe(null);
  });
  it('should return null if size of an array is < 2', () => {
    const numbers = [1];
    expect(median(numbers)).toBe(null);
  });
});
