import { Kind, NaturalNumber, Type } from '..'

/**
 * `_$chunk` is a type-level function that takes in a number `N` and a list `T`,
 * and returns a list of lists, where each sublist has a length of `N`.
 *
 * Trailing elements have a shorter sublist length.
 *
 * @template N - The length of each sublist.
 * @template T - The list to chunk.
 * @returns A list of lists, where each sublist has a length of `N`.
 *
 * @example
 * For example, we can use `_$chunk` to chunk a list into sublists of length `N`:
 *
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type Result = List._$chunk<2, [1, 2, 3, 4, 5]>; // [[1, 2], [3, 4], [5]]
 * ```
 */
export type _$chunk<
  N extends number,
  T extends unknown[],
  O extends unknown[][] = [],
  IDX extends number = 1
> = 0 extends 1
  ? never
  : T extends [infer Head, ...infer Tail]
    ? IDX extends N
      ? _$chunk<N, Tail, [...O, [Head]]>
      : O extends [
            ...infer Init extends unknown[][],
            infer Last extends unknown[]
          ]
        ? _$chunk<
            N,
            Tail,
            [...Init, [...Last, Head]],
            NaturalNumber._$increment<IDX>
          >
        : _$chunk<N, Tail, [[Head]], IDX>
    : O

interface Chunk_T<N extends number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$chunk<N, typeof x>
}

/**
 * `Chunk` is a type-level function that takes in a number `N` and a list `T`,
 * and returns a list of lists, where each sublist has a length of `N`.
 *
 * Trailing elements have a shorter sublist length.
 *
 * @template N - The length of each sublist.
 * @template T - The list to chunk.
 * @returns A list of lists, where each sublist has a length of `N`.
 *
 * @example
 * For example, we can use `Chunk` to chunk a list into sublists of length `N`:
 *
 * ```ts
 * import { $, List } from "hkt-toolbelt";
 *
 * type Result = $<$<List.Chunk, 2>, [1, 2, 3, 4, 5]>; // [[1, 2], [3, 4], [5]]
 * ```
 */
export interface Chunk extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], number>): Chunk_T<typeof x>
}

/**
 * Given a number N, return a list of lists, where each list contains N elements.
 *
 * @param {number} n - The number of elements to include in each sublist.
 * @param {unknown[]} x - The list to chunk.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.chunk(2)([1, 2, 3, 4, 5])
 * //    ^? [[1, 2], [3, 4], [5]]
 * ```
 */
export const chunk = ((n: number) => (x: unknown[]) => {
  const result: unknown[][] = []

  if (n === 0) return [x]

  for (let i = 0; i < x.length; i += n) {
    result.push(x.slice(i, i + n))
  }

  return result
}) as Kind._$reify<Chunk>
