import { createLiteral, parseLiteralValue } from '@/utils/index.js';
import { isNumber } from '@/guards.js';
import type {BinaryOperatorEvaluator} from '@/types.js';

export const division: BinaryOperatorEvaluator = (left, right) => {
  const leftVal = parseLiteralValue(left);
  const rightVal = parseLiteralValue(right);

  const value = (leftVal as any) / (rightVal as any);

  if (isNaN(value)) throw new Error('Division resulted in an invalid result');

  return createLiteral(value);
}
