import { Kind, List, Type } from '..'

/**
 * `_$duplicates` is a type-level function that takes in a list `T` and returns
 * a list of the duplicate elements in `T`, i.e. those elements that appear
 * more than once in `T`.
 *
 * Elements are ordered in the same order as the input list. Only the first
 * occurrence of each element is included in the output list.
 *
 * @template T - The list to check.
 *
 * @example
 * For example, we can use `_$duplicates` to find the duplicates in a list:
 *
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type Result = List._$duplicates<[1, 2, 3, 4, 5, 1]>; // [1]
 * ```
 */
export type _$duplicates<
  T extends unknown[],
  O extends unknown[] = []
> = 0 extends 1
  ? never
  : T extends [infer Head, ...infer Tail]
    ? List._$includes<Head, Tail> extends true
      ? List._$includes<Head, O> extends true
        ? _$duplicates<Tail, O>
        : _$duplicates<Tail, [...O, Head]>
      : _$duplicates<Tail, O>
    : O

/**
 * `Duplicates` is a type-level function that takes in a list `T` and returns
 * a list of the duplicate elements in `T`, i.e. those elements that appear
 * more than once in `T`.
 *
 * Elements are ordered in the same order as the input list. Only the first
 * occurrence of each element is included in the output list.
 *
 * @template T - The list to check.
 *
 * @example
 * For example, we can use `Duplicates` to find the duplicates in a list:
 *
 * ```ts
 * import { $, List } from "hkt-toolbelt";
 *
 * type Result = $<$<List.Duplicates, [1, 2, 3, 4, 5, 1]>>; // [1]
 * ```
 */
export interface Duplicates extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$duplicates<typeof x>
}

/**
 * Given a list, return a new list containing only the duplicate elements.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.duplicates([1, 2, 3, 4, 5, 1]) // [1]
 * ```
 */
export const duplicates = ((x: unknown[]) => {
  const seen = new Set<unknown>()
  const duplicates: unknown[] = []

  for (const element of x) {
    if (seen.has(element)) {
      duplicates.push(element)
    }
    seen.add(element)
  }

  return duplicates
}) as Kind._$reify<Duplicates>
