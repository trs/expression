import {subtraction} from './subtraction.js';
import {createLiteral} from '@/utils/index.js';

describe('operators/binary/subtraction', () => {
  it.each([
    [4, 2, 2],
    ["4", 2, 2],
    ["4", "2", 2],
    [null, null, 0]
  ])("valid", (leftValue, rightValue, expectation) => {
    const left = createLiteral(leftValue);
    const right = createLiteral(rightValue);
    const result = subtraction(left, right);
    expect(result).toEqual(createLiteral(expectation));
  });

  it.each([
    ["a", "b"],
  ])("invalid", (leftValue, rightValue) => {
    const left = createLiteral(leftValue);
    const right = createLiteral(rightValue);
    expect(() => subtraction(left, right)).toThrowError();
  });
});