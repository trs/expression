# `@trs/expression`

Evaluate arbitrary expressions using a Javascript-like syntax.

Supported expressions:
- Arithmetic - evaluates to a number
- String - evaluates to a string
- Logical - evaluates to a boolean

## Install

```sh
npm install @trs/expression
# or
yarn add @trs/expression
# or
pnpm add @trs/expression
```

## Evaluate Expression String

Expression strings can be evaluated to a single value.

```ts
import { evaluate } from '@trs/expression';

const ast = evaluate('1 + 2 == 3');

assert(ast === true);
```

## Parse Expression String

Expression strings can be parsed into an expression tree.

```ts
import { parse } from '@trs/expression';

const ast = parse('1 + 2 == 3');

assert(ast == {
  type: "BinaryExpression",
  ... etc
});
```

## Evaluate Expression Tree

Expression trees can be evaluated to a single value.

```ts
import { evaluate } from '@trs/expression';

const result = evaluate({
  type: "BinaryExpression",
  operator: "==",
  left: {
    type: "BinaryExpression",
    operator: "+",
    left: {
      type: "Literal",
      kind: "number",
      value: "1"
    },
    right: {
      type: "Literal",
      kind: "number",
      value: "2"
    }
  },
  right: {
    type: "Literal",
    kind: "number",
    value: "3"
  }
});

assert(result === true);
```
