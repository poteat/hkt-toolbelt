import { NaturalNumber, Number as Number_, Type, Kind } from '..'

/**
 * Given two natural numbers, `b` and `a`, return their comparison result as
 * -1, 0, or 1.
 *
 * If `a` is less than `b`, return -1.
 * If `a` is greater than `b`, return 1.
 * If `a` is equal to `b`, return 0.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type T0 = NaturalNumber._$compareBy<2, 3>; // 1
 * ```
 */
export type _$compareBy<
  A extends Number_.Number,
  B extends Number_.Number
> = NaturalNumber._$compare<B, A>

export interface CompareBy_T<A extends Number_.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number_.Number>
  ): Number_._$isNatural<typeof x> extends true
    ? _$compareBy<A, typeof x>
    : never
}

/**
 * Given two natural numbers, `b` and `a`, return their comparison result as
 * -1, 0, or 1.
 *
 * If `a` is less than `b`, return -1.
 * If `a` is greater than `b`, return 1.
 * If `a` is equal to `b`, return 0.
 *
 * @example
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type T0 = $<$<NaturalNumber.CompareBy, 2>, 3>; // 1
 * ```
 */
export interface CompareBy extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number_.Number>
  ): Number_._$isNatural<typeof x> extends true ? CompareBy_T<typeof x> : never
}

/**
 * Given two natural numbers, `b` and `a`, return their comparison result as
 * -1, 0, or 1.
 *
 * If `a` is less than `b`, return -1.
 * If `a` is greater than `b`, return 1.
 * If `a` is equal to `b`, return 0.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const T0 = NaturalNumber.compareBy(2)(3); // 1
 * ```
 */
export const compareBy = ((a: Number_.Number) => (b: Number_.Number) => {
  return (NaturalNumber.compare(b as number) as any)(a)
}) as Kind._$reify<CompareBy>
