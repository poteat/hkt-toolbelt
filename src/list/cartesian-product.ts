import { Kind, Type } from '..'

type _WrapToArray<X> = X extends unknown[] ? X : [X]

/**
 * Appends every element of Elems to the tuple Head, producing a new list of tuples.
 * For example, if Head = [a] and Elems = [c,d], _AppendAll<Head, Elems> = [[a,c],[a,d]].
 */
type _AppendAll<
  H extends unknown[],
  Elems extends unknown[],
  Acc extends unknown[][] = []
> = Elems extends [infer E, ...infer Rest]
  ? _AppendAll<H, Rest, [...Acc, [...H, E]]>
  : Acc

/**
 * Expands the result R by the elements in Elems.
 * For each tuple in R, we append all elements of Elems, maintaining order.
 *
 * If R = [[a],[b]] and Elems = [c,d],
 * we first process [a] -> [[a,c],[a,d]]
 * then process [b] -> [[b,c],[b,d]]
 *
 * Final result = [[a,c],[a,d],[b,c],[b,d]]
 */
type _CartesianProductExpand<
  R extends unknown[][],
  Elems extends unknown[],
  Acc extends unknown[][] = []
> = R extends [infer Head extends unknown[], ...infer Tail extends unknown[][]]
  ? _CartesianProductExpand<Tail, Elems, [...Acc, ..._AppendAll<Head, Elems>]>
  : Acc

/**
 * Performs a tail-recursive Cartesian product on T.
 * Start with R = [[]]. For each element in T, wrap it into a tuple if needed,
 * and expand R by the elements of this tuple.
 */
type _CartesianProduct<
  T extends unknown[],
  R extends unknown[][] = [[]]
> = T extends [infer Head, ...infer Tail]
  ? _CartesianProduct<Tail, _CartesianProductExpand<R, _WrapToArray<Head>>>
  : R

/**
 * `_$cartesianProduct` takes a tuple T of values (or tuples) and returns their Cartesian product.
 *
 * @example
 * ```ts
 * import { $, List } from 'hkt-toolbelt'
 *
 * type Result = $<List.CartesianProduct, ["foo", ["bar","qux"]]>
 * //   ^? [["foo","bar"],["foo","qux"]]
 *
 * type Result2 = $<List.CartesianProduct, [["a","b"],["c","d"]]>
 * //   ^? [["a","c"],["a","d"],["b","c"],["b","d"]]
 * ```
 */
export type _$cartesianProduct<T extends unknown[]> = _CartesianProduct<T>

/**
 * `CartesianProduct` is a 1-ary kind that takes a tuple T and returns its
 * Cartesian product. The Cartesian product is a list of all possible combinations
 * of elements from the input tuple.
 *
 * @example
 * ```ts
 * import { $, List } from 'hkt-toolbelt'
 *
 * type Result = $<List.CartesianProduct, ["foo", ["bar","qux"]]>
 * //   ^? [["foo","bar"],["foo","qux"]]
 *
 * type Result2 = $<List.CartesianProduct, [["a","b"],["c","d"]]>
 * //   ^? [["a","c"],["a","d"],["b","c"],["b","d"]]
 * ```
 */
export interface CartesianProduct extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$cartesianProduct<typeof x>
}

/**
 * Given a list of values or lists, return a Cartesian product of all possible
 * combinations.
 *
 * @param xs - The list of values or lists to generate the Cartesian product from.
 * @returns A list of all possible combinations of the input values or lists.
 *
 * @example
 * ```ts
 * import { $, List } from 'hkt-toolbelt'
 *
 * const result = List.cartesianProduct([[1, 2], [3, 4]])
 * //   ^? [[1, 3], [1, 4], [2, 3], [2, 4]]
 * ```
 */
export const cartesianProduct = ((xs: unknown[]) => {
  let result: unknown[][] = [[]]

  for (const x of xs) {
    const arr = Array.isArray(x) ? x : [x]
    const newResult: unknown[][] = []
    for (const prefix of result) {
      for (const element of arr) {
        newResult.push([...prefix, element])
      }
    }
    result = newResult
  }

  return result
}) as Kind._$reify<CartesianProduct>
