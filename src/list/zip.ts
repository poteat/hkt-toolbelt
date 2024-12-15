import { $, Kind, List, Number, NaturalNumber } from '..'

/**
 * `_$zip` is a type-level function that takes in an array of arrays `T`,
 * and performs parallel iteration over the elements of `T`
 * to return an array of arrays, where the i-th array contains the i-th element from each of the elements of `T`.
 *
 * The zip operation stops when the shortest sub-array is exhausted.
 * Any remaining items in the longer sub-array are ignored, cutting off the result to the length of the shortest sub-array.
 *
 * @template T - An array of types.
 * @returns A nested list of types.
 *
 * @example
 * For example, we can use `_$zip` to perform parallel iteration.
 * In this example, `[[1, 2, 3], ["a", "b", "c"]]` is passed as a type argument to the
 * type-level function:
 *
 * type Result = List._$zip<[[1, 2, 3], ["a", "b", "c"]]> // [[1, "a"], [2, "b"], [3, "c"]]
 *
 * @example
 * When an array containing multiple sub-arrays of different lengths are passed into `_$zip`,
 * the length of the returned result will be equal to the shortest sub-array length found in the input array.
 * In this example, `[[1, 2], ["a", "b", "c"], ["A", "B"]]` is passed as a type argument to the
 * type-level function:
 *
 * type Result = List._$zip<[[1, 2], ["a", "b", "c"], ["A", "B"]]> // [[1, "a", "A"], [2, "b", "B"]]
 */
export type _$zip<
  T extends List.List,
  IDX extends Number.Number = 0,
  ACC extends List.List = [],
  LENGTHS extends Number.Number[] = List._$map<List.Length, T>,
  MIN_LENGTH extends Number.Number = List._$reduce<
    Number.Min,
    LENGTHS,
    Number.MAX_SAFE_INTEGER
  >,
  CURR = List._$map<$<List.At, IDX>, T>,
  RESULT extends List.List = MIN_LENGTH extends Number.MAX_SAFE_INTEGER
    ? []
    : IDX extends MIN_LENGTH
      ? ACC
      : _$zip<T, NaturalNumber._$increment<IDX>, List._$push<CURR, ACC>>
> = RESULT

/**
 * `Zip` is a type-level function that takes in one array of arrays, `T`,
 * and returns an array of arrays, where the i-th array contains the i-th element from each of the elements of `T`.
 *
 * The zip operation stops when the shortest sub-array is exhausted.
 * Any remaining items in the longer sub-array are ignored, cutting off the result to the length of the shortest sub-array.
 *
 * @template T - An array of arrays.
 * @returns A nested list of types.
 *
 * @example
 * For example, we can use `Zip` to perform parallel iteration over multiple sub-arrays.
 * In this example, `Zip` is a type-level function that returns an array of arrays.
 *
 * type Result = $<List.Zip, [[1, 2], ["a", "b", "c"], ["A", "B"]]>; // [[1, "a", "A"], [2, "b", "B"]]
 */
export interface Zip extends Kind.Kind {
  f(x: this[Kind._]): typeof x extends List.List ? _$zip<typeof x> : never
}

/**
 * Given a list of lists, return the transpose, or zip, of the list, whereby
 * each element in index `i` of the result is the `i`th element of each list.
 *
 * @param {unknown[]} x - The list of lists to transpose.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.zip([[1, 2], ["a", "b", "c"]])
 * //    ^? [[1, "a"], [2, "b"]]
 */
export const zip = ((x: unknown[][]) => {
  const minLength = Math.min(...x.map((arr) => arr.length))
  const result = []
  for (let i = 0; i < minLength; i++) {
    const zipped = x.map((arr) => arr[i])
    result.push(zipped)
  }
  return result
}) as Kind._$reify<Zip>
