import { AnyLiteral } from "@/evaluate/types";
import { createBooleanLiteral } from "@/utils";
import { parseValue } from "@/evaluate/value/mod";
import { BooleanLiteral } from "typescript";

export const greaterThanEqual = (left: AnyLiteral, right: AnyLiteral): BooleanLiteral => {
  return createBooleanLiteral(parseValue(left) >= parseValue(right));
}
