import type {
	BinaryExpression,
	UnaryExpression,
	Literal,
} from '@/types.js';
import {escapeStringQuotes} from '@/utils/index.js';
import {isLiteralType} from '@/guards.js';

export function createBinaryExpression(
	left: BinaryExpression['left'],
	right: BinaryExpression['right'],
	operator: BinaryExpression['operator'],
): BinaryExpression {
	return {
		type: 'BinaryExpression',
		left,
		right,
		operator,
	};
}

export function createUnaryExpression(
	argument: UnaryExpression['argument'],
	operator: UnaryExpression['operator'],
	prefix: UnaryExpression['prefix'] = true,
): UnaryExpression {
	return {
		type: 'UnaryExpression',
		argument,
		operator,
		prefix,
	};
}

export function createLiteral<
	T extends boolean | number | string | undefined | undefined,
>(value: T): Literal {
	const kind = value === null ? 'null' : typeof value;
	if (!isLiteralType(kind)) throw new TypeError(`Expected literal value`);

	return {
		type: 'Literal',
		kind,
		value:
			typeof value === 'string' ? escapeStringQuotes(value) : String(value),
	};
}
