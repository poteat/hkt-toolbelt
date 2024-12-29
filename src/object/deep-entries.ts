import { Type, Kind, Object as Object_ } from '..'

type _PrependKeyToEntries<K extends PropertyKey, E extends unknown[][]> = {
  [I in keyof E]: E[I] extends unknown[] ? [K, ...E[I]] : never
}

type _DeepEntriesKey<
  O extends Record<PropertyKey, unknown>,
  K extends PropertyKey
> =
  O[K] extends Record<PropertyKey, unknown>
    ? _PrependKeyToEntries<K, _$deepEntries<O[K]>>
    : [[K, O[K]]]

/**
 * Given an object, return its deep entries as a list of tuples, each of which
 * represent a path to a value in the object.
 *
 * Arrays are considered to be values, and are not traversed.
 *
 * @template O - The object to get the deep entries of.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * type T0 = Object._$deepEntries<{ name: { first: 'ada', last: 'lovelace' } }>
 * //   ^? [["name", "first", "ada"], ["name", "last", "lovelace"]]
 * ```
 */
export type _$deepEntries<
  O extends Record<PropertyKey, unknown>,
  Keys extends unknown[] = Object_._$keys<O>,
  Acc extends unknown[][] = [],
  DEEP_KEYS = _DeepEntriesKey<O, Type._$cast<Keys[0], PropertyKey>>
> = Keys extends [infer K, ...infer Rest]
  ? K extends keyof O
    ? _$deepEntries<O, Rest, [...Acc, ...Type._$cast<DEEP_KEYS, unknown[][]>]>
    : never
  : Acc

/**
 * Given an object, return its deep entries as a list of tuples, each of which
 * represent a path to a value in the object.
 *
 * Arrays are considered to be values, and are not traversed.
 *
 * @example
 * ```ts
 * import { $, Object } from "hkt-toolbelt";
 *
 * type T0 = $<Object.DeepEntries, { name: { first: 'ada', last: 'lovelace' } }>
 * //   ^? [["name", "first", "ada"], ["name", "last", "lovelace"]]
 * ```
 */
export interface DeepEntries extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$deepEntries<typeof x>
}

/**
 * Given an object, return its deep entries as a list of tuples, each of which
 * represent a path to a value in the object.
 *
 * Arrays are considered to be values, and are not traversed.
 *
 * @param {Record<PropertyKey, unknown>} x - The object to get the deep entries of.
 *
 * @example
 * ```ts
 * import { Object } from "hkt-toolbelt";
 *
 * const T0 = Object.deepEntries({ name: { first: 'ada', last: 'lovelace' } })
 * //    ^? [["name", "first", "ada"], ["name", "last", "lovelace"]]
 * ```
 */
export const deepEntries = ((
  obj: Record<PropertyKey, unknown>
): unknown[][] => {
  const results: unknown[][] = []

  for (const key in obj) {
    const value = obj[key]

    // If value is an object (non-null) and not an array, recurse
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      const nested = (deepEntries as Function)(value)
      // Prepend the current key to each nested path
      for (const entry of nested) {
        results.push([key, ...entry])
      }
    } else {
      // Arrays and other primitives are considered final values
      results.push([key, value])
    }
  }

  return results
}) as unknown as Kind._$reify<DeepEntries>
