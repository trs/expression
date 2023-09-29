import { createLiteral, parseLiteralValue } from '@/utils/index.js';
import type {BinaryOperatorEvaluator} from '@/types.js';

export const logicalNullishCoalescing: BinaryOperatorEvaluator = (left, right) => {
  return createLiteral(parseLiteralValue(left) ?? parseLiteralValue(right));
}
