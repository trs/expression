import {evaluate, parse} from './index.js';

describe('@trs/expression', () => {
  it('respects order of operations', () => {
    const str = '3 + (35 - 21) * 2';
    const ast = parse(str);
    const result = evaluate(ast);
    expect(result).toBe(31);
  });
});
