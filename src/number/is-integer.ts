import { Type, Kind, Number as Number_ } from '..'

/**
 * `Number.IsInteger` is a type-level function that checks if a number is an integer.
 *
 * @template T - The number to check.
 *
 * @example
 * type T0 = Number._$isInteger<1> // true
 * type T1 = Number._$isInteger<1.5> // false
 */
export type _$isInteger<T extends Number_.Number> = `${T}` extends `${bigint}`
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
  f(x: Type._$cast<this[Kind._], Number_.Number>): _$isInteger<typeof x>
}

/**
 * Given a number, determines if it is an integer.
 */
export const isInteger = ((value: Number_.Number) =>
  typeof value === 'bigint'
    ? true
    : Number.isInteger(Number(value))) as Kind._$reify<IsInteger>
