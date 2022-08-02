import { Expression } from 'typescript';

import { evaluate as baseEvaluate } from './evaluate/mod';
import { parse } from './parse/mod';

export { parse };

export const evaluate = (expression: string | Expression) => {
  const ast = typeof expression === 'string'
    ? parse(expression)
    : expression;

  return baseEvaluate(ast);
}
