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
  });

  it('supports member expressions', () => {
    const str = 'a[0].b';
    const ast = parse(str);
    const result = evaluate(ast, {
      a: [{b: 5}]
    });
    expect(result).toBe(5);
  });

  it('supports index member expressions', () => {
    const str = 'a.b.c[0] === 5';
    const ast = parse(str);
    const result = evaluate(ast, {
      a: { b: { c: [5] } }
    });
    expect(result).toBe(true)
  });

  it('supports string member expressions', () => {
    const str = 'a.b["c"] === 5';
    const ast = parse(str);
    const result = evaluate(ast, {
      a: { b: { c: 5 } }
    });
    expect(result).toBe(true)
  });

  it('supports optional chaining', () => {
    const str = 'a?.b ?? 5';
    const ast = parse(str);
    const result = evaluate(ast, { a: undefined });
    expect(result).toBe(5)
  });
});
