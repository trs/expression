import {plus} from './plus.js';
import {createLiteral} from '@/utils/index.js';

describe('operators/unary/plus', () => {
  it.each([
    ["2", 2],
    [1, 1],
    [false, 0],
    [null, 0],
    ["", 0],
  ])("valid", (value, expectation) => {
    const operand = createLiteral(value);
    const result = plus(operand);
    expect(result).toEqual(createLiteral(expectation));
  });

  it.each([
    ['a'],
    [NaN]
  ])("invalid", (value) => {
    const operand = createLiteral(value);
    expect(() => plus(operand)).toThrowError();
  });
});
