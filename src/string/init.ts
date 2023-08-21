import { Type, Kind } from '..'

type _$init2<
  S extends string,
  O extends string = ''
> = S extends `${infer Head}${infer Tail}`
  ? Tail extends ''
    ? O
    : _$init2<Tail, `${O}${Head}`>
  : O

/**
 * `String._$init` is a type-level function that extracts every element before the last element of a string.
 *
 * @template S - The string to extract the init from.
 *
 * @example
 * type T0 = String._$init<'foo'> // 'fo'
 * type T1 = String._$init<''> // ''
 */
export type _$init<S extends string> = string extends S ? string : _$init2<S>

/**
 * `String.Init` is a type-level function that extracts every element before the last element of a string.
 *
 * @template S - The string to extract the init from.
 *
 * @example
 * type T0 = $<String.Init, 'foo'> // 'fo'
 * type T1 = $<String.Init, ''> // ''
 */
export interface Init extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$init<typeof x>
}
