import { Kind, Type, Object } from '..'

/**
 * `Object._$values` is a type-level function that returns the values of an object as a tuple.
 * 
 * @template T - The object to get the values of.
 * 
 * @example
 * type T0 = Object._$values<{ a: 1; b: 2; c: 3 }> // [1, 2, 3]
 * type T1 = Object._$values<{}> // []
 */
export type _$values<
  T extends Record<string, unknown>,
  Keys = Object._$keys<T>
> = {
  [key in keyof Keys]: T[Type._$cast<Keys[key], keyof T>]
}

/**
 * `Object.Values` is a type-level function that returns the values of an object as a tuple.
 * 
 * @template T - The object to get the values of.
 * 
 * @example
 * type T0 = $<Object.Values, { a: 1; b: 2; c: 3 }>[number] // 1 | 2 | 3
 * type T1 = $<Object.Values, {}> // []
 */
export interface Values extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Record<string, unknown>>): _$values<typeof x>
}
