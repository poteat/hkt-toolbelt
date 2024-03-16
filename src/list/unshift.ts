import { Type, Kind } from '..'

export type _$unshift<X, T extends unknown[]> = [X, ...T]

interface Unshift_T<X> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$unshift<X, typeof x>
}

/**
 * `Unshift` is a type-level function that adds an element to the beginning of a
 * tuple.
 */
export interface Unshift extends Kind.Kind {
  f(x: this[Kind._]): Unshift_T<typeof x>
}
