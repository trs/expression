import {evaluate, parse} from './index.js';

describe('@trs/expression', () => {
  it('respects order of operations', () => {
    const str = '3 + (35 - 21) * 2';
    const ast = parse(str);
    const result = evaluate(ast);
    expect(result).toBe(31);
  });

  it('works with nested boolean expressions', () => {
    const str = '(1 == 1 && (true == false || (2 > 1))) || (1 == 2)';
    const ast = parse(str);
    const result = evaluate(ast);
    expect(result).toBe(true);
  })
});
