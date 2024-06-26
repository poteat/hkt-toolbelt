import { Number, Type, Kind } from '..'

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
  RESULT = T extends 0
    ? 0
    : `${T & Number.Number}` extends `-${infer U extends number}`
      ? U
      : Number._$fromString<`-${T & Number.Number}`>
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
  f(x: Type._$cast<this[Kind._], Number.Number>): _$negate<typeof x>
}
