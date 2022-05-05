import {
	isBinaryExpression,
	isIdentifier,
	isLiteral,
	isLiteralType,
	isBinaryOperator,
	isUnaryOperator,
	isUnaryExpression,
} from '@/guards.js';
import type {
	BinaryExpression,
	Identifier,
	Literal,
	UnaryExpression,
	Variables,
} from '@/types.js';
import {createLiteral} from '@/utils/index.js';

export const validateUnaryExpression = (
	exp: UnaryExpression,
	vars: Variables,
): boolean => {
	if (!isUnaryOperator(exp.operator)) return false;

	if (
		isBinaryExpression(exp.argument) &&
		!validateBinaryExpression(exp.argument, vars)
	)
		return false;

	if (
		isUnaryExpression(exp.argument) &&
		!validateUnaryExpression(exp.argument, vars)
	)
		return false;

	if (isLiteral(exp.argument) && !validateLiteral(exp.argument)) return false;

	if (isIdentifier(exp.argument) && !validateIdentifier(exp.argument, vars))
		return false;

	return true;
};

export const validateBinaryExpression = (
	exp: BinaryExpression,
	vars: Variables,
): boolean => {
	if (!isBinaryOperator(exp.operator)) return false;

	if (isBinaryExpression(exp.left) && !validateBinaryExpression(exp.left, vars))
		return false;
	if (
		isBinaryExpression(exp.right) &&
		!validateBinaryExpression(exp.right, vars)
	)
		return false;

	if (isUnaryExpression(exp.left) && !validateUnaryExpression(exp.left, vars))
		return false;
	if (isUnaryExpression(exp.right) && !validateUnaryExpression(exp.right, vars))
		return false;

	if (isLiteral(exp.left) && !validateLiteral(exp.left)) return false;
	if (isLiteral(exp.right) && !validateLiteral(exp.right)) return false;

	if (isIdentifier(exp.left) && !validateIdentifier(exp.left, vars))
		return false;
	if (isIdentifier(exp.right) && !validateIdentifier(exp.right, vars))
		return false;

	return true;
};

export const validateLiteral = (lit: Literal): boolean => {
	if (!isLiteralType(lit.kind)) return false;
	if (typeof lit.value !== 'string') return false;
	return true;
};

export const validateIdentifier = (
	id: Identifier,
	vars: Variables,
): boolean => {
	if (typeof id.name !== 'string') return false;
	if (!Object.prototype.hasOwnProperty.call(vars, id.name)) return false;
	if (!validateLiteral(createLiteral(vars[id.name]))) return false;
	return true;
};
