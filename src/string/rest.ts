import { Type, Kind } from '..'

/**
 * Given a string, return the string with the first character removed.
 *
 * @template S - The string to remove the first character from.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type T0 = String._$rest<'foo'>; // 'oo'
 * type T1 = String._$rest<''>; // ''
 * ```
 */
export type _$rest<S extends string> = S extends `${string}${infer Rest}`
  ? Rest
  : ''

/**
 * Given a string, return the string with the first character removed.
 *
 * @template S - The string to remove the first character from.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type T0 = $<String.Rest, 'foo'>; // 'oo'
 * type T1 = $<String.Rest, ''>; // ''
 * ```
 */
export interface Rest extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$rest<typeof x>
}

/**
 * Given a string, return the string with the first character removed.
 *
 * @param {string} x - The string to remove the first character from.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const T0 = String.rest('foo'); // 'oo'
 * const T1 = String.rest(''); // ''
 * ```
 */
export const rest = ((x: string) => x.slice(1)) as Kind._$reify<Rest>
