import { Type, Kind, Number } from '..'

/**
 * `_$sign` is a type-level function that returns the sign of a number.
 *
 * @template T - The number to get the sign of.
 *
 * @example
 * type T0 = _$sign<5> // '+'
 * type T1 = _$sign<-5> // '-'
 */
export type _$sign<T extends Number.Number> = number extends T
  ? '+' | '-'
  : `${T}` extends `-${string}`
  ? '-'
  : '+'

/**
 * `Number.Sign` is a type-level function that returns the sign of a number.
 *
 * @template T - The number to get the sign of.
 *
 * @example
 * type T0 = $<Number.Sign, 5> // '+'
 * type T1 = $<Number.Sign, -5> // '-'
 */
export interface Sign extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$sign<typeof x>
}
