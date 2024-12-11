import { $, Kind, List, Type } from '..'
import { hash } from '../_internal/hash'

/**
 * `_uniqueBy2` is a helper type-level function that recursively constructs
 * a new list of unique elements based on a mapping kind `F`.
 *
 * @template F - A 1-ary mapping kind.
 * @template T - The input list.
 * @template Result - The list of unique elements so far.
 * @template ResultKeys - The list of mapped keys so far.
 */
type _$uniqueBy2<
  F extends Kind.Kind,
  T extends unknown[],
  Result extends unknown[] = [],
  ResultKeys extends unknown[] = []
> = T extends [infer Head, ...infer Tail]
  ? $<F, Type._$cast<Head, Kind._$inputOf<F>>> extends infer KeyOfHead
    ? List._$includes<KeyOfHead, ResultKeys> extends true
      ? _$uniqueBy2<F, Tail, Result, ResultKeys>
      : _$uniqueBy2<F, Tail, [...Result, Head], [...ResultKeys, KeyOfHead]>
    : never
  : Result

/**
 * `_$uniqueBy` applies the mapping kind `F` to each element of `T` to
 * determine uniqueness. It returns a new list with duplicates (as determined by
 * identical mapped keys) removed.
 *
 * @template F - A 1-ary mapping kind that maps elements to keys for uniqueness checking.
 * @template T - The input list.
 *
 * @example
 * ```ts
 * import { $, List, String } from 'hkt-toolbelt'
 *
 * // Use String.Length as the mapping kind:
 * type Result = $<$<List.UniqueBy, String.Length>, ['a', 'bb', 'c', 'ddd']>
 * // 'a' maps to 1, 'bb' maps to 2, 'c' also maps to 1, 'ddd' maps to 3
 * // Keys: [1,2,1,3] - the second '1' indicates a duplicate key, so 'c' is removed.
 * // Result: ['a', 'bb', 'ddd']
 * ```
 */
export type _$uniqueBy<F extends Kind.Kind, T extends unknown[]> = [
  List._$isVariadic<T>
] extends [true]
  ? T
  : _$uniqueBy2<F, T>

/**
 * `UniqueBy_T` is the intermediate type for partial application.
 * Applying `UniqueBy` with a mapping kind `F` returns a kind waiting for a list.
 */
interface UniqueBy_T<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$uniqueBy<F, typeof x>
}

/**
 * `UniqueBy` is a 2-ary kind that takes a 1-ary mapping kind `F`
 * and returns another kind expecting a list `T`.
 *
 * This allows partial application: `$<List.UniqueBy, F>` returns a kind that can be applied to `T`.
 */
export interface UniqueBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): UniqueBy_T<typeof x>
}

/**
 * Runtime implementation of `uniqueBy`.
 * It takes a mapping function `f` at runtime, and returns a function that, when given a list,
 * returns a new list with duplicates removed based on the mapped keys.
 *
 * @param f - A 1-ary function that maps elements to keys for uniqueness.
 * @param x - The input list.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const byLength = (x: string) => x.length
 * const result = List.uniqueBy(byLength)(['a', 'bb', 'c', 'ddd'])
 * // byLength: ['a' -> 1, 'bb' -> 2, 'c' -> 1, 'ddd' -> 3]
 * // Keys: [1,2,1,3], remove duplicates of keys, result: ['a', 'bb', 'ddd']
 * ```
 */
export const uniqueBy = ((f: (x: unknown) => unknown) => (x: unknown[]) => {
  const seenKeys = new Set<string>()
  const result: unknown[] = []

  for (const element of x) {
    const key = f(element)
    const h = hash(key) // hash is used for stable stringification and uniqueness checking
    if (!seenKeys.has(h)) {
      seenKeys.add(h)
      result.push(element)
    }
  }

  return result
}) as Kind._$reify<UniqueBy>
