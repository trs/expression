import {division} from './division.js';
import {createLiteral} from '@/utils/index.js';

describe('operators/binary/division', () => {
  it.each([
    [6, 2, 3],
    ["6", 2, 3],
    ["6", "2", 3],
  ])("valid", (leftValue, rightValue, expectation) => {
    const left = createLiteral(leftValue);
    const right = createLiteral(rightValue);
    const result = division(left, right);
    expect(result).toEqual(createLiteral(expectation));
  });

  it.each([
    ["a", "b"],
    [null, null]
  ])("invalid", (leftValue, rightValue) => {
    const left = createLiteral(leftValue);
    const right = createLiteral(rightValue);
    expect(() => division(left, right)).toThrowError();
  });
});