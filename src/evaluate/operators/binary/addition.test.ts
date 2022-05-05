import {addition} from './addition.js';
import {createLiteral} from '@/utils/index.js';

describe('operators/binary/addition', () => {
  it.each([
    [3, 2, 5],
    ["5", 2, "52"],
    ["a", "b", "ab"],
    [null, null, 0]
  ])("valid", (leftValue, rightValue, expectation) => {
    const left = createLiteral(leftValue);
    const right = createLiteral(rightValue);
    const result = addition(left, right);
    expect(result).toEqual(createLiteral(expectation));
  });
});