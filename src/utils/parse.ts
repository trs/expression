import {Literal, LiteralValue} from '@/types.js';

export function parseLiteralValue(value: Literal): LiteralValue {
	switch (value.kind) {
		case 'string':
			return value.value;
		case 'boolean':
			return value.value === 'true';
		case 'number':
			return Number(value.value);
		case 'null':
			return null;
		default:
			throw new Error('Unsupported literal value');
	}
}
