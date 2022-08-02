import {createSourceFile, ScriptTarget, ScriptKind, isExpressionStatement, Expression} from 'typescript';

export const parse = (expression: string): Expression => {
	const file = createSourceFile('expression.js', expression, ScriptTarget.ES2021, false, ScriptKind.JS);
	if (file.statements.length !== 1) throw new SyntaxError('Statement must be a single expression');

	const [statement] = file.statements;

	if (!isExpressionStatement(statement)) throw new SyntaxError('Statement must be a single expression');

	return statement.expression;
}
