import { NumericLiteral } from "typescript";

export const parseNumericLiteral = (value: NumericLiteral): number => Number(value.text);
