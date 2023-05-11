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

Here's an example of the code file for `$`, a very important type function that allows users to apply type functions to a type argument.

# Few-shot Examples

## Documentation for `$`

### Code File for `src/$/$.ts`

````ts
import { Kind, Function } from '..'

/**
 * `$` is the most fundamental type in `hkt-toolbelt`. `$` is a generic type
 * which takes in a type-level function and an input type, and returns the
 * resultant output type of the type-level function, when applied to the input.
 *
 * This is a type-level equivalent of an 'apply' function.
 *
 * `$` operates via partial application. This means that `$` can be used to
 * partially apply a type-level function, and then apply the partially applied
 * type-level function to a different input type. All applications of `$` must
 * be curried.
 *
 * ## Higher Order Type-Level Functions
 *
 * The reason that we use `$` instead of normal generic type parameters is that
 * we want to be able to partially apply type-level functions. If we used
 * normal generic type parameters, we would not be able to perform partial
 * application, nor would we be able to take in or reference 'unapplied' types.
 *
 * As well, in base TypeScript, generics may not take in other generics. In
 * other words, the following is not valid TypeScript:
 *
 * ```ts
 * type Apply<F, X> = F<X>; // 'Type 'F' is not generic.'
 * ```
 *
 * If we wanted to create a 'Map' type, we would not be able to do so with
 * normal generic type parameters. Instead, we would need to use a higher-order
 * type-level function. That is what `hkt-toolbelt` provides.
 *
 * ## Parameters
 *
 * @param F A type-level function.
 * @param X The input type to apply the type-level function to.
 *
 * ## Examples
 *
 * ### Basic Usage
 *
 * @example
 *
 * For example, `Function.Identity` is a type-level function which takes in one
 * argument: the input type. `Function.Identity` returns the input type that was
 * passed in.
 *
 * Applying `Function.Identity` to a type will result in the type that was
 * passed in:
 *
 * ```ts
 * import { Kind, Function } from "hkt-toolbelt";
 * type Result = $<Function.Identity, "foo">; // "foo"
 * ```
 *
 * @example
 *
 * For example, `String.Append` is a type-level function which takes in two
 * arguments: first, the string to append, and second, the string to append to.
 *
 * Only applying `String.Append` to one argument will result in a partially
 * applied type-level function. This partially applied type-level function can
 * then be applied to a different input type.
 *
 * ```ts
 * import { Kind, String } from "hkt-toolbelt";
 * type AppendBar = $<String.Append, "bar">;
 * type Result = $<AppendBar, "foo">; // "foobar"
 * ```
 *
 * Intermediary type aliases are not necessary, but they can be useful for
 * readability. The following example is equivalent to the previous example.
 *
 * ```ts
 * import { Kind, String } from "hkt-toolbelt";
 * type Result = $<$<String.Append, "bar">, "foo">; // "foobar"
 * ```
 *
 * ### Advanced Usage
 *
 * @example
 *
 * For example, `List.Map` is a type-level function which takes in two
 * arguments: first, a type-level function, and second, a list. `List.Map`
 * returns a list of the same length as the input list, where each element is
 * the result of applying the type-level function to the corresponding element
 * in the input list.
 *
 * This example applies `List.Map` to a partially applied `String.Append` type-
 * level function, and a list of strings. The result is a list of strings, where
 * each string has been appended with the string "bar".
 *
 * ```ts
 * import { Kind, List, String } from "hkt-toolbelt";
 * type Result = $<
 *  $<List.Map, $<String.Append, "bar">,
 *  ["foo", "baz"]
 * >; // ["foobar", "bazbar"]
 * ```
 *
 * This example is a nice demonstration of functionality that cannot easily be
 * achieved with normal generic type parameters.
 *
 * @example
 *
 * For example, `List.Filter` is a type-level function which takes in two
 * arguments: first, a type-level function, and second, a list. `List.Filter`
 * will only return the elements of the input list where the type-level
 * function returns the type `true`.
 *
 * This example applies `List.Filter` to a partially applied `String.Includes`,
 * and a list of strings. The result is a list of strings, where each string
 * includes the string "bar".
 *
 * Here we show where each intermediary step has been given a type alias. This
 * is not necessary, but it can be useful for readability and reusability.
 *
 * ```ts
 * import { Kind, List, String } from "hkt-toolbelt";
 *
 * // Does the string include "bar"?
 * type IncludesBar = $<String.Includes, "bar">;
 *
 * // Filter the list for strings that include "bar".
 * type FilterForBar = $<List.Filter, IncludesBar>;
 *
 * // Apply the filter to the list.
 * type Result = $<
 *   FilterForBar,
 *   ["foo", "foobar", "baz", "barqux"]
 * >; // ["foobar", "barqux"]
 * ```
 *
 * In conclusion, `hkt-toolbelt` provides a powerful set of type-level
 * functions, which can be used to create complex type-level logic. The `$`
 * type is the most fundamental type in `hkt-toolbelt`, and is used to apply
 * type-level functions to input types.
 */
export type $<
  /**
   * A higher-order type-level function.
   */
  F extends Kind.Kind,
  /**
   * The input type of the type-level function. `X` must be a subtype of the
   * input type of the type-level function.
   */
  X extends Kind._$inputOf<F>
> = Function._$returnType<
  (F & {
    readonly [Kind._]: X
  })['f']
>
````

### Unit Tests for `src/$/$.spec.ts`

```ts
import { $, $$, Function, String, Test } from 'hkt-toolbelt'

type $_Spec = [
  /**
   * $ can apply kinds to types.
   */
  Test.Expect<$<Function.Identity, number>, number>,

  /**
   * $ enforces kind inputs.
   */
  // @ts-expect-error
  $<String.StartsWith<'foo'>, number>,

  /**
   * $ will emit an error on non-kinds.
   */
  // @ts-expect-error
  $<number, number>
]
```

## Documentation for `src/boolean/and.ts`

````ts
import { Kind, Type } from '..'

/**
 * `_$and` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'and' logical operation
 * on `T` and `U`. If both `T` and `U` are true, then `_$and` returns true,
 * otherwise it returns false.
 *
 * ## Parameters
 *
 * @param T A boolean type.
 * @param U A boolean type.
 *
 * ## Example
 *
 * @example
 *
 * For example, we can use `_$and` to determine whether two boolean types are
 * both true. In this example, `true` and `false` are passed as type arguments
 * to the type-level function:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$and<true, false>; // false
 * ```
 */
export type _$and<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  true
]
  ? true
  : false

interface And_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$and<T, typeof x>
}

/**
 * `And` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'and' logical operation
 * on `T` and `U`.
 *
 * @param T A boolean type.
 * @param U A boolean type.
 *
 * @example
 *
 * For example, we can use `And` to determine whether two boolean types are
 * both true. In this example, `true` and `false` are passed as type arguments
 * to the type-level function:
 *
 * We apply `And` to `true` and `false` respectively using the `$` type-level
 * applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<$<Boolean.And, true>, false>; // false
 * ```
 */
export interface And extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): And_T<typeof x>
}
````

### Unit Tests for `src/boolean/and.spec.ts`

```ts
import { $, Boolean, Test } from 'hkt-toolbelt'

type And_Spec = [
  /**
   * True && True = True
   */
  Test.Expect<$<$<Boolean.And, true>, true>>,

  /**
   * True && False = False
   */
  Test.ExpectNot<$<$<Boolean.And, true>, false>>,

  /**
   * False && True = False
   */
  Test.ExpectNot<$<$<Boolean.And, false>, true>>,

  /**
   * False && False = False
   */
  Test.ExpectNot<$<$<Boolean.And, false>, false>>,

  /**
   * Running 'And' on a non-boolean type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<Boolean.And<true>, number>>
]
```

# Table

Here is a list of all utilities and their high-level descriptions.

# Namespace List

| Namespace       | Description                                                                               |
| --------------- | ----------------------------------------------------------------------------------------- |
| `Boolean`       | Perform logical operations and comparisons on boolean types.                              |
| `Combinator`    | Apply various combinatory functions on types.                                             |
| `Conditional`   | Perform conditional checks and selections on types.                                       |
| `DigitList`     | Perform arithmetic operations and other transformations on digit lists.                   |
| `Function`      | Manipulate function types and their return types.                                         |
| `Kind`          | Apply, compose, or pipe higher-order types, and access input/output types.                |
| `List`          | Manipulate list types with various operations like map, filter, flatten, and concatenate. |
| `NaturalNumber` | Perform arithmetic operations and comparisons on natural number types.                    |
| `Object`        | Access and manipulate object types, including their keys and values.                      |
| `Parser`        | Compose and manipulate parser types that process string inputs.                           |
| `String`        | Perform various operations and transformations on string types.                           |
| `Test`          | Assert and test type equality or difference.                                              |
| `Type`          | Infer types, cast types, display types, and other type operations.                        |
| `Union`         | Convert, manipulate, and determine properties of union types.                             |

# Utility List

| Namespace       | Type                                              | Description                                                                     |
| --------------- | ------------------------------------------------- | ------------------------------------------------------------------------------- |
| `Boolean`       | `Not`                                             | Compute the complement of a boolean type.                                       |
| `Boolean`       | `And`, `Or`, `Nand`, `Nor`                        | Perform a logical operation on two boolean types.                               |
| `Boolean`       | `Imply`                                           | Compute the logical implication of two boolean types.                           |
| `Boolean`       | `Nimply`                                          | Compute the complement of the logical implication of two boolean types.         |
| `Boolean`       | `Xnor`                                            | Compute the equivalence of two boolean types.                                   |
| `Boolean`       | `Xor`                                             | Compute the exclusive OR of two boolean types.                                  |
| `Combinator`    | `ApplySelf`                                       | Apply a type to itself.                                                         |
| `Combinator`    | `Collate`                                         | Take a type number N, then N type arguments, and return a tuple of all N types. |
| `Combinator`    | `FixSequence`                                     | Take in a higher-order type and a value, and loop until a fixed point is found. |
| `Combinator`    | `RecursiveKind`                                   | Takes in its own type, and return `unknown`.                                    |
| `Combinator`    | `Self`                                            | Take in any type, and return the type `Self`.                                   |
| `Conditional`   | `Equals`                                          | Determine if two types are equal.                                               |
| `Conditional`   | `Extends`                                         | Check if a type is a subtype of another.                                        |
| `Conditional`   | `If`                                              | Select a type based on a condition.                                             |
| `Conditional`   | `NotEquals`                                       | Determine if two types are different.                                           |
| `DigitList`     | `Add`, `Subtract`, `Multiply`, `Divide`, `Modulo` | Perform an arithmetic operation on digit lists.                                 |
| `DigitList`     | `Increment`, `Decrement`                          | Increment or decrement a digit list.                                            |
| `DigitList`     | `IsEven`, `IsOdd`                                 | Check if a digit list is even or odd.                                           |
| `DigitList`     | `Compare`                                         | Compare two digit lists.                                                        |
| `DigitList`     | `First`, `Last`                                   | Get the first or last element of a digit list.                                  |
| `DigitList`     | `ToList`, `ToNumber`, `ToString`                  | Convert digit lists to an equivalent list of digits, number, or string.         |
| `Function`      | `Constant`                                        | Return a constant type.                                                         |
| `Function`      | `Identity`                                        | Return the input type as is.                                                    |
| `Function`      | `ReturnType`                                      | Get the return type of a function type.                                         |
| `Kind`          | `Apply`, `Compose`, `Pipe`                        | Apply, compose, or pipe higher-order types.                                     |
| `Kind`          | `OutputOf`                                        | Get the output type of a higher-order type.                                     |
| `Kind`          | `InputOf`                                         | Get the input type of a higher-order type.                                      |
| `List`          | `Concat`                                          | Concatenate two lists.                                                          |
| `List`          | `Every`, `Some`                                   | Check if all or some elements in a list satisfy a predicate.                    |
| `List`          | `Filter`                                          | Filter a list by a predicate.                                                   |
| `List`          | `Find`                                            | Find the first element in a list that satisfies a predicate.                    |
| `List`          | `First`, `Last`                                   | Get the first or last element of a list.                                        |
| `List`          | `Flatten`, `FlattenN`                             | Flatten nested lists.                                                           |
| `List`          | `Includes`                                        | Check if a list includes a given element.                                       |
| `List`          | `Length`                                          | Get the length of a list.                                                       |
| `List`          | `Map`                                             | Apply a higher-order type to each element in a list.                            |
| `List`          | `Reduce`                                          | Reduce a list to a single value using a higher-order type reducer.              |
| `List`          | `Reverse`                                         | Reverse a list.                                                                 |
| `List`          | `Slice`                                           | Slices a portion of a list.                                                     |
| `List`          | `Splice`                                          | Adds/removes elements to/from a list.                                           |
| `NaturalNumber` | `Add`, `Subtract`, `Multiply`, `Divide`, `Modulo` | Perform an arithmetic operation on natural numbers.                             |
| `NaturalNumber` | `Increment`, `Decrement`                          | Increment or decrement a natural number.                                        |
| `NaturalNumber` | `IsEven`, `IsOdd`, `IsLessThan`                   | Check parity/compare natural numbers.                                           |
| `Object`        | `AtPath`, `At`                                    | Access an object value at a given path or key.                                  |
| `Object`        | `DeepMapValues`                                   | Deep map over an object's values.                                               |
| `Object`        | `Emplace`                                         | Emplace new key-value pairs in an object.                                       |
| `Object`        | `Keys`, `Values`                                  | Get the keys or values of an object.                                            |
| `Object`        | `MapKeys`, `MapValues`                            | Map over the keys or values of an object.                                       |
| `Object`        | `Merge`                                           | Merge two objects into a new one.                                               |
| `Parser`        | `Choice`                                          | Select one of multiple alternative parsers.                                     |
| `Parser`        | `Letter`, `Letters`                               | Match single or multiple letters.                                               |
| `Parser`        | `Many1`, `Optional`                               | Combine parsers via repetition and optionality.                                 |
| `Parser`        | `Map`                                             | Apply a higher-order type to the result of a parser.                            |
| `Parser`        | `ObjectSequence`                                  | Parse a sequence into a resultant object type.                                  |
| `Parser`        | `Run`                                             | Execute a parser on an input string.                                            |
| `Parser`        | `Sequence`                                        | Parse a sequence of input elements.                                             |
| `Parser`        | `State`                                           | Represents the state of a parser.                                               |
| `Parser`        | `String`                                          | Match a specific given input string.                                            |
| `Parser`        | `TakeSequence`                                    | Specify a single parser sequence element to emit as its result.                 |
| `String`        | `Append`, `Prepend`                               | Append or prepend a character to a string.                                      |
| `String`        | `EndsWith`, `StartsWith`                          | Check if a string ends or starts with a given substring.                        |
| `String`        | `First`, `Last`                                   | Get the first or last character in a string.                                    |
| `String`        | `FromList`                                        | Convert a list of characters into a string.                                     |
| `String`        | `Includes`                                        | Check if a string includes a given substring.                                   |
| `String`        | `Init`, `Tail`                                    | Get the initial or tail part of a string.                                       |
| `String`        | `IsString`                                        | Determine if a type is a valid string type.                                     |
| `String`        | `IsTemplate`                                      | Determine if a type is a string with template parts.                            |
| `String`        | `Join`                                            | Join elements of a supplied list to create a string.                            |
| `String`        | `Length`                                          | Calculate the length of the input string type.                                  |
| `String`        | `Replace`                                         | Replace a substring in a string with another.                                   |
| `String`        | `Reverse`                                         | Reverse a string.                                                               |
| `String`        | `Slice`                                           | Slice a portion of a string.                                                    |
| `String`        | `Split`                                           | Split a string into a list.                                                     |
| `Test`          | `Expect`, `ExpectNot`                             | Assert that types are logically equal or not equal.                             |
| `Type`          | `Cast`                                            | Cast a type to conform to a narrowed type.                                      |
| `Type`          | `Display`                                         | Display the "computed type" of a generic.                                       |
| `Type`          | `Infer`                                           | Infer a given generic as a narrowed function parameter.                         |
| `Type`          | `IsNever`                                         | Determine if a type is the `never` type.                                        |
| `Type`          | `ValueOf`                                         | Get any values of a given tuple or object type.                                 |
| `Union`         | `Length`                                          | Compute the number of types in a union.                                         |
| `Union`         | `ToIntersection`                                  | Convert a union type to an intersection type.                                   |
| `Union`         | `ToList`                                          | Convert a union type to a list type with the same elements.                     |

# Prompt

With all that in mind, I would like some new documentation to be written for
the following input code file. This documentation should be written in a similar
style to the above.

## Documentation for `<FILE_PATH>`:

```ts
<FILE_CONTENTS>
```

To provide context, here are the unit tests for the input code file:

```ts
<UNIT_TEST_CONTENTS>
```

# Rules

Please read the following instructions carefully:

Your task is to add JSDoc annotations to the code file provided. You will ONLY add JSDoc annotations for items that are being EXPORTED explicitly in the code file. Make sure that you fulfill the following requirements:

1. ONLY output the code file with added JSDoc. Ensure the final output is placed within a markdown code block.
2. ONLY add JSDoc to items with 'export' keyword.
3. DO NOT add JSDoc to any types or interfaces not being explicitly exported.
4. MAINTAIN the complete original code as it is in the output. Do not remove, change or skip any part of the code.
5. ENSURE accurate and relevant JSDoc annotations for each exported item.

Kindly adhere to the guidelines mentioned above and present a JSDoc annotated code file.
