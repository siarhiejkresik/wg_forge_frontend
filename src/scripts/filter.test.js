import { contain, containQueryString } from './filter';

describe('containQueryString', () => {
  it('should work when value and query are strings', () => {
    const obj = { a: '1234' };
    const query = '23';
    expect(containQueryString({ obj, query })).toBe(true);
  });
  it('should work when value is int and query is string', () => {
    const obj = { a: 1234 };
    const query = '23';
    expect(containQueryString({ obj, query })).toBe(true);
  });
  it('should work when object has more then one key', () => {
    const obj = { a: 'abc', b: 'cde' };
    expect(containQueryString({ obj, query: 'cd' })).toBe(true);
  });
  it('should work when value or query are of different cases', () => {
    const obj = { a: 'abc', b: 'Cde' };
    expect(containQueryString({ obj, query: 'cd' })).toBe(true);
    expect(containQueryString({ obj, query: 'Ab' })).toBe(true);
  });
  it('should return false if query is not in values', () => {
    const obj = { a: 'abc', b: 'def' };
    expect(containQueryString({ obj, query: 'gh' })).toBe(false);
  });
  it('should return false if object is empty', () => {
    const obj = {};
    expect(containQueryString({ obj, query: 3 })).toBe(false);
  });
  it('should return false if object is undefined', () => {
    expect(containQueryString({ query: 3 })).toBe(false);
  });
  it('should return false if query is undefined', () => {
    const obj = { a: 'undefined1' };
    expect(containQueryString({ obj })).toBe(false);
  });
  it('should work if whiteList is undefined', () => {
    const obj = { a: 'abc' };
    expect(
      containQueryString({
        obj,
        whiteList: undefined,
        query: 'b',
      }),
    ).toBe(true);
  });
  it('should work if whiteList is defined', () => {
    const obj = { a: 'abc', b: 'def' };
    expect(
      containQueryString({
        obj,
        whiteList: ['a'],
        query: 'de',
      }),
    ).toBe(false);
  });
  it('should work if blackList is undefined', () => {
    const obj = { a: 'abc' };
    expect(
      containQueryString({
        obj,
        blackList: undefined,
        query: 'b',
      }),
    ).toBe(true);
  });
  it('should work if both whiteList and blackList are defined', () => {
    const obj = { a: 'abc', b: 'def', c: 'ghi' };
    expect(
      containQueryString({
        obj,
        whiteList: ['a', 'b'],
        blackList: ['a'],
        query: 'def',
      }),
    ).toBe(true);
    expect(
      containQueryString({
        obj,
        whiteList: ['a', 'b'],
        blackList: ['a'],
        query: 'abc',
      }),
    ).toBe(false);
  });
});

describe('filter', () => {
  const obj1 = { a: 'abc', b: 'def' };
  const obj2 = { c: 'ghi', d: 'jkl' };
  let arr;
  beforeEach(() => {
    arr = [{ obj: obj1 }, { obj: obj2 }];
  });
  it('should return true if the first object values contain query', () => {
    const query = 'ab';
    expect(contain(query, arr)).toBe(true);
  });
  it('should return true if the second object values contain query', () => {
    const query = 'jk';
    expect(contain(query, arr)).toBe(true);
  });
  it('should return false if values of all objects don’t contain query', () => {
    const query = 'xz';
    expect(contain(query, arr)).toBe(false);
  });
});
