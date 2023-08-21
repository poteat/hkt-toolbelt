import { Type, Kind } from '..'

type _ReverseHelper<
  S extends string,
  O extends string = ''
> = S extends `${infer Head}${infer Tail}`
  ? _ReverseHelper<Tail, `${Head}${O}`>
  : `${string extends S ? string : ''}${O}`

/**
 * `String._$reverse` is a type-level function that reverses the order of characters in a string.
 *
 * @template S - The string to reverse.
 *
 * @example
 * type T0 = String._$reverse<'foo'> // 'oof'
 * type T1 = String._$reverse<''> // ''
 */
export type _$reverse<S extends string> = _ReverseHelper<S>

/**
 * `String.Reverse` is a type-level function that reverses the order of characters in a string.
 *
 * @example
 * type T0 = $<String.Reverse, 'foo'> // 'oof'
 * type T1 = $<String.Reverse, ''> // ''
 */
export interface Reverse extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$reverse<typeof x>
}
