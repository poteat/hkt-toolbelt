import { Kind, Type, Number, List } from '..'

/**
 * `_$sliceList` is a type-level function that takes in a list `T`, a start
 * index `S`, and an end index `E`, and returns a slice of the list.
 *
 * This is an argument-swapped version of `List._$slice`.
 *
 * @template T - The list to slice.
 * @template S - The start index.
 * @template E - The end index.
 *
 * @example
 * ```ts
 * type T0 = _$sliceList<[1, 2, 3, 4, 5], 1, 3> // [2, 3]
 * ```
 */
type _$sliceList<
  T extends List.List,
  S extends Number.Number,
  E extends Number.Number
> = List._$slice<T, S, E>

interface SliceList_T2<T extends List.List, S extends Number.Number>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$sliceList<T, S, typeof x>
}

interface SliceList_T1<T extends List.List> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): SliceList_T2<T, typeof x>
}

/**
 * `SliceList` is a type-level function that takes in a list `T`, a start
 * index `S`, and an end index `E`, and returns a slice of the list.
 *
 * This is an argument-swapped version of `List.Slice`.
 *
 * @template T - The list to slice.
 * @template S - The start index.
 * @template E - The end index.
 *
 * @example
 * ```ts
 * type T0 = $<$<$<List.SliceList, [1, 2, 3, 4, 5]>, 1>, 3> // [2, 3]
 * ```
 */
export interface SliceList extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], List.List>): SliceList_T1<typeof x>
}

/**
 * Given a list, a start index, and an end index, return a slice of the list.
 *
 * @param {List.List} x - The list to slice.
 * @param {number} s - The start index.
 * @param {number} e - The end index.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.sliceList([1, 2, 3, 4, 5])(1)(3)
 * //    ^? [2, 3]
 * ```
 */
export const sliceList = ((x: List.List) => (s: number) => (e: number) =>
  x.slice(s, e)) as Kind._$reify<SliceList>
