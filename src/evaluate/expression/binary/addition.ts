import { AnyLiteral } from "@/evaluate/types";
import { parseValue } from "@/evaluate/value/mod";
import { factory, NumericLiteral, StringLiteral } from "typescript";

export const addition = (left: AnyLiteral, right: AnyLiteral): NumericLiteral | StringLiteral => {
  const leftValue = parseValue(left);
  const rightValue = parseValue(right);

  const value = (leftValue as any) + (rightValue as any);
  if (isNaN(value)) throw new TypeError();

  return typeof value === 'string'
    ? factory.createStringLiteral(value)
    : factory.createNumericLiteral(value);
}
