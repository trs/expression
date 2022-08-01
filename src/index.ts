import {parse} from '@/parse/index.js';
import {evaluate as evaluateExpression} from '@/evaluate/index.js';

import type { Expression } from './types.js';
import { isString } from './guards.js';

export { parse };

export function evaluate(expression: string | Expression) {
  if (isString(expression)) expression = parse(expression);

  return evaluateExpression(expression);
}
