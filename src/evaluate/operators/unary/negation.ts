import { createLiteral, parseLiteralValue } from '@/utils/index.js';
import type {UnaryOperatorEvaluator} from '@/types.js';

export const negation: UnaryOperatorEvaluator = (operand) => {
  const value = -parseLiteralValue(operand);

  if (isNaN(value)) throw new Error('Cannot negate operand');

  return createLiteral(value);
}
