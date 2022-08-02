import { isSyntaxKind } from "@/evaluate/guard";
import { AnyLiteral } from "@/evaluate/types";
import { getSyntaxKindName } from "@/utils";
import { BinaryOperatorToken, SyntaxKind } from "typescript";

import { addition } from "./addition";
import { division } from "./division";
import { equality } from "./equality";
import { exponent } from "./exponent";
import { greaterThan } from "./greaterThan";
import { greaterThanEqual } from "./greaterThanEqual";
import { inequality } from "./inequality";
import { lessThan } from "./lessThan";
import { lessThanEqual } from "./lessThanEqual";
import { logicalAnd } from "./logicalAnd";
import { logicalOr } from "./logicalOr";
import { multiplication } from "./multiplication";
import { strictEquality } from "./strictEquality";
import { strictInequality } from "./strictInequality";
import { subtraction } from "./subtraction";

export const evaluateBinaryExpression = (left: AnyLiteral, right: AnyLiteral, operator: BinaryOperatorToken): AnyLiteral => {
  if (isSyntaxKind(SyntaxKind.PlusToken)(operator)) return addition(left, right);
  if (isSyntaxKind(SyntaxKind.MinusToken)(operator)) return subtraction(left, right);
  if (isSyntaxKind(SyntaxKind.SlashToken)(operator)) return division(left, right);
  if (isSyntaxKind(SyntaxKind.AsteriskToken)(operator)) return multiplication(left, right);
  if (isSyntaxKind(SyntaxKind.AsteriskAsteriskToken)(operator)) return exponent(left, right);
  if (isSyntaxKind(SyntaxKind.EqualsEqualsToken)(operator)) return equality(left, right);
  if (isSyntaxKind(SyntaxKind.EqualsEqualsEqualsToken)(operator)) return strictEquality(left, right);
  if (isSyntaxKind(SyntaxKind.GreaterThanToken)(operator)) return greaterThan(left, right);
  if (isSyntaxKind(SyntaxKind.GreaterThanEqualsToken)(operator)) return greaterThanEqual(left, right);
  if (isSyntaxKind(SyntaxKind.ExclamationEqualsToken)(operator)) return inequality(left, right);
  if (isSyntaxKind(SyntaxKind.ExclamationEqualsEqualsToken)(operator)) return strictInequality(left, right);
  if (isSyntaxKind(SyntaxKind.LessThanToken)(operator)) return lessThan(left, right);
  if (isSyntaxKind(SyntaxKind.LessThanEqualsToken)(operator)) return lessThanEqual(left, right);
  if (isSyntaxKind(SyntaxKind.AmpersandAmpersandToken)(operator)) return logicalAnd(left, right);
  if (isSyntaxKind(SyntaxKind.BarBarToken)(operator)) return logicalOr(left, right);

  throw new SyntaxError();
}
