import { StringLiteral } from "typescript";

export const parseStringLiteral = (value: StringLiteral): string => String(value.text);
