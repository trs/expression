import type { UnaryOperator, UnaryOperatorEvaluator } from "@/types.js";
import { logicalNot } from "./logicalNot.js";
import { negation } from "./negation.js";
import { plus } from "./plus.js";

export type OperatorMap = Record<UnaryOperator, UnaryOperatorEvaluator>;

const OPERATOR_HANDLERS: OperatorMap = {
  '!': logicalNot,
  '-': negation,
  '+': plus
};

export const getOperatorHandler = (op: UnaryOperator) => OPERATOR_HANDLERS[op];
