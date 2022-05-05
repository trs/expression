import {evaluate} from '@/evaluate/index.js';
import {Expression, Variables} from '@/types.js';

describe('evaluate', () => {
	it('simple binary expression', () => {
		const exp: Expression = {
			left: {
				kind: 'number',
				value: '1',
			},
			right: {
				name: 'test',
			},
			operator: '+',
		};

		const vars: Variables = {
			test: 2,
		};

		expect(evaluate(exp, vars)).toBe(3);
	});

	it('advanced binary expression', () => {
		const exp: Expression = {
			left: {
				left: {
					kind: 'number',
					value: '4',
				},
				right: {
					name: 'num1',
				},
				operator: '+',
			},
			right: {
				left: {
					kind: 'number',
					value: '8',
				},
				right: {
					kind: 'number',
					value: '4',
				},
				operator: '-',
			},
			operator: '*',
		};

		const vars: Variables = {
			num1: 2,
		};

		// (4 + 2) * (8 - 4)
		// 6 * 4
		// 24

		expect(evaluate(exp, vars)).toBe(24);
	});

	it('simple logical expression', () => {
		const exp: Expression = {
			left: {
				kind: 'number',
				value: '1',
			},
			right: {
				name: 'test',
			},
			operator: '==',
		};

		const vars: Variables = {
			test: 2,
		};

		expect(evaluate(exp, vars)).toBe(false);
	});

	it('advanced logical expression', () => {
		const exp: Expression = {
			left: {
				left: {
					kind: 'string',
					value: 'a',
				},
				right: {
					kind: 'string',
					value: 'a',
				},
				operator: '==',
			},
			right: {
				left: {
					kind: 'boolean',
					value: 'true',
				},
				right: {
					name: 'test',
				},
				operator: '||',
			},
			operator: '&&',
		};

		const vars: Variables = {
			test: false,
		};

		expect(evaluate(exp, vars)).toBe(true);
	});
});
