import { Number as Number_, Type, Kind } from '..'

/**
 * `_$negate` is a type-level function that takes a number type `T`, and returns its negated value.
 *
 * It returns `-T` if T >= 0, and `T` if T < 0.
 *
 * @template T - A number type.
 *
 * @example
 * ```ts
 * import { Number } from "hkt-toolbelt";
 *
 * type Result1 = Number._$negate<42>; // -42
 * type Result2 = Number._$negate<-42>; // 42
 * ```
 */
export type _$negate<
  T,
  RESULT = number extends T
    ? number
    : T extends 0
      ? 0
      : `${T & Number_.Number}` extends `-${infer U extends number}`
        ? U
        : Number_._$fromString<`-${T & Number_.Number}`>
> = RESULT

/**
 * `Negate` is a type-level function that takes a number type `T`, and returns its absolute value.
 *
 * It returns `-T` if T >= 0, and `T` if T < 0.
 *
 * @template T - A number type.
 *
 * @example
 * ```ts
 * import { Number } from "hkt-toolbelt";
 *
 * type Result1 = $<Number.Negate, 42>; // -42
 * type Result2 = $<Number.Negate, -42>; // 42
 * ```
 */
export interface Negate extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): _$negate<typeof x>
}

/**
 * Given a number, return the negation of the number.
 *
 * @param {number} x - The number to negate.
 *
 * @example
 * ```ts
 * import { Number } from "hkt-toolbelt";
 *
 * const result = Number.negate(42)
 * //    ^? -42
 * ```
 */
export const negate = ((x: Number_.Number) =>
  Number(x) === 0 ? 0 : -Number(x)) as Kind._$reify<Negate>
