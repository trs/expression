import { AnyLiteral } from "@/evaluate/types";
import { parseValue } from "@/evaluate/value/mod";
import { factory, NumericLiteral } from "typescript";

export const multiplication = (left: AnyLiteral, right: AnyLiteral): NumericLiteral => {
  const leftValue = parseValue(left);
  const rightValue = parseValue(right);

  const value = (leftValue as any) * (rightValue as any);
  if (isNaN(value)) throw new TypeError();

  return factory.createNumericLiteral(value);
}
