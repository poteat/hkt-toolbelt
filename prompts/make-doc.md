Imagine you are the world's leading expert on TypeScript and higher-order types. You have written a library that allows users to build very sophisticated type-level logic. You have written a lot of documentation, but you are not sure if it is clear enough. You want to make sure that your documentation is clear and concise, and that it is easy for users to understand how to use your library.

I would like some help annotating some JSDoc documentation for some of my type utilities. To explain, the library is called `hkt-toolbelt` and allows users to build very sophisticated 'type functions' is an expressive way.

Here's an example of the code file for `$`, a very important type function that allows users to apply type functions to a type argument.

# Few-shot Examples

## Documentation for `$`

### Code File for `src/$/$.ts`

````ts
import { Kind, Function } from "..";

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
    readonly [Kind._]: X;
  })["f"]
>;
````

### Unit Tests for `src/$/$.spec.ts`

```ts
import { $, $$, Function, String, Test } from "hkt-toolbelt";

type $_Spec = [
  /**
   * $ can apply kinds to types.
   */
  Test.Expect<$<Function.Identity, number>, number>,

  /**
   * $ enforces kind inputs.
   */
  // @ts-expect-error
  $<String.StartsWith<"foo">, number>,

  /**
   * $ will emit an error on non-kinds.
   */
  // @ts-expect-error
  $<number, number>
];
```

## Documentation for `src/boolean/and.ts`

````ts
import { Kind, Type } from "..";

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
  : false;

interface And_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$and<T, typeof x>;
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
  f(x: Type._$cast<this[Kind._], boolean>): And_T<typeof x>;
}
````

### Unit Tests for `src/boolean/and.spec.ts`

```ts
import { $, Boolean, Test } from "hkt-toolbelt";

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
];
```

## Documentation for `src/combinator/apply-self.ts`

````ts
import { $, Type, Kind, Combinator } from "..";

/**
 * `ApplySelf` is a higher-order type-level function that takes in a recursive
 * kind and applies that kind to itself.
 *
 * This type-level function is provided only for theoretical completeness, and
 * experiences little practical use.
 *
 * This is similar to the `(f) => f(f)` pattern in functional programming,
 * where the function `f` takes in itself as an argument, and returns its own
 * application to itself.
 *
 * ## Parameters
 *
 * @param F A recursive kind that takes in itself as a type argument.
 *
 * ## Examples
 *
 * @example
 *
 * For example, we can use `ApplySelf` to create the omega combinator, which
 * is the simplest way to cause an infinite loop in term-rewriting systems.
 *
 * ```ts
 * import { Combinator } from "hkt-toolbelt";
 *
 * type Omega = $<Combinator.ApplySelf, Combinator.ApplySelf>; // Error
 * ```
 *
 * @example
 *
 * For example, you could apply `ApplySelf` to the identity function. This
 * returns the identity function itself, so is of little practical use.
 *
 * ```ts
 * import { $, Combinator, Function } from "hkt-toolbelt";
 *
 * type Result = $<Combinator.ApplySelf, Function.Identity>; // Function.Identity
 * ```
 */
export interface ApplySelf extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Combinator.RecursiveKind>
  ): $<typeof x, Type._$cast<typeof x, Kind._$inputOf<typeof x>>>;
}
````

### Unit Tests for `src/combinator/apply-self.spec.ts`

```ts
import { $, Combinator, Function, String, Test } from "hkt-toolbelt";

type ApplySelf_Spec = [
  /**
   * Can be applied to the identity function.
   */
  Test.Expect<$<Combinator.ApplySelf, Function.Identity>, Function.Identity>,

  /**
   * May be applied to a constant function.
   */
  Test.Expect<$<Combinator.ApplySelf, $<Function.Constant, "foo">>, "foo">,

  /**
   * Emits an error if applied to a function that may not be applied to itself.
   */
  // @ts-expect-error
  $<Combinator.ApplySelf, String.Append<"foo">>
];
```

# Prompt

With all that in mind, I would like some new documentation to be written for
the following input code file. This documentation should be written in a similar
style to the above, but feel free to take liberties and express creativity.

## Documentation for `<FILE_PATH>`:

```ts
<FILE_CONTENTS>
```

To provide context, here are the unit tests for the input code file:

```ts
<UNIT_TEST_CONTENTS>
```

Please only output the JSDoc annotated code file, inside of a markdown code block.
