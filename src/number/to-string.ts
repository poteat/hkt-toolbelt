import { Kind, Type, Number } from '..'

/**
 * `_$toString` is a type-level function that converts a number to a string.
 *
 * @template N - The number to convert to a string.
 *
 * @example
 * type T0 = _$toString<5> // '5'
 */
export type _$toString<N extends Number.Number> = `${N}`

/**
 * `ToString` is a type-level function that converts a number to a string.
 *
 * @template N - The number to convert to a string.
 *
 * @example
 * type T0 = $<ToString, 5> // '5'
 */
export interface ToString extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$toString<typeof x>
}
