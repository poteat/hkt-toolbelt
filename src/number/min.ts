import { Kind, Type, Number } from '..'

/**
 * `_$min` is a type-level function that returns the minimum of two numbers.
 *
 * @template A - The first number.
 * @template B - The second number.
 *
 * @example
 * type T0 = _$min<1, 2> // 1
 * type T1 = _$min<5, 10> // 5
 */
export type _$min<A extends Number.Number, B extends Number.Number> =
  Number._$compare<A, B> extends -1 ? A : B

interface Min_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$min<typeof x, N>
}

/**
 * `Number.Min` is a type-level function that returns the minimum of two numbers.
 *
 * @template A - The first number.
 * @template B - The second number.
 *
 * @example
 * type T0 = $<$<Number.Min, 1>, 2> // 1
 * type T1 = $<$<Number.Min, 5>, 10> // 5
 */
export interface Min extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Min_T<typeof x>
}
