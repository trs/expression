import { AnyLiteral } from "@/evaluate/types";
import { parseValue } from "@/evaluate/value/mod";
import { createBooleanLiteral } from "@/utils";
import { BooleanLiteral } from "typescript";

export const equality = (left: AnyLiteral, right: AnyLiteral): BooleanLiteral => {
  return createBooleanLiteral(parseValue(left) == parseValue(right));
}
