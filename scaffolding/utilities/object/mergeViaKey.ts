import { keyBy } from 'lodash'

/**
 * Merge two arrays of objects via a key. Only elements which exist in both
 * arrays are merged.
 */
export function mergeViaKey<
  T extends Record<string, unknown> & {
    [key in K]: string
  },
  U extends Record<string, unknown> & {
    [key in K]: string
  },
  K extends string
>(
  array1: T[],
  array2: U[],
  key: K
): {
  [key in keyof (T & U)]: (T & U)[key]
}[] {
  const array2Map = keyBy(array2, key)

  return array1
    .filter((obj1) => obj1[key] in array2Map)
    .map((obj1) => ({
      ...obj1,
      ...array2Map[obj1[key]]
    }))
}
