import { Kind } from '..'

/**
 * `_$valueOf` is a type-level function that extracts the values associated
 * with the type, if any exist, via `keyof`. For arrays, values consist of their
 * elements, while for objects, values consist of the values associated with each key.
 * In both circumstances, we receive a union of all possible entries.
 *
 * @template T - The type to extract values from.
 *
 * @example
 * type T0 = _$valueOf<['foo', 'bar']> // 'foo' | 'bar'
 * type T1 = _$valueOf<{ foo: 'foo'; bar: 'bar' }> // 'foo' | 'bar'
 */
export type _$valueOf<T> = T extends unknown[] ? T[number] : T[keyof T]

/**
 * `ValueOf` is a type-level function that extracts the values associated
 * with the type, if any exist, via `keyof`. For arrays, values consist of their
 * elements, while for objects, values consist of the values associated with each key.
 * In both circumstances, we receive a union of all possible entries.
 *
 * @template T - The type to extract values from.
 *
 * @example
 * type T0 = $<ValueOf, ['foo', 'bar']> // 'foo' | 'bar'
 * type T1 = $<ValueOf, { foo: 'foo'; bar: 'bar' }> // 'foo' | 'bar'
 */
export interface ValueOf extends Kind.Kind {
  f(x: this[Kind._]): _$valueOf<typeof x>
}
