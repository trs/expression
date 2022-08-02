import { BooleanLiteral } from "typescript";
import { isFalseLiteral, isTrueLiteral } from "../guard";

export const parseBooleanLiteral = (value: BooleanLiteral): boolean => {
  if (isFalseLiteral(value)) return false;
  if (isTrueLiteral(value)) return true;
  throw new TypeError();
};
