import { Type, Kind, String } from '..'

/**
 * `String.Split` is a type-level function that splits a string into an array of substrings.
 * 
 * @template S - The string to split.
 * @template Delimiter - The delimiter to split the string by.
 * @template O - The output array of substrings.
 * 
 * @example
 * type T0 = String._$split<'foobar', ''> // ['f', 'o', 'o', 'b', 'a', 'r']
 * type T1 = String._$split<'foo bar', ' '> // ['foo', 'bar']
 */
export type _$split<
  S extends string,
  Delimiter extends string = '',
  O extends unknown[] = []
> = String._$isTemplate<Delimiter> extends true
  ? string[]
  : string extends Delimiter
  ? string[]
  : S extends `${infer Head}${Delimiter}${infer Tail}`
  ? _$split<Tail, Delimiter, [...O, Head]>
  : S extends Delimiter
  ? O
  : [...O, S]

/**
 * `String.Split_T` is an intermediate interface for currying.
 * 
 * @template Delimiter - The delimiter to split the string by.
 */
interface Split_T<Delimiter extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$split<typeof x, Delimiter>
}

/**
 * `String.Split` is a type-level function that splits a string into an array of substrings.
 * 
 * @example
 * type T0 = $<$<String.Split, ''>, 'foobar'> // ['f', 'o', 'o', 'b', 'a', 'r']
 * type T1 = $<$<String.Split, ' '>, 'foo bar'> // ['foo', 'bar']
 */
export interface Split extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Split_T<typeof x>
}
