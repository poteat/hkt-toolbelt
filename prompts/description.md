This codebase, `hkt-toolbelt`, is a TypeScript library for creating type-level composable logic. For example, you could compose various utilities to do something like this:

```ts
import _, { $ } from 'hkt-toolbelt'

type Out = $<$<_.List.Map, _.String.ToUpper>, ['foo', 'bar']>
//   ^? ["FOO", "BAR"]
```

As an example of how it works internally, here's the internal definition of `String.ToUpper`:

```ts
import { Type, Kind } from '..'

export type _$toUpper<S extends string> = Uppercase<S>

export interface ToUpper extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$toUpper<typeof x>
}
```

The basic folder structure of the project is like this:

```txt
- package.json
- src
  - $.ts
  - $
    - $$.ts
    - $.ts
    - $N.ts
    - index.ts
  - boolean.ts
  - boolean
    - and.ts
    - imply.ts
    - index.ts
    - nand.ts
    - nimply.ts
    - nor.ts
    - not.ts
    - or.ts
    - xnor.ts
    - xor.ts
  - combinator.ts
  - combinator
    - apply-self.ts
    - collate.ts
    - fix-sequence.ts
    - index.ts
    - recursive-kind.ts
    - self.ts
  - conditional.ts
  - conditional
    - equals.ts
    - extends.ts
    - if.ts
    - index.ts
    - not-equals.ts
  - digit-list.ts
  - digit-list
    - add.ts
    - compare.ts
    - decrement.ts
    - digit-list.ts
    - divide-by-subtraction.ts
    - divide.ts
    - first.ts
    - from-string.ts
    - increment.ts
    - index.ts
    - is-even.ts
    - is-odd.ts
    - last.ts
    - modulo.ts
    - multiply-digit.ts
    - multiply.ts
    - pop.ts
    - shift.ts
    - subtract.ts
    - to-number.ts
    - to-string.ts
    - trim.ts
  - digit.ts
  - digit
    - add-tens.ts
    - add.ts
    - compare.ts
    - decrement-tens.ts
    - decrement.ts
    - digit.ts
    - increment-tens.ts
    - increment.ts
    - index.ts
    - multiply-tens.ts
    - multiply.ts
    - subtract-tens.ts
    - subtract.ts
    - zero.ts
  - function.ts
  - function
    - constant.ts
    - function.ts
    - identity.ts
    - index.ts
    - return-type.ts
  - index.ts
  - kind.ts
  - kind
    - apply.ts
    - composable-pair.ts
    - composable.ts
    - compose.ts
    - curry.ts
    - index.ts
    - input-of.ts
    - kind.ts
    - output-of.ts
    - pipe.ts
    - reify.ts
    - uncurry.ts
  - list.ts
  - list
    - concat.ts
    - every.ts
    - filter.ts
    - find.ts
    - first.ts
    - flatten-n.ts
    - flatten.ts
    - includes.ts
    - index.ts
    - is-variadic.ts
    - last.ts
    - length.ts
    - list.ts
    - map.ts
    - pair.ts
    - pop-n.ts
    - pop.ts
    - push.ts
    - reduce.ts
    - repeat.ts
    - reverse.ts
    - shift-n.ts
    - shift.ts
    - slice.ts
    - some.ts
    - splice.ts
    - times.ts
    - unshift.ts
  - natural-number-theory.ts
  - natural-number-theory
    - collatz.ts
    - factorial.ts
    - fizzbuzz.ts
    - index.ts
  - natural-number.ts
  - natural-number
    - add.ts
    - compare.ts
    - decrement.ts
    - divide-by.ts
    - divide.ts
    - increment.ts
    - index.ts
    - is-even.ts
    - is-less-than.ts
    - is-odd.ts
    - modulo-by.ts
    - modulo.ts
    - multiply.ts
    - subtract.ts
    - to-list.ts
  - number.ts
  - number
    - absolute.ts
    - compare.ts
    - from-string.ts
    - index.ts
    - is-fractional.ts
    - is-integer.ts
    - is-natural.ts
    - number.ts
    - sign.ts
    - to-string.ts
  - object.ts
  - object
    - at-path.ts
    - at.ts
    - deep-input-of.ts
    - deep-map-values.ts
    - emplace.ts
    - index.ts
    - keys.ts
    - map-keys.ts
    - map-values.ts
    - merge.ts
    - paths.ts
    - values.ts
  - parser.ts
  - parser
    - choice.ts
    - index.ts
    - letter.ts
    - letters.ts
    - many1.ts
    - map.ts
    - object-sequence.ts
    - optional.ts
    - parser.ts
    - run.ts
    - sequence.ts
    - state.ts
    - string.ts
    - take-sequence.ts
  - stress.ts
  - stress
    - hundred-number-list.ts
    - hundred-string.ts
    - hundred-tuple.ts
    - index.ts
    - ten-number-list.ts
    - ten-string.ts
    - ten-tuple.ts
    - thousand-number-list.ts
    - thousand-string.ts
    - thousand-tuple.ts
  - string.ts
  - string
    - append.ts
    - ends-with.ts
    - first.ts
    - from-list.ts
    - includes.ts
    - index.ts
    - init.ts
    - is-string.ts
    - is-template.ts
    - join.ts
    - last.ts
    - length.ts
    - prepend.ts
    - replace.ts
    - reverse.ts
    - slice.ts
    - split.ts
    - starts-with.ts
    - tail.ts
    - to-list.ts
    - to-lower.ts
    - to-upper.ts
  - test.ts
  - test
    - expect-not.ts
    - expect.ts
    - index.ts
  - type.ts
  - type
    - cast.ts
    - display.ts
    - index.ts
    - infer.ts
    - is-never.ts
    - value-of.ts
  - union.ts
  - union
    - index.ts
    - length.ts
    - to-intersection.ts
    - to-list.ts
```

Each of the leaf-level files have a corresponding 'spec.ts' file that denotes unit tests. For example, this is the spec file for the `String.ToUpper` utility:

```ts
import { $, String, Test } from 'hkt-toolbelt'

/**
 * Tests for `String.ToUpper`, which converts a string to uppercase for all
 * characters.
 */
type ToUpper_Spec = [
  /**
   * Can uppercase a string.
   */
  Test.Expect<$<String.ToUpper, 'foo'>, 'FOO'>,

  /**
   * Can uppercase an empty string.
   */
  Test.Expect<$<String.ToUpper, ''>, ''>,

  /**
   * Can uppercase a template literal string.
   */
  Test.Expect<$<String.ToUpper, `foo${string}`>, `FOO${Uppercase<string>}`>,

  /**
   * Can uppercase a template literal string.
   */
  Test.Expect<$<String.ToUpper, `${string}foo`>, `${Uppercase<string>}FOO`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.ToUpper, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<$<String.ToUpper, 'foobar' | 'bazqux'>, 'FOOBAR' | 'BAZQUX'>,

  /**
   * The 'string' template is supported.
   */
  Test.Expect<
    $<String.ToUpper, `foo${string}bar`>,
    `FOO${Uppercase<string>}BAR`
  >,

  /**
   * The upper of a string is string.
   */
  Test.Expect<$<String.ToUpper, string>, Uppercase<string>>
]
```
