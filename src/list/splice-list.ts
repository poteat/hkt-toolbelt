import { $, Kind, Type, Number, List } from '..'

/**
 * `_$spliceList` is a type-level function that changes the contents of a list
 * by removing or replacing existing elements and/or adding new elements.
 *
 * This is an argument-swapped version of `_$splice`.
 *
 * @template {unknown[]} T - The input list.
 * @template {number} START - The starting index to splice at.
 * @template {number} DEL_COUNT - The number of elements to remove.
 * @template {unknown[]} INSERTS - The elements to insert.
 *
 * @example
 * ```ts
 * type T0 = _$spliceList<[1, 2, 3, 4, 5], 1, 2, [6, 7]> // [1, 6, 7, 4, 5]
 * ```
 */
export type _$spliceList<
  T extends List.List,
  START extends Number.Number,
  DEL_COUNT extends Number.Number,
  INSERTS extends List.List
> = List._$splice<START, DEL_COUNT, INSERTS, T>

interface SpliceList_T3<
  T extends List.List,
  S extends Number.Number,
  D extends Number.Number
> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], List.List>): _$spliceList<T, S, D, typeof x>
}

interface SpliceList_T2<T extends List.List, S extends Number.Number>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): SpliceList_T3<T, S, typeof x>
}

interface SpliceList_T1<T extends List.List> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): SpliceList_T2<T, typeof x>
}

/**
 * `SpliceList` is a type-level function that changes the contents of a list
 * by removing or replacing existing elements and/or adding new elements.
 *
 * This is an argument-swapped version of `List.Splice`.
 *
 * @template {unknown[]} T - The input list.
 * @template {number} START - The starting index to splice at.
 * @template {number} DEL_COUNT - The number of elements to remove.
 * @template {unknown[]} INSERTS - The elements to insert.
 *
 * @example
 * ```ts
 * type T0 = $<$<$<List.SpliceList, [1, 2, 3, 4, 5]>, 1>, 2, [6, 7]> // [1, 6, 7, 4, 5]
 * ```
 */
export interface SpliceList extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], List.List>): SpliceList_T1<typeof x>
}

/**
 * Given a list, a start index, a number of elements to delete, and a list of
 * elements to insert, and a list, splice the list at the start index.
 *
 * @param {List.List} x - The list to splice.
 * @param {number} s - The start index.
 * @param {number} d - The number of elements to delete.
 * @param {unknown[]} i - The list of elements to insert.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.spliceList([1, 2, 3, 4, 5])(1)(2)([6, 7])
 * //    ^? [1, 6, 7, 4, 5]
 * ```
 */
export const spliceList = ((x: unknown[]) =>
  (s: number) =>
  (d: number) =>
  (i: unknown[]) =>
    List.splice(s)(d)(i as never)(x as never)) as Kind._$reify<SpliceList>
