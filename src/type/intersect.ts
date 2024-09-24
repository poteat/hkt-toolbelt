import { Kind } from '..'

/**
 * `_$intersect` is a type-level function that takes two types `A` and `B`, and
 * returns the intersection of `A` and `B`.
 *
 * @template A - The first type to intersect.
 * @template B - The second type to intersect.
 *
 * @example
 * ```ts
 * type T0 = _$intersect<[], number> // [] & number
 * type T1 = _$intersect<string, string> // string
 * ```
 */
export type _$intersect<A, B> = A & B

interface Intersect_T<A extends unknown> extends Kind.Kind {
  f(x: this[Kind._]): _$intersect<A, typeof x>
}

/**
 * `Intersect` is a type-level function that takes two types `A` and `B`, and
 * returns the intersection of `A` and `B`.
 *
 * @template A - The first type to intersect.
 * @template B - The second type to intersect.
 *
 * @example
 * ```ts
 * type T0 = $<Intersect, [], number> // [] & number
 * type T1 = $<Intersect, string, string> // string
 * ```
 */
export interface Intersect extends Kind.Kind {
  f(x: this[Kind._]): Intersect_T<typeof x>
}
