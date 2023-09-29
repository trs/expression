import { BinaryOperator, LiteralType, UnaryExpression, UnaryOperator } from "./types.js";
import { BinaryExpression, Identifier, Literal, MemberExpression, MemberExpressionDot } from "./types.js";

export const isUnaryExpression = (val: unknown): val is UnaryExpression =>
  val != null && typeof val === 'object'
  && ['argument', 'operator', 'prefix'].every((prop) => Object.prototype.hasOwnProperty.call(val, prop));

export const isBinaryExpression = (val: unknown): val is BinaryExpression =>
  val != null && typeof val === 'object'
  && ['right', 'left', 'operator'].every((prop) => Object.prototype.hasOwnProperty.call(val, prop));

export const isMemberExpression = (val: unknown): val is MemberExpression =>
  val != null && typeof val === 'object'
  && ['object', 'member'].every((prop) => Object.prototype.hasOwnProperty.call(val, prop));

export const isLiteral = (val: unknown): val is Literal =>
  val != null && typeof val === 'object' && ['kind', 'value'].every((prop) => Object.prototype.hasOwnProperty.call(val, prop));

export const isLiteralType = (val: unknown): val is LiteralType =>
  val != null && typeof val === 'string' && LiteralType.some((type) => type === val);

export const isUnaryOperator = (val: unknown): val is UnaryOperator =>
  val != null && typeof val === 'string' && UnaryOperator.some((op) => op === val);

export const isBinaryOperator = (val: unknown): val is BinaryOperator =>
  val != null && typeof val === 'string' && BinaryOperator.some((op) => op === val);

export const isMemberDot = (val: unknown): val is MemberExpressionDot =>
  val != null && typeof val === 'string' && MemberExpressionDot.some((op) => op === val);

export const isNumber = (val: unknown): val is number =>
  typeof val === 'number';

export const isBoolean = (val: unknown): val is boolean =>
  typeof val === 'boolean';

export const isString = (val: unknown): val is string =>
  typeof val === 'string';

export const isNull = (val: unknown): val is string =>
  typeof val === null;

export const isIdentifier = (val: unknown): val is Identifier =>
  val != null && typeof val === 'object' && ['name'].every((prop) => Object.prototype.hasOwnProperty.call(val, prop));
