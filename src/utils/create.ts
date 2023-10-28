import type {
	BinaryExpression,
	UnaryExpression,
	Literal,
	Identifier,
	MemberExpression,
	LiteralValue,
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

export function createLiteral<T extends LiteralValue>(value: T): Literal {
	const kind =
		value === null ? 'null' : value === undefined ? 'undefined' : typeof value;
	if (!isLiteralType(kind)) throw new TypeError(`Expected literal value`);

	return {
		type: 'Literal',
		kind,
		value:
			typeof value === 'string'
				? escapeStringQuotes(value)
				: typeof value === 'object'
				? JSON.stringify(value)
				: String(value),
	};
}

export function createIdentifier(name: string): Identifier {
	return {
		type: 'Identifier',
		name,
	};
}

export function createMemberExpression(
	object: MemberExpression['object'],
	member: MemberExpression['member'],
	dot: MemberExpression['dot'],
): MemberExpression {
	return {
		type: 'MemberExpression',
		object,
		member,
		dot,
	};
}
