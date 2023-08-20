import { Number, Kind, Type } from '..'

/**
 * `Number.IsFractional` is a type-level function that checks if a number is fractional.
 *
 * @template T - The number to check.
 *
 * @example
 * type T0 = Number._$isFractional<1.5> // true
 * type T1 = Number._$isFractional<1> // false
 */
export type _$isFractional<
  T extends Number.Number,
  IS_INTEGER = Number._$isInteger<T>
> = number extends T ? false : IS_INTEGER extends true ? false : true

/**
 * `Number.IsFractional` is a type-level function that checks if a number is fractional.
 *
 * @template T - The number to check.
 *
 * @example
 * type T0 = $<Number.IsFractional, 1.5> // true
 * type T1 = $<Number.IsFractional, 1> // false
 */
export interface IsFractional extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$isFractional<typeof x>
}
