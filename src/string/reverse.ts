import { Type, Kind } from '..'

/**
 * `String._$reverse` is a type-level function that reverses the order of characters in a string.
 *
 * @template S - The string to reverse.
 *
 * @example
 * type T0 = String._$reverse<'foo'> // 'oof'
 * type T1 = String._$reverse<''> // ''
 */
export type _$reverse<
  S extends string,
  O extends string = ''
> = S extends `${infer Head}${infer Tail}`
  ? _$reverse<Tail, `${Head}${O}`>
  : `${string extends S ? string : ''}${O}`

/**
 * `String.Reverse` is a type-level function that reverses the order of characters in a string.
 * @template S - The string to reverse.
 *
 * @example
 * type T0 = $<String.Reverse, 'foo'> // 'oof'
 * type T1 = $<String.Reverse, ''> // ''
 */
export interface Reverse extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$reverse<typeof x>
}

/**
 * Given a string, return the string with the characters in reverse order.
 *
 * @param {string} x - The string to reverse.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.reverse('foo')
 * //    ^? 'oof'
 * ```
 */
export const reverse = ((x: string) =>
  [...x].reverse().join('')) as Kind._$reify<Reverse>
