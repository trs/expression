import { evaluate } from './main';

describe('evaluate', () => {
  describe('Literal', () => {
    it('NumericLiteral', () => {
      const str = '1';
      const result = evaluate(str);
      expect(result).toBe(1);
    });

    it('FalseKeyword', () => {
      const str = 'false';
      const result = evaluate(str);
      expect(result).toBe(false);
    });

    it('TrueKeyword', () => {
      const str = 'true';
      const result = evaluate(str);
      expect(result).toBe(true);
    });

    it('StringLiteral', () => {
      const str = '"hello"';
      const result = evaluate(str);
      expect(result).toBe('hello');
    });

    describe('Unsupported', () => {
      it('ObjectLiteral', () => {
        const str = '{}';
        expect(() => evaluate(str)).toThrowError();
      });

      it('ArrayLiteral', () => {
        const str = '[]';
        expect(() => evaluate(str)).toThrowError();
      });
    });
  });

  describe('BinaryExpression', () => {
    it('PlusToken', () => {
      const str = '2 + 1';
      const result = evaluate(str);
      expect(result).toBe(3);
    });

    it('MinusToken', () => {
      const str = '2 - 1';
      const result = evaluate(str);
      expect(result).toBe(1);
    });

    it('SlashToken', () => {
      const str = '4 / 2';
      const result = evaluate(str);
      expect(result).toBe(2);
    });

    it('AsteriskToken', () => {
      const str = '1 * 2';
      const result = evaluate(str);
      expect(result).toBe(2);
    });

    it('AsteriskAsteriskToken', () => {
      const str = '2 ** 3';
      const result = evaluate(str);
      expect(result).toBe(8);
    });

    it('EqualsEqualsToken', () => {
      const str = '"2" == 2';
      const result = evaluate(str);
      expect(result).toBe(true);
    });

    it('EqualsEqualsEqualsToken', () => {
      const str = '"2" === 2';
      const result = evaluate(str);
      expect(result).toBe(false);
    });

    it('ExclamationEqualsToken', () => {
      const str = '"2" != 2';
      const result = evaluate(str);
      expect(result).toBe(false);
    });

    it('ExclamationEqualsEqualsToken', () => {
      const str = '3 !== 2';
      const result = evaluate(str);
      expect(result).toBe(true);
    });

    it('GreaterThanToken', () => {
      const str = '3 > 2';
      const result = evaluate(str);
      expect(result).toBe(true);
    });

    it('GreaterThanEqualsToken', () => {
      const str = '2 >= 2';
      const result = evaluate(str);
      expect(result).toBe(true);
    });

    it('LessThanToken', () => {
      const str = '3 < 2';
      const result = evaluate(str);
      expect(result).toBe(false);
    });

    it('LessThanEqualsToken', () => {
      const str = '2 <= 2';
      const result = evaluate(str);
      expect(result).toBe(true);
    });

    it('AmpersandAmpersandToken', () => {
      const str = 'true && false';
      const result = evaluate(str);
      expect(result).toBe(false);
    });

    it('BarBarToken', () => {
      const str = 'true || false';
      const result = evaluate(str);
      expect(result).toBe(true);
    });

    describe('Unsupported', () => {
      it('AmpersandToken', () => {
        const str = '5 & 1';
        expect(() => evaluate(str)).toThrowError();
      });

      it('BarToken', () => {
        const str = '5 | 1';
        expect(() => evaluate(str)).toThrowError();
      });

      it('CaretToken', () => {
        const str = '5 ^ 1';
        expect(() => evaluate(str)).toThrowError();
      });

      it('LessThanLessThanToken', () => {
        const str = '5 << 1';
        expect(() => evaluate(str)).toThrowError();
      });

      it('GreaterThanGreaterThanToken', () => {
        const str = '5 >> 1';
        expect(() => evaluate(str)).toThrowError();
      });

      it('GreaterThanGreaterThanGreaterThanToken', () => {
        const str = '5 >>> 1';
        expect(() => evaluate(str)).toThrowError();
      });
    });
  });

  describe('PrefixUnaryExpression', () => {
    it('MinusToken', () => {
      const str = '-1';
      const result = evaluate(str);
      expect(result).toBe(-1);
    });

    it('PlusToken', () => {
      const str = '+"3"';
      const result = evaluate(str);
      expect(result).toBe(3);
    });

    it('ExclamationToken', () => {
      const str = '!true';
      const result = evaluate(str);
      expect(result).toBe(false);
    });

    it('ExclamationToken', () => {
      const str = '!!"1"';
      const result = evaluate(str);
      expect(result).toBe(true);
    });

    describe('Unsupported', () => {
      it('TildeToken', () => {
        const str = '~2';
        expect(() => evaluate(str)).toThrowError();
      });
    });
  });

  describe('ConditionalExpression', () => {
    it('BinaryExpression', () => {
      const str = '5 > 2 ? true : false';
      const result = evaluate(str);
      expect(result).toBe(true);
    });
  });

  describe('ParenthesizedExpression', () => {
    it('BinaryExpression (boolean)', () => {
      const str = '(true || false) && true';
      const result = evaluate(str);
      expect(result).toBe(true);
    });

    it('BinaryExpression (numeric)', () => {
      const str = '(5 - 2) * 2';
      const result = evaluate(str);
      expect(result).toBe(6);
    });
  });
});
