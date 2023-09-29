import type { BinaryOperator, BinaryOperatorEvaluator } from "@/types.js";
import { addition } from "./addition.js";
import { division } from "./division.js";
import { equality } from "./equality.js";
import { greaterThan } from "./greaterThan.js";
import { greaterThanOrEqual } from "./greaterThanOrEqual.js";
import { inequality } from "./inequality.js";
import { lessThan } from "./lessThan.js";
import { lessThanOrEqual } from "./lessThanOrEqual.js";
import { logicalAnd } from "./logicalAnd.js";
import { logicalOr } from "./logicalOr.js";
import { multiplication } from "./multiplication.js";
import { subtraction } from "./subtraction.js";
import { remainder } from "./remainder.js";
import { exponent } from "./exponent.js";
import { strictEquality } from "./strictEquality.js";
import { strictInequality } from "./strictInequality.js";
import { logicalNullishCoalescing } from "./logicalNullishCoalescing.js";

export type OperatorMap = Record<BinaryOperator, BinaryOperatorEvaluator>;

const OPERATOR_HANDLERS: OperatorMap = {
  '%': remainder,
  '**': exponent,
  '&&': logicalAnd,
  '||': logicalOr,
  '??': logicalNullishCoalescing,
  '==': equality,
  '!=': inequality,
  '===': strictEquality,
  '!==': strictInequality,
  '<': lessThan,
  '<=': lessThanOrEqual,
  '>': greaterThan,
  '>=': greaterThanOrEqual,
  '*': multiplication,
  '+': addition,
  '-': subtraction,
  '/': division,
};

export const getOperatorHandler = (op: BinaryOperator) => OPERATOR_HANDLERS[op];
