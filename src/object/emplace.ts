import { Type, Kind } from '..'

/**
 * `Object._$emplace` is a type-level function that emplaces a value into a key.
 * 
 * @template K - The key to emplace the value into.
 * @template V - The value to emplace.
 */
export type _$emplace<K extends string | number | symbol, V> = {
  [k in K]: V
}

/**
 * `Object.Emplace_T` is an intermediate interface for currying.
 * 
 * @template K - The key to emplace the value into.
 */
interface Emplace_T<K extends string | number | symbol> extends Kind.Kind {
  f(x: this[Kind._]): _$emplace<K, typeof x>
}

/**
 * `Object.Emplace` is a type-level function that emplaces a value into a key.
 * 
 * @template K - The key to emplace the value into.
 */
export interface Emplace extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string | number | symbol>): Emplace_T<typeof x>
}
