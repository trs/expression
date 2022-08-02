import { isNumericLiteral, isStringLiteral } from "typescript";
import { isBooleanLiteral } from "../guard";

import { AnyLiteral } from "../types";
import { getSyntaxKindName } from "../../utils";

import { parseBooleanLiteral } from "./boolean";
import { parseNumericLiteral } from "./numeric";
import { parseStringLiteral } from "./string";

export const parseValue = (value: AnyLiteral) => {
  if (isNumericLiteral(value)) return parseNumericLiteral(value);
  if (isStringLiteral(value)) return parseStringLiteral(value);
  if (isBooleanLiteral(value)) return parseBooleanLiteral(value);

  throw new SyntaxError();
}
