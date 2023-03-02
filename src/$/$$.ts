import { Kind, List } from "..";

/**
 * `$$` is a type-level function in `hkt-toolbelt` that allows users to pipe
 * multiple type-level functions together and apply them to an input.
 *
 * ## Purpose
 *
 * `hkt-toolbelt` provides a variety of higher-order type-level functions that
 * enable users to create complex type-level logic. However, it can be
 * challenging to apply multiple type-level functions to an input without
 * resorting to using intermediary type aliases.
 *
 * For example, imagine we want to append a string to a list of strings and
 * then join the resulting list. We would write this as the following, using
 * `Kind.Pipe`.
 *
 * `Kind.Pipe` is a type-level function that takes a tuple of type-level
 * functions and composes them from left to right.
 *
 * ```ts
 * import { Kind, List, String } from "hkt-toolbelt";
 *
 * type Result = $<
 *   $<Kind.Pipe,
 *   [
 *     $<List.Push, "foo">,
 *     $<String.Join, " ">
 *   ]>,
 *   ["bar", "baz"]
 * > // "bar baz foo"
 * ```
 *
 * This is quite verbose. We can use `$$` to make this code more readable:
 *
 * ```ts
 * import { Kind, List, String, $$ } from "hkt-toolbelt";
 *
 * type Result = $$<
 *   [
 *     $<List.Push, "foo">,
 *     $<String.Join, " ">
 *   ],
 *   ["bar", "baz"]
 * >; // "bar baz foo"
 * ```
 *
 * Here, `$$` is being used to pipe `List.Push` and `String.Join` together and
 * then apply them to a list of strings.
 *
 * ## Parameters
 *
 * @param FX A tuple of type-level functions that will be piped together.
 * @param X The input type that the type-level functions will be applied to.
 *
 * ## Examples
 *
 * ### Basic Usage
 *
 * @example
 *
 * Here's a basic example that uses `$$` to apply a type-level function to an
 * input type:
 *
 * ```ts
 * import { Kind, List, $$ } from "hkt-toolbelt";
 *
 * type Result = $$<
 *   [$<List.Push, "bar">, List.Unshift<"foo">],
 *   [1, 2, 3]
 * >; // ["foo", 1, 2, 3, "bar"]
 * ```
 *
 * Here, `List.Push` and `List.Unshift` are being piped together using `$$` to
 * append "bar" to a list of numbers and then prepend "foo".
 *
 * ## Errors
 *
 * `$$` will enforce that the Nth type-level function's output is a subtype of
 * the (N + 1)th input. If this is not the case, `$$` will return the `never`
 * type.
 *
 * If you receive a `never` type, it can be helpful to use the `Kind.InputOf`
 * and `Kind.OutputOf` type-level functions to inspect the input and output
 * types of the type-level functions that you are piping together.
 */
export type $$<
  FX extends Kind.Kind[],
  X extends FX extends [] ? unknown : Kind._$inputOf<List._$first<FX>>
> = Kind._$pipe<FX, X>;
