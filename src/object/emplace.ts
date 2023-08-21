import { Type, Kind } from '..'

/**
 * `Object._$emplace` is a type-level function that emplaces a value into a key.
 * It generates a new object with a single key-value pair, it doesn't modify or add to an existing object.
 *
 * @template K - The key to emplace the value into.
 * @template V - The value to emplace.
 * 
 * @example
 * type T0 = Object._$emplace<'a', 1> // { a: 1 }
 * type T1 = Object._$emplace<'b', 'hello'> // { b: 'hello' }
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
 * It generates a new object with a single key-value pair, it doesn't modify or add to an existing object.
 *
 * @template K - The key to emplace the value into.
 * @template V - The value to emplace.
 * 
 * @example
 * type T0 = $<$<Object.Emplace, 'a'>, 1> // { a: 1 }
 * type T1 = $<$<Object.Emplace, 'b'>, 'hello'> // { b: 'hello' }
 */
export interface Emplace extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string | number | symbol>): Emplace_T<typeof x>
}
