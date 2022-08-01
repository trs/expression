import {
	validateBinaryExpression,
	validateLiteral,
	validateUnaryExpression,
} from './validate.js';
import {binary, unary} from './operators/index.js';
import {createLiteral, parseLiteralValue} from '@/utils/index.js';
import type {
	Expression,
	Literal,
	LiteralValue,
} from '@/types.js';

import {
	isBinaryExpression,
	isLiteral,
	isUnaryExpression,
} from '@/guards.js';

export function evaluate(
	expression: Expression
): LiteralValue {
	const result = evaluateTree(expression);
	return parseLiteralValue(result);
}

export const evaluateTree = (
	expression: Expression | Literal
): Literal => {
	if (isLiteral(expression)) {
		if (!validateLiteral(expression)) throw new Error('Invalid literal');

		return expression;
	}

	if (isUnaryExpression(expression)) {
		if (!validateUnaryExpression(expression))
			throw new Error('Invalid unary expression');

		const argument = evaluateTree(expression.argument);

		const handler = unary.getOperatorHandler(expression.operator);
		if (typeof handler !== 'function')
			throw new Error(`No handler for unary operator (${expression.operator})`);

		return handler(argument);
	}

	if (isBinaryExpression(expression)) {
		if (!validateBinaryExpression(expression))
			throw new Error('Invalid binary expression');

		const leftEval = evaluateTree(expression.left);
		const rightEval = evaluateTree(expression.right);

		const handler = binary.getOperatorHandler(expression.operator);
		if (typeof handler !== 'function')
			throw new Error(
				`No handler for binary operator (${expression.operator})`,
			);

		return handler(leftEval, rightEval);
	}

	throw new SyntaxError('Invalid evaluation argument');
};
