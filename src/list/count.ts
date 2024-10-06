import { NaturalNumber, Object, List, Kind, Type } from '..'

type _$count2<
  T extends unknown[],
  O extends Record<string | number | symbol, number> = {}
> = T extends [infer Head, ...infer Tail]
  ? _$count2<
      Tail,
      Head extends PropertyKey
        ? Object._$assign<
            Head,
            Head extends keyof O ? NaturalNumber._$increment<O[Head]> : 1,
            O
          >
        : never
    >
  : O

/**
 * `_$count` is a type-level function that takes in a list of property keys and
 * returns a map from each key to the number of times it appears in the list.
 *
 * Similar to `List._$countBy`, but uses the identity function as the counting
 * function.
 *
 * @template {PropertyKey[]} K - The list of property keys to count.
 *
 * @example
 * ```ts
 * type T0 = _$count<['foo', 'foo', 'bar']> // { foo: 2, bar: 1 }
 * ```
 */
export type _$count<K extends PropertyKey[]> =
  List._$isVariadic<K> extends true
    ? Record<K[number], number>
    : Type._$display<_$count2<K>>

/**
 * `Count` is a type-level function that takes in a list of property keys and
 * returns a map from each key to the number of times it appears in the list.
 *
 * Similar to `List.CountBy`, but uses the identity function as the counting
 * function.
 *
 * @template {PropertyKey[]} K - The list of property keys to count.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.Count, ['foo', 'foo', 'bar']> // { foo: 2, bar: 1 }
 * ```
 */
export interface Count extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], PropertyKey[]>): _$count<typeof x>
}

/**
 * Given a list of property keys, return a map from each key to the number of
 * times it appears in the list.
 *
 * Similar to `List.CountBy`, but uses the identity function as the counting
 * function.
 *
 * @param {PropertyKey[]} k - The list of property keys to count.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.count(['foo', 'foo', 'bar'])
 * //    ^? { foo: 2, bar: 1 }
 * ```
 */
export const count = ((k: PropertyKey[]) => {
  const result = {} as Record<PropertyKey, number>

  for (const key of k) {
    if (
      typeof key !== 'string' &&
      typeof key !== 'number' &&
      typeof key !== 'symbol'
    ) {
      return Type.never
    }

    result[key] = key in result ? result[key] + 1 : 1
  }

  return result
}) as Kind._$reify<Count>
