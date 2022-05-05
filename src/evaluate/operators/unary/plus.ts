import { createLiteral, parseLiteralValue } from '@/utils/index.js';
import type {UnaryOperatorEvaluator} from '@/types.js';

export const plus: UnaryOperatorEvaluator = (operand) => {
  const value = +parseLiteralValue(operand);

  if (isNaN(value)) throw new Error('Cannot convert operand into a number');

  return createLiteral(value);
}
