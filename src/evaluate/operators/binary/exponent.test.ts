import {exponent} from './exponent.js';
import {createLiteral} from '@/utils/index.js';

describe('operators/binary/exponent', () => {
  it.each([
    [5, 2, 25],
    ["5", 2, 25],
    [null, null, 1]
  ])("valid", (leftValue, rightValue, expectation) => {
    const left = createLiteral(leftValue);
    const right = createLiteral(rightValue);
    const result = exponent(left, right);
    expect(result).toEqual(createLiteral(expectation));
  });

  it.each([
    ["a", 2],
    ["a", "b"]
  ])("invalid", (leftValue, rightValue) => {
    const left = createLiteral(leftValue);
    const right = createLiteral(rightValue);
    expect(() => exponent(left, right)).toThrowError();
  });
});
