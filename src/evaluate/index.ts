import {
	validateBinaryExpression,
	validateIdentifier,
	validateLiteral,
	validateUnaryExpression,
} from './validate.js';
import {binary, unary} from './operators/index.js';
import {createLiteral, parseLiteralValue} from '@/utils/index.js';
import type {
	Expression,
	Identifier,
	Literal,
	LiteralValue,
	Variables,
} from '@/types.js';

import {
	isBinaryExpression,
	isIdentifier,
	isLiteral,
	isUnaryExpression,
} from '@/guards.js';

export function evaluate(
	expression: Expression,
	variables?: Variables,
): LiteralValue {
	const result = evaluateTree(expression, variables);
	return parseLiteralValue(result);
}

export const evaluateTree = (
	expression: Expression | Identifier | Literal,
	variables?: Variables,
): Literal => {
	if (isLiteral(expression)) {
		if (!validateLiteral(expression)) throw new Error('Invalid literal');

		return expression;
	}

	if (isIdentifier(expression)) {
		if (!validateIdentifier(expression, variables))
			throw new Error('Invalid identifier');

		const value = variables[expression.name];
		return createLiteral(value);
	}

	if (isUnaryExpression(expression)) {
		if (!validateUnaryExpression(expression, variables))
			throw new Error('Invalid unary expression');

		const argument = evaluateTree(expression.argument, variables);

		const handler = unary.getOperatorHandler(expression.operator);
		if (typeof handler !== 'function')
			throw new Error(`No handler for unary operator (${expression.operator})`);

		return handler(argument);
	}

	if (isBinaryExpression(expression)) {
		if (!validateBinaryExpression(expression, variables))
			throw new Error('Invalid binary expression');

		const leftEval = evaluateTree(expression.left, variables);
		const rightEval = evaluateTree(expression.right, variables);

		const handler = binary.getOperatorHandler(expression.operator);
		if (typeof handler !== 'function')
			throw new Error(
				`No handler for binary operator (${expression.operator})`,
			);

		return handler(leftEval, rightEval);
	}

	throw new SyntaxError('Invalid evaluation argument');
};
