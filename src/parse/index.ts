import {grammar} from './grammar.js';
import {toAST} from './ast.js';

import type {Expression} from '@/types.js';

export function parse(expression: string): Expression {
	const match = grammar.match(expression);
	if (match.failed()) {
		throw new SyntaxError(match.message);
	}

	const ast = toAST(match);
	return ast;
}
