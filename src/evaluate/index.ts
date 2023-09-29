import {
	validateBinaryExpression,
	validateIdentifier,
	validateLiteral,
	validateMemberExpression,
	validateUnaryExpression,
} from './validate.js';
import {binary, unary} from './operators/index.js';
import {createLiteral, parseLiteralValue} from '@/utils/index.js';
import type {
	Expression,
	Literal,
	LiteralValue,
	MemberDotChain,
	MemberExpression,
	Variables,
} from '@/types.js';

import {
	isBinaryExpression,
	isIdentifier,
	isLiteral,
	isMemberExpression,
	isUnaryExpression,
} from '@/guards.js';

export function evaluate(
	expression: Expression,
	variables: Variables = {},
): LiteralValue {
	const result = evaluateTree(expression, variables);
	return parseLiteralValue(result);
}

export const evaluateTree = (
	expression: Expression | Literal,
	variables: Variables,
): Literal => {
	if (isLiteral(expression)) {
		if (!validateLiteral(expression)) throw new Error('Invalid literal');

		return expression;
	}

	if (isIdentifier(expression)) {
		if (!validateIdentifier(expression)) throw new Error('Invalid identifier');

		const value = variables[expression.name];
		return createLiteral(value);
	}

	if (isUnaryExpression(expression)) {
		if (!validateUnaryExpression(expression))
			throw new Error('Invalid unary expression');

		const argument = evaluateTree(expression.argument, variables);

		const handler = unary.getOperatorHandler(expression.operator);
		if (typeof handler !== 'function')
			throw new Error(`No handler for unary operator (${expression.operator})`);

		return handler(argument);
	}

	if (isBinaryExpression(expression)) {
		if (!validateBinaryExpression(expression))
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

	if (isMemberExpression(expression)) {
		if (!validateMemberExpression(expression))
			throw new Error('Invalid member expression');

		const chain = getMemberExpressionChain(expression);
		const result = evaluateMemberExpressionChain(chain, variables);
		return result;
	}

	throw new SyntaxError('Invalid evaluation argument');
};

const getMemberExpressionChain = (
	expression: MemberExpression,
	chain: MemberDotChain[] = [],
) => {
	if (isMemberExpression(expression.object)) {
		return getMemberExpressionChain(
			expression.object,
			chain.concat([
				{
					object: expression.member,
					dot: expression.dot,
				},
			]),
		);
	}

	if (isIdentifier(expression.member)) {
		chain.push({
			object: expression.member,
			dot: expression.dot,
		});
	}

	if (isLiteral(expression.member)) {
		chain.push({
			object: expression.member,
			dot: expression.dot,
		});
	}

	if (isIdentifier(expression.object)) {
		chain.push({
			object: expression.object,
			dot: expression.dot,
		});
	}

	if (isLiteral(expression.object)) {
		chain.push({
			object: expression.object,
			dot: expression.dot,
		});
	}

	return chain.reverse();
};

const evaluateMemberExpressionChain = (
	chain: MemberDotChain[],
	variables: Variables,
) => {
	const {object, dot} = chain.at(0);
	const objectValue: LiteralValue = isIdentifier(object)
		? variables[object.name]
		: JSON.parse(object.value);

	const {value} = chain
		.slice(1)
		.reduce<{value: LiteralValue; dot?: MemberDotChain['dot']}>(
			(previous, link, i) => {
				if (i === chain.length - 1) return previous;

				if (previous.dot === '.') {
					if (previous.value == null)
						throw new TypeError(
							`Cannot read properties of ${
								previous.value === undefined ? 'undefined' : 'null'
							}`,
						);

					const value = isIdentifier(link.object)
						? previous.value[link.object.name]
						: previous.value[parseLiteralValue(link.object) as any];

					return {value, dot: link.dot};
				}

				if (previous.dot === '?.') {
					if (isIdentifier(link.object)) {
						if (
							previous.value === undefined ||
							!Object.getOwnPropertyNames(previous.value).includes(
								link.object.name,
							)
						) {
							return {
								value: undefined,
								dot: link.dot,
							};
						}

						const value = previous.value[link.object.name];
						return {value, dot: link.dot};
					}

					if (isLiteral(link.object)) {
						if (
							!Object.getOwnPropertyNames(previous.value).includes(
								link.object.value,
							)
						) {
							return {
								value: undefined,
								dot: link.dot,
							};
						}

						const value = previous.value[link.object.value];
						return {value, dot: link.dot};
					}
				}

				return previous;
			},
			{
				value: objectValue,
				dot,
			},
		);

	return createLiteral(value);
};
