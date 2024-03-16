import { Type, Kind, List } from '..'

/**
 * `String._$join` is a type-level function that joins an array of strings into a single string.
 *
 * @template T - The array of strings to join.
 * @template D - The delimiter to use when joining the strings.
 * @template O - The output string.
 *
 * @example
 * type T0 = String._$join<['foo', 'bar'], '-', ''> // 'foo-bar'
 * type T1 = String._$join<['foo', 'bar'], '', ''> // 'foobar'
 */
export type _$join<
  T extends (string | unknown)[],
  D extends string = '',
  O extends string = ''
> = List._$isVariadic<T> extends true
  ? string
  : T extends [infer Head, ...infer Tail]
    ? Tail extends []
      ? `${O}${O extends '' ? '' : D}${Type._$cast<Head, string>}`
      : _$join<
          Type._$cast<Tail, string[]>,
          D,
          `${O}${O extends '' ? '' : D}${Type._$cast<Head, string>}`
        >
    : string[] extends T
      ? `${O}${string}`
      : O

/**
 * `String.Join_T` is an intermediate interface for currying.
 *
 * @template D - The delimiter to use when joining the strings.
 */
interface Join_T<D extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], (string | unknown)[]>): _$join<typeof x, D>
}

/**
 * `String.Join` is a type-level function that joins an array of strings into a single string.
 *
 * @template D - The delimiter to use when joining the strings.
 * @template T - The array of strings to join.
 *
 * @example
 * type T0 = $<$<String.Join, ''>, ['foo', 'bar']> // 'foobar'
 * type T1 = $<$<String.Join, ' '>, ['foo', 'bar', 'qux']> // 'foo bar qux'
 */
export interface Join extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Join_T<typeof x>
}
