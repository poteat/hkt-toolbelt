import { Type, Kind, Number } from '..'

/**
 * `Number.IsInteger` is a type-level function that checks if a number is an integer.
 *
 * @template T - The number to check.
 *
 * @example
 * type T0 = Number._$isInteger<1> // true
 * type T1 = Number._$isInteger<1.5> // false
 */
export type _$isInteger<T extends Number.Number> = `${T}` extends `${bigint}`
  ? T extends `0x${string}`
    ? false
    : true
  : false

/**
 * `Number.IsInteger` is a type-level function that checks if a number is an integer.
 *
 * @template T - The number to check.
 *
 * @example
 * type T0 = $<Number.IsInteger, 1> // true
 * type T1 = $<Number.IsInteger, 1.5> // false
 */
export interface IsInteger extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$isInteger<typeof x>
}
