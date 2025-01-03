import { $, Type, Kind, NaturalNumber, Number } from '../..'

/**
 * Given a kind, return an isomorphism such that the input is converted to a
 * list of digits, and the output is converted from a list of digits back to a
 * natural number.
 *
 * @param {Kind.Kind} K - The kind to convert to a natural number.
 *
 * @example
 * ```ts
 * import { Iso } from "hkt-toolbelt";
 *
 * type T0 = Iso.NaturalNumber._$digits<$<List.Map<$<NaturalNumber.Multiply, 2>>>;
 * type T1 = $<T0, 99>; // 1818
 * ```
 */
export type _$digits<
  K extends Kind.Kind<(x: Number.Number[]) => Number.Number[]>
> = $<Kind.Pipe, [NaturalNumber.Digits, K, NaturalNumber.Undigits]>

/**
 * Given a kind, return an isomorphism such that the input is converted to a
 * list of digits, and the output is converted from a list of digits back to a
 * natural number.
 *
 * @param {Kind.Kind} K - The kind to convert to a natural number.
 *
 * @example
 * ```ts
 * import { Iso } from "hkt-toolbelt";
 *
 * type T0 = $<Iso.NaturalNumber.Digits, $<List.Map, $<NaturalNumber.Multiply, 2>>>
 * type T1 = $<T0, 99>; // 1818
 * ```
 */
export interface Digits extends Kind.Kind {
  f(
    x: Type._$cast<
      this[Kind._],
      Kind.Kind<(x: Number.Number[]) => Number.Number[]>
    >
  ): _$digits<typeof x>
}

/**
 * Given a kind, return an isomorphism such that the input is converted to a
 * list of digits, and the output is converted from a list of digits back to a
 * natural number.
 *
 * @param {Kind.Kind} K - The kind to convert to a natural number.
 *
 * @example
 * ```ts
 * import { Iso } from "hkt-toolbelt";
 *
 * const T0 = Iso.NaturalNumber.digits(List.map(NaturalNumber.multiply(2)));
 * const T1 = T0(99); // 1818
 * ```
 */
export const digits = ((
    f: Kind._$reify<Kind.Kind<(x: Number.Number[]) => number[]>>
  ) =>
  (x: number) =>
    NaturalNumber.undigits(f(NaturalNumber.digits(x)))) as Kind._$reify<Digits>
