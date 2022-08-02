import { BooleanLiteral, Expression, FalseLiteral, Node, SyntaxKind, TrueLiteral } from "typescript";

import { AnyLiteral } from "./types";

export const isSyntaxKind = <T extends Expression>(...kinds: SyntaxKind[]) => (value: Node | SyntaxKind): value is T => kinds.includes(
  typeof value === 'number' ? value : value.kind
);

export const isBooleanLiteral = isSyntaxKind<BooleanLiteral>(SyntaxKind.TrueKeyword, SyntaxKind.FalseKeyword);

export const isFalseLiteral = isSyntaxKind<FalseLiteral>(SyntaxKind.FalseKeyword);

export const isTrueLiteral = isSyntaxKind<TrueLiteral>(SyntaxKind.TrueKeyword);

export const isLiteral = isSyntaxKind<AnyLiteral>(
  SyntaxKind.TrueKeyword, SyntaxKind.FalseKeyword, SyntaxKind.NumericLiteral, SyntaxKind.StringLiteral, SyntaxKind.NullKeyword
);
