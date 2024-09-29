import { $, Kind, List, Type } from '..'

/**
 * `FlatMap` is a type-level function that applies a mapping function to each
 * element of a list, and returns a flattened list of the results (by one
 * level only).
 *
 * Elements returned by the mapping function which are not lists will remain
 * in place in the flattened list.
 *
 * @template F - The type-level function to apply to each element of the list.
 * @template X - The list to apply the type-level function to.
 *
 * @returns A flattened list of the results of applying the type-level function
 * to each element of the list.
 *
 * @example
 *
 * ```ts
 * import { $, List, String } from "hkt-toolbelt";
 *
 * type T0 = $<List.FlatMap<List.Times, [1, 2, 3]>> // [0, 0, 1, 0, 1, 2]
 * ```
 */
export type _$flatMap<
  F extends Kind.Kind,
  X extends unknown[],
  O extends unknown[] = []
> = X extends [infer Head, ...infer Tail]
  ? $<F, Type._$cast<Head, Kind._$inputOf<F>>> extends infer Result
    ? Result extends List.List
      ? _$flatMap<F, Tail, [...O, ...Result]>
      : _$flatMap<F, Tail, [...O, Result]>
    : never
  : O

interface FlatMap_T<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$flatMap<F, typeof x>
}

/**
 * `FlatMap` is a type-level function that applies a mapping function to each
 * element of a list, and returns a flattened list of the results (by one
 * level only).
 *
 * Elements returned by the mapping function which are not lists will remain
 * in place in the flattened list.
 *
 * @template F - The type-level function to apply to each element of the list.
 * @template X - The list to apply the type-level function to.
 *
 * @returns A flattened list of the results of applying the type-level function
 * to each element of the list.
 *
 * @example
 *
 * ```ts
 * import { $, List, String } from "hkt-toolbelt";
 *
 * type T0 = $<List.FlatMap<List.Times, [1, 2, 3]>> // [0, 0, 1, 0, 1, 2]
 * ```
 */
export interface FlatMap extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): FlatMap_T<typeof x>
}
