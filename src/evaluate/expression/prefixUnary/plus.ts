import { AnyLiteral } from "@/evaluate/types";
import { parseValue } from "@/evaluate/value/mod";
import { factory, NumericLiteral } from "typescript";

export const plus = (operand: AnyLiteral): NumericLiteral => {
  const value = +parseValue(operand);

  if (isNaN(value)) throw new TypeError();

  return factory.createNumericLiteral(value);
}
