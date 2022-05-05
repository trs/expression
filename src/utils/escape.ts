export const escapeStringQuotes = (string_: string) =>
	// eslint-disable-next-line no-control-regex
	string_.replace(/[\\"'`]/g, '\\$&').replace(/\u0000/g, '\\0');
