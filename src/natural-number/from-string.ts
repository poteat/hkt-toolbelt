import { Kind, Type, Number as Number_ } from '..'

/**
 * `_$fromString` is a type-level function that converts a string to a natural number.
 * If the string doesn't represent a natural number, returns never.
 *
 * @template T - The string to convert to a natural number.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type T0 = NaturalNumber._$fromString<'123'>; // 123
 * type T1 = NaturalNumber._$fromString<'-123'>; // never
 * type T2 = NaturalNumber._$fromString<'0'>; // 0
 * type T3 = NaturalNumber._$fromString<'abc'>; // never
 * ```
 */
export type _$fromString<T extends Number_.Number> =
  Number_._$fromString<T> extends infer N extends number
    ? Number_._$isNatural<N> extends true
      ? N
      : never
    : never

/**
 * `FromString` is a type-level function that converts a string to a natural number.
 * If the string doesn't represent a natural number, returns never.
 *
 * @template T - The string to convert to a natural number.
 *
 * @example
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type T0 = $<NaturalNumber.FromString, '123'>; // 123
 * type T1 = $<NaturalNumber.FromString, '-123'>; // never
 * type T2 = $<NaturalNumber.FromString, '0'>; // 0
 * type T3 = $<NaturalNumber.FromString, 'abc'>; // never
 * ```
 */
export interface FromString extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): _$fromString<typeof x>
}

/**
 * Given a string, convert it to a natural number.
 * If the string doesn't represent a natural number, returns NaN.
 *
 * @param {string} x - The string to convert to a natural number.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const result1 = NaturalNumber.fromString('123');
 * //    ^? 123
 * const result2 = NaturalNumber.fromString('-123');
 * //    ^? NaN
 * const result3 = NaturalNumber.fromString('abc');
 * //    ^? NaN
 * ```
 */
export const fromString = ((x: string) => {
  const num = Number(x)
  return Number.isInteger(num) && num >= 0 ? num : NaN
}) as Kind._$reify<FromString>
