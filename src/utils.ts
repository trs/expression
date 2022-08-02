import { BooleanLiteral, factory, SyntaxKind } from "typescript";

export const getSyntaxKindName = (kind: SyntaxKind) => Object.entries(SyntaxKind).find(([, value]) => value === kind)![0];

export const createBooleanLiteral = (value: boolean): BooleanLiteral => value ? factory.createTrue() : factory.createFalse()
