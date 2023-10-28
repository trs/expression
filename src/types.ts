export type Expression = BinaryExpression | UnaryExpression | MemberExpression | Literal | Identifier;

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

export interface MemberExpression {
  type?: 'MemberExpression';
  object: MemberExpression | Identifier;
  member: Identifier | Literal;
  dot: MemberExpressionDot
}

export const MemberExpressionDot = [
  '.',
  '?.'
] as const;
export type MemberExpressionDot = typeof MemberExpressionDot[number];

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
  '??',
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
  'object',
  'null',
  'undefined'
] as const;

export type LiteralType = typeof LiteralType[number];

export interface Literal {
  type?: "Literal";
  kind: LiteralType;
  value: string;
}

export type LiteralValue = string | number | boolean | null | ObjectValue | ArrayValue;

export interface ObjectValue {
    [x: string]: LiteralValue;
}

export interface ArrayValue extends Array<LiteralValue> { }

export interface Identifier {
  type?: "Identifier",
  name: string;
}

export type Variables = Record<string, LiteralValue>;

export type BinaryOperatorEvaluator = (left: Literal, right: Literal) => Literal;

export type UnaryOperatorEvaluator = (value: Literal) => Literal;

export type MemberDotChain = { object: Identifier | Literal, dot?: MemberExpression['dot'] };
