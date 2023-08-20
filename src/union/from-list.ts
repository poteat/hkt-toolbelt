import { $, Kind, Type, List } from '..'

/**
 * `Union._$fromList` is a type-level function that converts a list to a union.
 *
 * @template T - The list to convert to a union.
 *
 * @example
 * type T0 = Union._$fromList<[1, 2, 3]> // 1 | 2 | 3
 * type T1 = Union._$fromList<[]> // never
 */
export type _$fromList<
  T extends List.List,
  FIRST = $<List.First, T>,
  REST extends List.List = $<List.Shift, T>,
  RESULT = T extends [] ? never : FIRST | _$fromList<REST>
> = RESULT

/**
 * `Union.FromList` is a type-level function that converts a list to a union.
 *
 * @template T - The list to convert to a union.
 *
 * @example
 * type T0 = $<Union.FromList, [1, 2, 3]> // 1 | 2 | 3
 * type T1 = $<Union.FromList, []> // never
 */
export interface FromList extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], List.List>): _$fromList<typeof x>
}
