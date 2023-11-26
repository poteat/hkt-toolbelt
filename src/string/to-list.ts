import { Type, Kind } from '..'

/**
 * `String._$toList` is a type-level function that splits a string into a list of its characters.
 *
 * @template S - The string to split.
 *
 * @example
 * type T0 = String._$toList<'hello'> // ['h', 'e', 'l', 'l', 'o']
 * type T1 = String._$toList<''> // []
 */
export type _$toList<S extends string, O extends string[] = []> = 0 extends 1
  ? never
  : string extends S
    ? [string]
    : S extends `${infer Head}${infer Tail}`
      ? _$toList<Tail, [...O, Head]>
      : O

/**
 * `String.ToList` is a type-level function that splits a string into a list of its characters.
 *
 * @template S - The string to split.
 *
 * @example
 * type T0 = $<String.ToList, 'hello'> // ['h', 'e', 'l', 'l', 'o']
 * type T1 = $<String.ToList, ''> // []
 */
export interface ToList extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$toList<typeof x>
}
