import { Function, Kind, List, Type } from '..'

/**
 * `_$pipe` is a type-level function that allows users to compose
 * multiple type-level functions together. It takes in a list of functions and a type argument as input,
 * composes the functions in its input list from left to right, and
 * and applies the resulting type-level function to the second input type.
 *
 * @template {Kind.Kind[]} FX - a tuple of type-level functions
 * @template X - a type to which a `Kind` can be applied
 *
 * @see {@link Kind._$compose}
 * The functionality of `_$pipe` is identical to `Kind._$compose`
 * except for the order of evaluation being reversed,
 * which has the advantage of improved readability.
 *
 * @see {@link $$}
 * In short, `$$` is an alias for `_$pipe`.
 * Refer to {@link $$} for examples.
 *
 * ## Errors
 *
 * `_$pipe` ensures that the tuple of kinds is composable by enforcing that
 * Nth type-level function's output is a subtype of the (N + 1)th input.
 * If this is not the case, `_$pipe` will return the `never` type.
 *
 * @see {@link Kind.InputOf} {@link Kind.OutputOf}
 * If you receive a `never` type, it can be helpful to use the `Kind.InputOf`
 * and `Kind.OutputOf` type-level functions to inspect the input and output
 * types of the type-level functions that you are piping together.
 */
export type _$pipe<FX extends Kind.Kind[], X> = Kind._$compose<
  List._$reverse<FX>,
  X
>

interface Pipe_T<FX extends Kind.Kind[]> extends Kind.Kind {
  f(
    x: Type._$cast<
      this[Kind._],
      FX extends [] ? unknown : Kind._$inputOf<List._$first<FX>>
    >
  ): _$pipe<FX, typeof x>
}

/**
 * `Pipe` is a type-level function that allows users to compose
 * multiple type-level functions together. It takes in a list of functions and a type argument as input,
 * composes the functions in its input list from left to right, and
 * and applies the resulting type-level function to the second input type.
 *
 * @template {Kind.Kind[]} FX - a tuple of type-level functions
 * @template X - a type to which a `Kind` can be applied
 *
 * @see {@link Kind.Compose}
 * The functionality of `Pipe` is identical to `Kind.Compose`
 * except for the order of evaluation being reversed, which has the advantage of improved readability.
 *
 * @see {@link $$}
 * In short, `Pipe` is the partially applicable formulation of `$$`.
 * While `$$` immediately applies a composed function to an input,
 * `Pipe` can also be passed into other higher-order type-level functions without being invoked.
 *
 * ## Errors
 *
 * `Pipe` ensures that the tuple of kinds is composable by enforcing that
 * Nth type-level function's output is a subtype of the (N + 1)th input.
 * If this is not the case, `Pipe` will return the `never` type.
 *
 * @see {@link Kind.InputOf} {@link Kind.OutputOf}
 * If you receive a `never` type, it can be helpful to use the `Kind.InputOf`
 * and `Kind.OutputOf` type-level functions to inspect the input and output
 * types of the type-level functions that you are piping together.
 */
export interface Pipe extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind[]>
  ): Kind._$composable<List._$reverse<typeof x>> extends true
    ? Pipe_T<typeof x>
    : never
}

/**
 * Given a list of functions, pipe the functions together, applying them in
 * order from left to right.
 *
 * @example
 * ```ts
 * import { Kind, NaturalNumber } from "hkt-toolbelt";
 *
 * const result = Kind.pipe([
 *   NaturalNumber.increment,
 *   NaturalNumber.increment
 * ])(0) // 2
 * ```
 */
export const pipe = ((fx: Function.Function[]) => (input: unknown) => {
  let value = input

  for (const f of fx) {
    value = f(value as never)
  }

  return value
}) as Kind._$reify<Pipe>
