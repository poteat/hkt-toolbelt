import { Number, NaturalNumber, DigitList, Type, Kind } from '..'

/**
 * `_$subtract` is a type-level function that subtracts one natural number from
 * another. It returns the result of the subtraction.
 *
 * @param {Number.Number} A - A natural number to subtract.
 * @param {Number.Number} B - A natural number to subtract by.
 * @returns {Number.Number} A natural number.
 *
 * @example
 * For example, we can use `_$subtract` to subtract one natural number from another:
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = NaturalNumber._$subtract<125, 121>; // 4
 * ```
 *
 * @example
 * If `B` is larger than `A`, zero is returned.
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type IsZero = NaturalNumber._$subtract<121, 125>; // 0
 * ```
 */
export type _$subtract<
  A extends Number.Number,
  B extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<B>,
  SUB_LIST extends DigitList.DigitList = DigitList._$subtract<A_LIST, B_LIST>,
  RESULT = DigitList._$toNumber<SUB_LIST>
> = RESULT

interface Subtract_T<X extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$subtract<X, typeof x> : never
}

/**
 * `Subtract` is a type-level function that subtracts one natural number from
 * another. It returns the result of the subtraction.
 *
 * @param {Number.Number} A - A natural number to subtract.
 * @param {Number.Number} B - A natural number to subtract by.
 * @returns {Number.Number} A natural number or `never`.
 *
 * @example
 * For example, we can use `Subtract` to subtract one natural number from another:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<NaturalNumber.Subtract, 50>, 25>; // 25
 * ```
 *
 * @example
 * If `B` is larger than `A`, zero is returned.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type IsZero = $<$<NaturalNumber.Subtract, 25>, 50>; // 0
 * ```
 *
 * @example
 * If one of the inputs is not a natural number, `never` is returned.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type IsNever = $<NaturalNumber.Subtract, -42.42>; // never
 * ```
 */
export interface Subtract extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? Subtract_T<typeof x> : never
}
