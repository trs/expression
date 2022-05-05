import { createLiteral, parseLiteralValue } from '@/utils/index.js';
import type {UnaryOperatorEvaluator} from '@/types.js';

export const logicalNot: UnaryOperatorEvaluator = (value) => {
  return createLiteral(!parseLiteralValue(value));
}
