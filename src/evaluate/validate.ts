import {
	isBinaryExpression,
	isLiteral,
	isLiteralType,
	isBinaryOperator,
	isUnaryOperator,
	isUnaryExpression,
} from '@/guards.js';
import type {
	BinaryExpression,
	Literal,
	UnaryExpression
} from '@/types.js';

export const validateUnaryExpression = (
	exp: UnaryExpression
): boolean => {
	if (!isUnaryOperator(exp.operator)) return false;

	if (
		isBinaryExpression(exp.argument) &&
		!validateBinaryExpression(exp.argument)
	)
		return false;

	if (
		isUnaryExpression(exp.argument) &&
		!validateUnaryExpression(exp.argument)
	)
		return false;

	if (isLiteral(exp.argument) && !validateLiteral(exp.argument)) return false;

	return true;
};

export const validateBinaryExpression = (
	exp: BinaryExpression
): boolean => {
	if (!isBinaryOperator(exp.operator)) return false;

	if (isBinaryExpression(exp.left) && !validateBinaryExpression(exp.left))
		return false;
	if (
		isBinaryExpression(exp.right) &&
		!validateBinaryExpression(exp.right)
	)
		return false;

	if (isUnaryExpression(exp.left) && !validateUnaryExpression(exp.left))
		return false;
	if (isUnaryExpression(exp.right) && !validateUnaryExpression(exp.right))
		return false;

	if (isLiteral(exp.left) && !validateLiteral(exp.left)) return false;
	if (isLiteral(exp.right) && !validateLiteral(exp.right)) return false;

	return true;
};

export const validateLiteral = (lit: Literal): boolean => {
	if (!isLiteralType(lit.kind)) return false;
	if (typeof lit.value !== 'string') return false;
	return true;
};
