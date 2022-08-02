import { BooleanLiteral, NullLiteral, NumericLiteral, StringLiteral } from "typescript";

export type AnyLiteral = BooleanLiteral | NumericLiteral | StringLiteral | NullLiteral;

export type LiteralValue = string | number | boolean | null;
