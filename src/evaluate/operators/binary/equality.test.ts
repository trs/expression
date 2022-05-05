import {equality} from './equality.js';
import {createLiteral} from '@/utils/index.js';

describe('operators/binary/equality', () => {
  it.each([
    [1, 1, true],
    [1, 2, false],
    ["1", 1, true],
    ["1", "1", true],
    ["1", "2", false],
    [true, 1, true],
    [true, true, true],
    [false, false, true],
  ])("valid", (leftValue, rightValue, expectation) => {
    const left = createLiteral(leftValue);
    const right = createLiteral(rightValue);
    const result = equality(left, right);
    expect(result).toEqual(createLiteral(expectation));
  });
});