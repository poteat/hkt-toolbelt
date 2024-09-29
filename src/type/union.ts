import { Kind } from '..'

/**
 * `_$union` is a type-level function that takes two types `A` and `B`, and
 * returns the union of `A` and `B`.
 *
 * @template A - The first type to union.
 * @template B - The second type to union.
 *
 * @example
 * ```ts
 * type T0 = _$union<[], number> // number
 * type T1 = _$union<string, string> // string
 * ```
 */
export type _$union<A, B> = A | B

interface Union_T<A extends unknown> extends Kind.Kind {
  f(x: this[Kind._]): _$union<A, typeof x>
}

/**
 * `Union` is a type-level function that takes two types `A` and `B`, and
 * returns the union of `A` and `B`.
 *
 * @template A - The first type to union.
 * @template B - The second type to union.
 *
 * @example
 * ```ts
 * type T0 = $<Union, [], number> // number
 * type T1 = $<Union, string, string> // string
 * ```
 */
export interface Union extends Kind.Kind {
  f(x: this[Kind._]): Union_T<typeof x>
}
