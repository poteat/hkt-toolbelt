import { $, Type, Kind, NaturalNumber } from '../..'

/**
 * Given a kind, return an isomorphism such that the input is incremented by
 * one, and the output is decremented by one.
 *
 * @param {Kind.Kind} K - The kind to wrap with an increment/decrement.
 *
 * @example
 * ```ts
 * import { Iso } from "hkt-toolbelt";
 *
 * type T0 = Iso.NaturalNumber._$increment<$<NaturalNumber.Multiply, 2>>;
 * type T1 = $<T0, 10>; // (N + 1) * 2 - 1 = 21
 * ```
 */
export type _$increment<K extends Kind.Kind> = $<
  Kind.Pipe,
  [NaturalNumber.Increment, K, NaturalNumber.Decrement]
>

/**
 * Given a kind, return an isomorphism such that the input is incremented by
 * one, and the output is decremented by one.
 *
 * @param {Kind.Kind} K - The kind to wrap with an increment/decrement.
 *
 * @example
 * ```ts
 * import { Iso } from "hkt-toolbelt";
 *
 * type T0 = $<Iso.NaturalNumber.Increment, $<NaturalNumber.Multiply, 2>>;
 * type T1 = $<T0, 10>; // (N + 1) * 2 - 1 = 21
 * ```
 */
export interface Increment extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): _$increment<typeof x>
}

/**
 * Given a kind, return an isomorphism such that the input is incremented by
 * one, and the output is decremented by one.
 *
 * @param {Kind.Kind} K - The kind to wrap with an increment/decrement.
 *
 * @example
 * ```ts
 * import { Iso } from "hkt-toolbelt";
 *
 * const T0 = Iso.NaturalNumber.increment(NaturalNumber.multiply(2));
 * const T1 = T0(10); // (N + 1) * 2 - 1 = 21
 * ```
 */
export const increment = ((f: Kind._$reify<Kind.Kind<(x: number) => number>>) =>
  (x: number) =>
    NaturalNumber.decrement(
      f(NaturalNumber.increment(x))
    )) as Kind._$reify<Increment>
