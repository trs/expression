import { AnyLiteral } from "@/evaluate/types";
import { parseValue } from "@/evaluate/value/mod";
import { createBooleanLiteral } from "@/utils";
import { BooleanLiteral } from "typescript";

export const logicalNot = (operand: AnyLiteral): BooleanLiteral => {
  return createBooleanLiteral(!parseValue(operand));
}
