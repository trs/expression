import { AnyLiteral } from "@/evaluate/types";
import { createBooleanLiteral } from "@/utils";
import { parseValue } from "@/evaluate/value/mod";
import { BooleanLiteral } from "typescript";

export const lessThan = (left: AnyLiteral, right: AnyLiteral): BooleanLiteral => {
  return createBooleanLiteral(parseValue(left) < parseValue(right));
}
