import ohm from 'ohm-js';

export const grammar = ohm.grammar(String.raw`
Grammar {
  Expression = LogicalExpression

  LogicalExpression =
    | ComparisonExpression "&&" LogicalExpression  -- and
    | ComparisonExpression "||" LogicalExpression  -- or
    | ComparisonExpression

  ComparisonExpression =
    | ArithmeticExpression "==" ComparisonExpression   -- eq
    | ArithmeticExpression "!=" ComparisonExpression   -- ne
    | ArithmeticExpression "===" ComparisonExpression  -- seq
    | ArithmeticExpression "!==" ComparisonExpression  -- sne
    | ArithmeticExpression ">" ComparisonExpression    -- gt
    | ArithmeticExpression ">=" ComparisonExpression   -- gte
    | ArithmeticExpression "<" ComparisonExpression    -- lt
    | ArithmeticExpression "<=" ComparisonExpression   -- lte
    | ArithmeticExpression

  ArithmeticExpression =
    | UnaryExpression "*" ArithmeticExpression   -- multiply
    | UnaryExpression "/" ArithmeticExpression   -- divide
    | UnaryExpression "**" ArithmeticExpression  -- exponent
    | UnaryExpression "%" ArithmeticExpression   -- remainder
    | UnaryExpression "+" ArithmeticExpression   -- add
    | UnaryExpression "-" ArithmeticExpression   -- subtract
    | UnaryExpression

  UnaryExpression =
    | "!" PrimaryExpression  -- not
    | "-" PrimaryExpression  -- neg
    | "+" PrimaryExpression  -- plus
    | PrimaryExpression

  PrimaryExpression =
    | "(" Expression ")"  -- paren
    | "null"
    | "undefined"
    | boolean
    | number
    | string

  boolean =
  	| "true"
    | "false"

  number =
    | digit* "." digit+      -- fract
    | digit+                 -- whole

  string =
    | "\"" doubleStringCharacters? "\""
    | "'" singleStringCharacters? "'"

  doubleStringCharacters =
    | doubleStringCharacter+

  singleStringCharacters =
    | singleStringCharacter+

  doubleStringCharacter =
    | ~("\"" | "\\" | lineTerminator) sourceCharacter -- alt1
    | "\\" escapeSequence -- alt2
    | lineContinuation -- alt3

  singleStringCharacter =
    | ~("'" | "\\" | lineTerminator) sourceCharacter -- alt1
    | "\\" escapeSequence -- alt2
    | lineContinuation -- alt3

  lineContinuation =
    | "\\" lineTerminatorSequence -- alt1

  escapeSequence =
    | characterEscapeSequence -- alt1
    | "0" ~decimalDigit -- alt2
    | hexEscapeSequence -- alt3
    | unicodeEscapeSequence -- alt4

  characterEscapeSequence =
    | singleEscapeCharacter
    | nonEscapeCharacter

  singleEscapeCharacter = "\"" | "\\" | "'" | "b" | "f" | "n" | "r" | "t" | "v"

  nonEscapeCharacter =
    | ~(escapeCharacter | lineTerminator) sourceCharacter

  escapeCharacter =
    | singleEscapeCharacter
    | decimalDigit
    | "x"
    | "u"

  hexEscapeSequence =
    | "x" hexDigit hexDigit -- alt1

  unicodeEscapeSequence =
    | "u" hex4Digits -- alt1
    | "u{" hexDigits "}" -- alt2

  hex4Digits =
    | hexDigit hexDigit hexDigit hexDigit -- alt1

  lineTerminator =
    | "\n"
    | "\r"
    | "\u2028"
    | "\u2029"

  lineTerminatorSequence =
    | "\n" -- alt1
    | "\r" ~"\n" -- alt2
    | "\u2028" -- alt3
    | "\u2029" -- alt4
    | "\r" "\n" -- alt5

  sourceCharacter = any

  hexDigits =
    | hexDigits hexDigit -- alt2
    | hexDigit -- alt1

  hexDigit := "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "a" | "b" | "c" | "d" | "e" | "f" | "A" | "B" | "C" | "D" | "E" | "F"

  decimalDigits =
    | decimalDigits decimalDigit -- alt2
    | decimalDigit -- alt1

  decimalDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
}
`);
