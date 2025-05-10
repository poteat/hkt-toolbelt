import { Type, Number as Number_, Kind } from '..'

// Using existing Number._$fromString utility instead of custom ToNumber type

/**
 * Given a list, return the maximum numeric value in the list.
 * String numbers like "42" are converted to their numeric equivalent.
 * If any element cannot be converted to a number, returns never.
 *
 * @param {unknown[]} x - The list to find the maximum element of.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type T0 = List._$max<[1, 2, 3]>; // 3
 * type T1 = List._$max<[]>; // never
 * type T2 = List._$max<[1, "2", 3]>; // 3
 * type T3 = List._$max<[1, "abc", 3]>; // never
 * ```
 */
export type _$max<T extends unknown[], MaxValue = never> = T extends [
  infer Head,
  ...infer Tail
]
  ? Number_._$fromString<Type._$cast<Head, Number_.Number>> extends never
    ? never // Invalid element found, return never
    : [MaxValue] extends [never]
      ? _$max<Tail, Number_._$fromString<Type._$cast<Head, Number_.Number>>>
      : Number_._$compare<
            Number_._$fromString<Type._$cast<Head, Number_.Number>>,
            Type._$cast<MaxValue, Number_.Number>
          > extends 1
        ? _$max<Tail, Number_._$fromString<Type._$cast<Head, Number_.Number>>>
        : _$max<Tail, MaxValue>
  : MaxValue

/**
 * Given a list, return the maximum numeric value in the list.
 * String numbers like "42" are converted to their numeric equivalent.
 * If any element cannot be converted to a number, returns never.
 *
 * @param {unknown[]} x - The list to find the maximum element of.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type T0 = $<List.Max, [1, 2, 3]>; // 3
 * type T1 = $<List.Max, []>; // never
 * type T2 = $<List.Max, [1, "2", 3]>; // 3
 * type T3 = $<List.Max, [1, "abc", 3]>; // never
 * ```
 */
export interface Max extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$max<typeof x>
}

/**
 * Given a list, return the maximum numeric value in the list.
 * String numbers like "42" are converted to their numeric equivalent.
 * If any element cannot be converted to a number, returns never.
 *
 * @param {unknown[]} x - The list to find the maximum element of.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const T0 = List.max([1, 2, 3]); // 3
 * const T1 = List.max([]); // never
 * const T2 = List.max([1, "2", 3]); // 3
 * const T3 = List.max([1, "abc", 3]); // never (contains non-numeric value)
 * ```
 */
export const max = ((x: unknown[]) => {
  if (x.length === 0) return Type.never

  // First check all values are validly coercible to numbers
  for (let i = 0; i < x.length; i++) {
    const num = Number(x[i])
    if (Number.isNaN(num)) {
      return Type.never
    }
  }

  // Now compute the max
  let maxVal = Number(x[0])

  for (let i = 1; i < x.length; i++) {
    const num = Number(x[i])
    if (num > maxVal) {
      maxVal = num
    }
  }

  return maxVal
}) as Kind._$reify<Max>
