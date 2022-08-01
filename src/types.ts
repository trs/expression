export type Expression = BinaryExpression | UnaryExpression | Literal;

export interface BinaryExpression {
  type?: 'BinaryExpression';
  right: Expression;
  left: Expression;
  operator: BinaryOperator;
}

export interface UnaryExpression {
  type?: 'UnaryExpression';
  argument: Expression;
  prefix: boolean;
  operator: UnaryOperator;
}

export const ArithmeticBinaryOperator = [
  '+',
  '-',
  '/',
  '*',
  '%',
  '**',
] as const;
export type ArithmeticBinaryOperator = typeof ArithmeticBinaryOperator[number];

export const ArithmeticUnaryOperator = [
  '+',
  '-',
] as const;
export type ArithmeticUnaryOperator = typeof ArithmeticUnaryOperator[number];

export const ComparisonOperator = [
  '==',
  '!=',
  '===',
  '!==',
  '>',
  '>=',
  '<',
  '<=',
] as const;
export type ComparisonOperator = typeof ComparisonOperator[number];

export const LogicalBinaryOperator = [
  '||',
  '&&',
] as const;
export type LogicalBinaryOperator = typeof LogicalBinaryOperator[number];

export const LogicalUnaryOperator = [
  '!'
] as const;
export type LogicalUnaryOperator = typeof LogicalUnaryOperator[number];

export const BinaryOperator = [
  ...ArithmeticBinaryOperator,
  ...ComparisonOperator,
  ...LogicalBinaryOperator,
] as const;
export type BinaryOperator = typeof BinaryOperator[number];

export const UnaryOperator = [
  ...ArithmeticUnaryOperator,
  ...LogicalUnaryOperator,
] as const;
export type UnaryOperator = typeof UnaryOperator[number];

export const LiteralType = [
  'string',
  'boolean',
  'number',
  'null'
] as const;

export type LiteralType = typeof LiteralType[number];

export interface Literal {
  type?: "Literal";
  kind: LiteralType;
  value: string;
}

export type LiteralValue = string | number | boolean | null;

export type BinaryOperatorEvaluator = (left: Literal, right: Literal) => Literal;

export type UnaryOperatorEvaluator = (value: Literal) => Literal;
