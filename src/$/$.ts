import { Kind, Function } from '..';

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
 * @param F A type-level function.
 * @param X The input type to apply the type-level function to.
 *
 * ### Basic Usage
 *
 * @example
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
  })['f']
>;
