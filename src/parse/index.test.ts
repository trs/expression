import {parse} from '@/parse/index.js';
import {
	ArithmeticBinaryOperator,
	ComparisonOperator,
	LogicalBinaryOperator,
	LogicalUnaryOperator,
	ArithmeticUnaryOperator,
} from '@/types.js';
import {
	createLiteral,
	createBinaryExpression,
	createUnaryExpression,
	createIdentifier,
	createMemberExpression,
} from '@/utils/index.js';

describe('parse', () => {
	it.each(ArithmeticBinaryOperator.map((op) => [op]))(
		'arithmetic binary expression',
		(op) => {
			const string_ = `1 ${op} 2`;

			const exp = createBinaryExpression(
				createLiteral(1),
				createLiteral(2),
				op,
			);

			expect(parse(string_)).toEqual(exp);
		},
	);

	it.each(ComparisonOperator.map((op) => [op]))(
		'comparison binary expression',
		(op) => {
			const string_ = `1 ${op} "1string_-"`;

			const exp = createBinaryExpression(
				createLiteral(1),
				createLiteral('1string_-'),
				op,
			);

			expect(parse(string_)).toEqual(exp);
		},
	);

	it.each(LogicalBinaryOperator.map((op) => [op]))(
		'logical binary expression',
		(op) => {
			const string_ = `"x" ${op} "1string_-"`;

			const exp = createBinaryExpression(
				createLiteral('x'),
				createLiteral('1string_-'),
				op,
			);

			expect(parse(string_)).toEqual(exp);
		},
	);

	it.each(LogicalUnaryOperator.map((op) => [op]))(
		'logical unary expression',
		(op) => {
			const string_ = `${op}true`;

			const exp = createUnaryExpression(createLiteral(true), op);

			expect(parse(string_)).toEqual(exp);
		},
	);

	it.each(ArithmeticUnaryOperator.map((op) => [op]))(
		'arithmetic unary expression',
		(op) => {
			const string_ = `${op}5`;

			const exp = createUnaryExpression(createLiteral(5), op);

			expect(parse(string_)).toEqual(exp);
		},
	);

	it('double quote string with quotation', () => {
		const string_ = `"string\\""`;

		const exp = createLiteral('string"');

		expect(parse(string_)).toEqual(exp);
	});

	it('single quote string with apostrophe', () => {
		const string_ = `'string\\''`;

		const exp = createLiteral("string'");

		expect(parse(string_)).toEqual(exp);
	});

	it('supports negative numbers', () => {
		const string_ = '-1';

		const exp = createUnaryExpression(createLiteral(1), '-');

		expect(parse(string_)).toEqual(exp);
	});

	it('supports unary logical not', () => {
		const string_ = '!true';

		const exp = createUnaryExpression(createLiteral(true), '!');

		expect(parse(string_)).toEqual(exp);
	});

	it('supports parentheses', () => {
		const string_ = '!(1 > 2)';

		const exp = createUnaryExpression(
			createBinaryExpression(createLiteral(1), createLiteral(2), '>'),
			'!',
		);

		expect(parse(string_)).toEqual(exp);
	});

	it('supports variable identifiers', () => {
		const string_ = `x1 + 1`;

		const exp = createBinaryExpression(
			createIdentifier('x1'),
			createLiteral(1),
			'+',
		);

		expect(parse(string_)).toEqual(exp);
	});

	it('supports variable member access (chaining)', () => {
		const string_ = `x.y + 1`;

		const exp = createBinaryExpression(
			createMemberExpression(createIdentifier('x'), createIdentifier('y'), '.'),
			createLiteral(1),
			'+',
		);

		expect(parse(string_)).toEqual(exp);
	});

	it('supports variable member access (optional-chaining)', () => {
		const string_ = `x?.y + 1`;

		const exp = createBinaryExpression(
			createMemberExpression(
				createIdentifier('x'),
				createIdentifier('y'),
				'?.',
			),
			createLiteral(1),
			'+',
		);

		expect(parse(string_)).toEqual(exp);
	});
});
