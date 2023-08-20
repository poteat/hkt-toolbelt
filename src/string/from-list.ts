import { Type, Kind } from '..'

/**
 * `String.FromList` is a type-level function that joins a list of strings into a single string.
 *
 * @template T - The list of strings to join.
 * @template O - The output string, initially empty.
 *
 * @example
 * type T0 = String._$fromList<['hello', ' ', 'world']> // 'hello world'
 * type T1 = String._$fromList<[]> // ''
 */
export type _$fromList<T, O extends string = ''> = 0 extends 1
  ? never
  : T extends [infer Head, ...infer Tail]
  ? _$fromList<Tail, `${O}${Type._$cast<Head, string>}`>
  : O

/**
 * `String.FromList` is a type-level function that joins a list of strings into a single string.
 *
 * @example
 * type T0 = $<String.FromList, ['hello', ' ', 'world']> // 'hello world'
 * type T1 = $<String.FromList, []> // ''
 */
export interface FromList extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string[]>): _$fromList<typeof x>
}
