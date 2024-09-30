import { Kind } from '..'

/**
 * `String._$isString` is a type-level function that checks if a type is a string.
 *
 * @template S - The type to check.
 *
 * @example
 * type T0 = String._$isString<'hello'> // true
 * type T1 = String._$isString<123> // false
 */
export type _$isString<S extends unknown> = S extends string ? true : false

/**
 * `String.IsString` is a type-level function that checks if a type is a string.
 *
 * @template S - The type to check.
 *
 * @example
 * type T0 = $<String.IsString, 'hello'> // true
 * type T1 = $<String.IsString, 123> // false
 */
export interface IsString extends Kind.Kind {
  f(x: this[Kind._]): _$isString<typeof x>
}

/**
 * Given a string, check if it is a string.
 *
 * @param {string} x - The string to check.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.isString('hello')
 * //    ^? true
 * ```
 */
export const isString = ((x: string) =>
  typeof x === 'string') as Kind._$reify<IsString>
