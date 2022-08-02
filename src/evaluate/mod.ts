import { Expression, isPrefixUnaryExpression, isBinaryExpression, isStringLiteral, isNumericLiteral, isConditionalExpression, isParenthesizedExpression } from 'typescript';
import { evaluateBinaryExpression } from './expression/binary/mod';
import { isBooleanLiteral, isTrueLiteral } from './guard';
import { AnyLiteral, LiteralValue } from './types';
import { parseValue } from './value/mod';
import { evaluatePrefixUnaryExpression } from './expression/prefixUnary/mod';

export function evaluate(
	expression: Expression
): LiteralValue {
	const result = evaluateTree(expression);
  return parseValue(result);
}

export const evaluateTree = (
	expression: Expression
): AnyLiteral => {
	if (isStringLiteral(expression) || isNumericLiteral(expression) || isBooleanLiteral(expression)) {
		return expression;
	}

	if (isPrefixUnaryExpression(expression)) {
		const operand = evaluateTree(expression.operand);

		return evaluatePrefixUnaryExpression(operand, expression.operator);
	}

	if (isConditionalExpression(expression)) {
		const result = evaluateTree(expression.condition);
		if (isTrueLiteral(result)) return evaluateTree(expression.whenTrue);
		else return evaluateTree(expression.whenFalse);
	}

	if (isBinaryExpression(expression)) {
		const left = evaluateTree(expression.left);
		const right = evaluateTree(expression.right);

		return evaluateBinaryExpression(left, right, expression.operatorToken);
	}

	if (isParenthesizedExpression(expression)) {
		return evaluateTree(expression.expression);
	}

	throw new EvalError();
};
