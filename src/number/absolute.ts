import { Number, Type, Kind } from "..";

/**
 * `_$absolute` is a type-level function that takes a number type `T`, and returns its absolute value. 
 * 
 * It returns `T` if T >= 0, and `-T` if T < 0.
 *
 * @param T A number type.
 *
 * @example
 * ```ts
 * import { Number } from "hkt-toolbelt";
 *
 * type Result1 = Number._$absolute<42>; // 42
 * type Result2 = Number._$absolute<-42>; // 42
 * ```
 */
export type _$absolute<T extends Number.Number> = `${T}` extends `-${infer U extends number}` ? U : T

/**
 * `Absolute` is a type-level function that takes a number type `T`, and returns its absolute value. 
 * 
 * It returns `T` if T >= 0, and `-T` if T < 0.
 *
 * @param T A number type.
 *
 * @example
 * ```ts
 * import { Number } from "hkt-toolbelt";
 *
 * type Result1 = $<Number.Absolute, 42>; // 42
 * type Result2 = $<Number.Absolute, -42>; // 42
 * ```
 */
export interface Absolute extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$absolute<typeof x>;
}
