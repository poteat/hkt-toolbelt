import { $, Kind, Type, Object } from '..'

/**
 * `Object._$deepMapValues` is a type-level function that deeply maps over the values in an object.
 * 
 * @template F - The function to apply to each value.
 * @template O - The object to map over.
 * 
 * @example
 * type T0 = Object._$deepMapValues<$<String.StartsWith, 'foo'>, { a: 'foobar'; b: 'foo'; c: 'bar' }> // { a: true; b: true; c: false }
 * type T1 = Object._$deepMapValues<$<String.StartsWith, 'foo'>, { a: { b: 'foobar'; c: 'foo' }; d: 'bar' }> // { a: { b: true; c: true }; d: false }
 */
export type _$deepMapValues<F extends Kind.Kind, O> = {
  [key in keyof O]: Type._$display<
    O[key] extends Record<string, unknown>
      ? _$deepMapValues<F, O[key]>
      : $<F, Type._$cast<O[key], Kind._$inputOf<F>>>
  >
}

/**
 * `Object.DeepMapValues_T` is an intermediate interface for currying.
 * 
 * @template T - The function to apply to each value.
 */
interface DeepMapValues_T<T extends Kind.Kind> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Object._$deepInputOf<T>>
  ): _$deepMapValues<T, typeof x>
}

/**
 * `Object.DeepMapValues` is a type-level function that deeply maps over the values in an object.
 * 
 * @template T - The function to apply to each value.
 * 
 * @example
 * type T0 = $<$<Object.DeepMapValues, $<String.StartsWith, 'foo'>>, { a: 'foobar'; b: 'foo'; c: 'bar' }> // { a: true; b: true; c: false }
 * type T1 = $<$<Object.DeepMapValues, $<String.StartsWith, 'foo'>>, { a: { b: 'foobar'; c: 'foo' }; d: 'bar' }> // { a: { b: true; c: true }; d: false }
 */
export interface DeepMapValues extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): DeepMapValues_T<typeof x>
}
