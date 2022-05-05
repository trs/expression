import {multiplication} from './multiplication.js';
import {createLiteral} from '@/utils/index.js';

describe('operators/binary/multiplication', () => {
  it.each([
    [2, 2, 4],
    ["2", 2, 4],
    ["2", "2", 4],
    [null, null, 0],
  ])("valid", (leftValue, rightValue, expectation) => {
    const left = createLiteral(leftValue);
    const right = createLiteral(rightValue);
    const result = multiplication(left, right);
    expect(result).toEqual(createLiteral(expectation));
  });

  it.each([
    ["a", "b"]
  ])("invalid", (leftValue, rightValue) => {
    const left = createLiteral(leftValue);
    const right = createLiteral(rightValue);
    expect(() => multiplication(left, right)).toThrowError();
  });
});