import { Type, Kind, String } from '..'

/**
 * `_$replace2` is a helper type utility for `_$replace`.
 */
type _$replace2<
  S extends string,
  From extends string,
  To extends string,
  O extends string = ''
> = S extends `${infer Head}${From}${infer Tail}`
  ? _$replace2<Tail, From, To, `${O}${Head}${To}`>
  : `${O}${S}`

/**
 * `String.Replace` is a type-level function that replaces all instances of a string with another string.
 *
 * @template S - The string to replace in.
 * @template From - The string to replace.
 * @template To - The string to replace with.
 *
 * @example
 * type T0 = String._$replace<'foobar', 'foo', 'bar'> // 'barbar'
 * type T1 = String._$replace<'foo', 'foo', ''> // ''
 */
export type _$replace<
  S extends string,
  From extends string,
  To extends string
> = String._$isTemplate<From> extends true
  ? string
  : string extends From
    ? string
    : From extends ''
      ? `${To}${_$replace2<S, From, To>}`
      : _$replace2<S, From, To>

/**
 * `Replace_T2` is an intermediate interface for currying.
 */
interface Replace_T2<From extends string, To extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$replace<typeof x, From, To>
}

/**
 * `Replace_T` is an intermediate interface for currying.
 */
interface Replace_T<From extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Replace_T2<From, typeof x>
}

/**
 * `String.Replace` is a type-level function that replaces all instances of a string with another string.
 *
 * @template From - The string to replace.
 * @template To - The string to replace with.
 * @template S - The string to replace in.
 *
 * @example
 * type T0 = $<$<$<String.Replace, 'foo'>, 'bar'>, 'foobar'> // 'barbar'
 * type T1 = $<$<$<String.Replace, 'foo'>, ''>, 'foo'> // ''
 */
export interface Replace extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Replace_T<typeof x>
}
