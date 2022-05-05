import {logicalNot} from './logicalNot.js';
import {createLiteral} from '@/utils/index.js';

describe('operators/unary/logicalNot', () => {
  it.each([
    ["a", false],
    [1, false],
    [0, true],
    [null, true],
    [NaN, true],
    ["", true]
  ])("valid", (value, expectation) => {
    const operand = createLiteral(value);
    const result = logicalNot(operand);
    expect(result).toEqual(createLiteral(expectation));
  });
});
