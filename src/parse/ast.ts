import ohmExtras from 'ohm-js/extras/index.js';
import type {MatchResult, Node} from 'ohm-js';
import type {
	Expression,
	BinaryExpression,
	UnaryExpression,
	Literal,
	Identifier,
	BinaryOperator,
	UnaryOperator,
} from '@/types.js';

type BinaryExpressionLike = Record<keyof BinaryExpression, unknown>;
type UnaryExpressionLike = Record<keyof UnaryExpression, unknown>;
type LiteralLike = Record<keyof Literal, unknown>;
type IdentifierLike = Record<keyof Identifier, unknown>;

const asBinaryExpression = (
	operator: BinaryOperator,
): BinaryExpressionLike => ({
	type: 'BinaryExpression',
	operator,
	left: 0,
	right: 2,
});

const asUnaryExpression = (
	operator: UnaryOperator,
	prefix: boolean,
): UnaryExpressionLike => ({
	type: 'UnaryExpression',
	operator,
	argument: 1,
	prefix,
});

const asLiteralExpression = (kind: string): LiteralLike => ({
	type: 'Literal',
	kind,
	value: 0,
});

const asStringLiteralExpression =
	() =>
	(_: unknown, characters: Node, __: unknown): LiteralLike => ({
		type: 'Literal',
		kind: 'string',
		value: characters.sourceString,
	});

const asIdentifierExpression =
	() =>
	(_: unknown, first: Node, remaining: Node, __: unknown): IdentifierLike => ({
		type: 'Identifier',
		name: first.sourceString + remaining.sourceString,
	});

export const astMapping = {
	LogicalExpression_and: asBinaryExpression('&&'),
	LogicalExpression_or: asBinaryExpression('||'),
	ComparisonExpression_eq: asBinaryExpression('=='),
	ComparisonExpression_ne: asBinaryExpression('!='),
	ComparisonExpression_seq: asBinaryExpression('==='),
	ComparisonExpression_sne: asBinaryExpression('!=='),
	ComparisonExpression_gt: asBinaryExpression('>'),
	ComparisonExpression_gte: asBinaryExpression('>='),
	ComparisonExpression_lt: asBinaryExpression('<'),
	ComparisonExpression_lte: asBinaryExpression('<='),
	ArithmeticExpression_add: asBinaryExpression('+'),
	ArithmeticExpression_subtract: asBinaryExpression('-'),
	ArithmeticExpression_multiply: asBinaryExpression('*'),
	ArithmeticExpression_divide: asBinaryExpression('/'),
	ArithmeticExpression_remainder: asBinaryExpression('%'),
	ArithmeticExpression_exponent: asBinaryExpression('**'),
	UnaryExpression_not: asUnaryExpression('!', true),
	UnaryExpression_neg: asUnaryExpression('-', true),
	UnaryExpression_plus: asUnaryExpression('+', true),
	number: asLiteralExpression('number'),
	boolean: asLiteralExpression('boolean'),
	string: asStringLiteralExpression(),
	identifier: asIdentifierExpression(),
};

export const toAST = (match: MatchResult) =>
	ohmExtras.toAST(match, astMapping) as Expression;
