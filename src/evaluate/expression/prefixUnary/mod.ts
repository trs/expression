import { isSyntaxKind } from "@/evaluate/guard";
import { AnyLiteral } from "@/evaluate/types";
import { getSyntaxKindName } from "@/utils";
import { PrefixUnaryOperator, SyntaxKind } from "typescript";

import { logicalNot } from "./logicalNot";
import { negation } from "./negation";
import { plus } from "./plus";

export const evaluatePrefixUnaryExpression = (operand: AnyLiteral, operator: PrefixUnaryOperator): AnyLiteral => {
  if (isSyntaxKind(SyntaxKind.MinusToken)(operator)) return negation(operand);
  if (isSyntaxKind(SyntaxKind.ExclamationToken)(operator)) return logicalNot(operand);
  if (isSyntaxKind(SyntaxKind.PlusToken)(operator)) return plus(operand);

  throw new SyntaxError();
}
