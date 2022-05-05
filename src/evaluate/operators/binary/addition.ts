import { createLiteral, parseLiteralValue } from '@/utils/index.js';
import { isNumber, isString } from '@/guards.js';
import type {BinaryOperatorEvaluator} from '@/types.js';

export const addition: BinaryOperatorEvaluator = (left, right) => {
  const leftVal = parseLiteralValue(left);
  const rightVal = parseLiteralValue(right);

  if (isString(leftVal) || isString(rightVal)) {
    return createLiteral(String(leftVal) + String(rightVal));
  }

  const value = (leftVal as any) + (rightVal as any);

  if (isNaN(value)) throw new Error('Division resulted in an invalid result');

  return createLiteral(value);
}
