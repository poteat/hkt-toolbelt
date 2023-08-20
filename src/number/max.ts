import { Kind, Type, Number } from '..'

/**
 * `_$max` is a type-level function that returns the maximum of two numbers.
 *
 * @template A - The first number.
 * @template B - The second number.
 *
 * @example
 * type T0 = _$max<1, 2> // 2
 * type T1 = _$max<5, 10> // 10
 */
export type _$max<
  A extends Number.Number,
  B extends Number.Number
> = Number._$compare<A, B> extends 1 ? A : B

interface Max_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$max<typeof x, N>
}

/**
 * `Number.Max` is a type-level function that returns the maximum of two numbers.
 *
 * @template X - The current type.
 * @template N - The number to compare with.
 *
 * @example
 * type T0 = $<$<Number.Max, 1>, 2> // 2
 * type T1 = $<$<Number.Max, 5>, 10> // 10
 */
export interface Max extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Max_T<typeof x>
}
