import { $, $$, Type, List, Kind } from '..'

/**
 * `_$compose` is a type-level function that allows users to compose
 * multiple type-level functions together. It takes in a list of functions and a type argument as input,
 * composes the functions in its input list from right to left,
 * and applies the resulting type-level function to the second input type.
 *
 * @param {Kind.Kind[]} FX a tuple of type-level functions
 * @param X a type to which a `Kind` can be applied.
 *
 * @see {@link Kind._$pipe}
 * `Kind._$pipe` provides the same functionality as `_$compose` but evaluates the list of functions in reverse order.
 *
 * @see {@link $$}
 * In short, `$$` is an alias for `_$compose` where `FX` is reversed.
 * Refer to {@link $$} for examples.
 *
 * ## Errors
 *
 * `_$compose` ensures that the tuple of kinds is composable by enforcing that
 * the Nth type-level function's output is a subtype of the (N + 1)th input.
 * If this is not the case, `_$compose` will return the `never` type.
 *
 * @see {@link Kind.InputOf} {@link Kind.OutputOf}
 * If you receive a `never` type, it can be helpful to use the `Kind.InputOf`
 * and `Kind.OutputOf` type-level functions to inspect the input and output
 * types of the type-level functions that you are composing together.
 */
export type _$compose<FX extends Kind.Kind[], X> = FX extends [
  ...infer Init,
  infer Last
]
  ? _$compose<
      Type._$cast<Init, Kind.Kind[]>,
      $<
        Type._$cast<Last, Kind.Kind>,
        Type._$cast<X, Kind._$inputOf<Type._$cast<Last, Kind.Kind>>>
      >
    >
  : X

interface Compose_T<FX extends Kind.Kind[]> extends Kind.Kind {
  f(
    x: Type._$cast<
      this[Kind._],
      FX extends [] ? unknown : Kind._$inputOf<List._$last<FX>>
    >
  ): _$compose<FX, typeof x>
}

/**
 * `Compose` is a type-level function that allows users to compose
 * multiple type-level functions together. It takes in a list of functions and a type argument as input,
 * composes the functions in its input list from right to left,
 * and returns a higher-kinded-type function that takes in a type and returns the result of the composition.
 *
 * @param {Kind.Kind[]} FX  a tuple of type-level functions
 * @param X a type to which a `Kind` can be applied.
 *
 * @see {@link Kind.Pipe}
 * `Kind.Pipe` provides the same functionality as `Compose` but evaluates the list of functions in reverse order.
 *
 * @see {@link $$}
 * While `$$` immediately applies a composed function to an input,
 * `Compose` can also be passed into other higher-order type-level functions without being invoked.
 *
 * ## Errors
 *
 * `Compose` ensures that the tuple of kinds is composable by enforcing that
 * the Nth type-level function's output is a subtype of the (N + 1)th input.
 * If this is not the case, `Compose` will return the `never` type.
 *
 * @see {@link Kind.InputOf} {@link Kind.OutputOf}
 * If you receive a `never` type, it can be helpful to use the `Kind.InputOf`
 * and `Kind.OutputOf` type-level functions to inspect the input and output
 * types of the type-level functions that you are composing together.
 */
export interface Compose extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind[]>
  ): Kind._$composable<typeof x> extends true ? Compose_T<typeof x> : never
}
