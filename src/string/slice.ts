import { List, Kind, Type, Number, String } from '..'

/**
 * `String._$slice` is a type-level function that slices a string from a given index.
 *
 * @template S - The string to slice.
 * @template N - The index from which to start the slice.
 *
 * @example
 * type T0 = String._$slice<'hello', 1> // 'ello'
 * type T1 = String._$slice<'hello', 0> // 'hello'
 */
export type _$slice<
  S extends string,
  N extends Number.Number
> = String._$fromList<List._$shiftN<String._$toList<S>, N>>

interface Slice_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$slice<typeof x, N>
}

/**
 * `String.Slice` is a type-level function that slices a string from a given index.
 *
 * @example
 * type T0 = $<$<String.Slice, 1>, 'hello'> // 'ello'
 * type T1 = $<$<String.Slice, 0>, 'hello'> // 'hello'
 */
export interface Slice extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Slice_T<typeof x>
}
