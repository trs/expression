import {evaluate} from '@/evaluate/index.js';
import {Expression} from '@/types.js';
import { createLiteral } from '@/utils';

describe('evaluate', () => {
	it('simple binary expression', () => {
		const exp: Expression = {
			left: createLiteral(1),
			right: createLiteral(2),
			operator: '+',
		};

		expect(evaluate(exp)).toBe(3);
	});

	it('advanced binary expression', () => {
		const exp: Expression = {
			left: {
				left: createLiteral(4),
				right: createLiteral(2),
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

		// (4 + 2) * (8 - 4)
		// 6 * 4
		// 24

		expect(evaluate(exp)).toBe(24);
	});

	it('simple logical expression', () => {
		const exp: Expression = {
			left: createLiteral(1),
			right: createLiteral(2),
			operator: '==',
		};

		expect(evaluate(exp)).toBe(false);
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
				right: createLiteral(false),
				operator: '||',
			},
			operator: '&&',
		};

		expect(evaluate(exp)).toBe(true);
	});
});
