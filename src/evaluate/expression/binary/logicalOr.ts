import { AnyLiteral } from "@/evaluate/types";
import { createBooleanLiteral } from "@/utils";
import { parseValue } from "@/evaluate/value/mod";
import { factory } from "typescript";

export const logicalOr = (left: AnyLiteral, right: AnyLiteral): AnyLiteral => {
  const value = parseValue(left) || parseValue(right);

  if (typeof value === 'string') return factory.createStringLiteral(value);
  if (typeof value === 'number') return factory.createNumericLiteral(value);
  return createBooleanLiteral(!!value);
}
