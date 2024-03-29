import {Literal, LiteralValue} from '@/types.js';

export function parseLiteralValue(value: Literal): LiteralValue {
	switch (value.kind) {
		case 'string':
			return value.value;
		case 'boolean':
			return value.value === 'true';
		case 'number':
			return Number(value.value);
		case 'object':
			return value.value;
		case 'null':
			return null;
		case 'undefined':
			return undefined;
		default:
			throw new Error('Unsupported literal value');
	}
}
