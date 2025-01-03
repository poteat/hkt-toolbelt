import { $, Type, Kind, NaturalNumber } from '../..'

/**
 * Given a kind, return an isomorphism such that the input is decremented by
 * one, and the output is incremented by one.
 *
 * @param {Kind.Kind} K - The kind to wrap with an increment/decrement.
 *
 * @example
 * ```ts
 * import { Iso } from "hkt-toolbelt";
 *
 * type T0 = Iso.NaturalNumber._$decrement<$<NaturalNumber.Multiply, 2>>;
 * type T1 = $<T0, 10>; // (N - 1) * 2 + 1 = 19
 * ```
 */
export type _$decrement<K extends Kind.Kind> = $<
  Kind.Pipe,
  [NaturalNumber.Decrement, K, NaturalNumber.Increment]
>

/**
 * Given a kind, return an isomorphism such that the input is decremented by
 * one, and the output is incremented by one.
 *
 * @param {Kind.Kind} K - The kind to wrap with an increment/decrement.
 *
 * @example
 * ```ts
 * import { Iso } from "hkt-toolbelt";
 *
 * type T0 = $<Iso.NaturalNumber.Decrement, $<NaturalNumber.Multiply, 2>>;
 * type T1 = $<T0, 10>; // (N - 1) * 2 + 1 = 19
 * ```
 */
export interface Decrement extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): _$decrement<typeof x>
}

/**
 * Given a kind, return an isomorphism such that the input is decremented by
 * one, and the output is incremented by one.
 *
 * @param {Kind.Kind} K - The kind to wrap with an increment/decrement.
 *
 * @example
 * ```ts
 * import { Iso } from "hkt-toolbelt";
 *
 * const T0 = Iso.NaturalNumber.decrement(NaturalNumber.multiply(2));
 * const T1 = T0(10); // (N - 1) * 2 + 1 = 19
 * ```
 */
export const decrement = ((f: Kind._$reify<Kind.Kind<(x: number) => number>>) =>
  (x: number) =>
    NaturalNumber.increment(
      f(NaturalNumber.decrement(x))
    )) as Kind._$reify<Decrement>
