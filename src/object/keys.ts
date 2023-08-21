import { Kind, Type, Union } from '..'

/**
 * `Object.Keys` is a type-level function that returns the keys of an object as a tuple.
 * 
 * @template T - The object to get the keys of.
 * 
 * @example
 * type T0 = Object._$keys<{ a: 1; b: 2; c: 3 }> // ['a', 'b', 'c']
 */
export type _$keys<T extends Record<string, unknown>> = Union._$toList<keyof T>

/**
 * `Object.Keys` is a type-level function that returns the keys of an object as a tuple.
 * 
 * @template T - The object to get the keys of.
 * 
 * @example
 * type T0 = $<Object.Keys, { a: 1; b: 2; c: 3 }> // ['a', 'b', 'c']
 */
export interface Keys extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Record<string, unknown>>): _$keys<typeof x>
}
