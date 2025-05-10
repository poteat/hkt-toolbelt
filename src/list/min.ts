import { Type, Number as Number_, Kind } from '..'

// Using existing Number._$fromString utility instead of custom ToNumber type

/**
 * Given a list, return the minimum numeric value in the list.
 * String numbers like "42" are converted to their numeric equivalent.
 * If any element cannot be converted to a number, returns never.
 *
 * @param {unknown[]} x - The list to find the minimum element of.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type T0 = List._$min<[1, 2, 3]>; // 1
 * type T1 = List._$min<[]>; // never
 * type T2 = List._$min<[1, "2", 3]>; // 1
 * type T3 = List._$min<[1, "abc", 3]>; // never
 * ```
 */
export type _$min<T extends unknown[], MinValue = never> =
  T extends [infer Head, ...infer Tail]
    ? Number_._$fromString<Type._$cast<Head, Number_.Number>> extends never
      ? never // Invalid element found, return never
      : [MinValue] extends [never]
        ? _$min<Tail, Number_._$fromString<Type._$cast<Head, Number_.Number>>>
        : Number_._$compare<
            Number_._$fromString<Type._$cast<Head, Number_.Number>>,
            Type._$cast<MinValue, Number_.Number>
          > extends -1
          ? _$min<Tail, Number_._$fromString<Type._$cast<Head, Number_.Number>>>
          : _$min<Tail, MinValue>
    : MinValue

/**
 * Given a list, return the minimum numeric value in the list.
 * String numbers like "42" are converted to their numeric equivalent.
 * If any element cannot be converted to a number, returns never.
 *
 * @param {unknown[]} x - The list to find the minimum element of.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type T0 = $<List.Min, [1, 2, 3]>; // 1
 * type T1 = $<List.Min, []>; // never
 * type T2 = $<List.Min, [1, "2", 3]>; // 1
 * type T3 = $<List.Min, [1, "abc", 3]>; // never
 * ```
 */
export interface Min extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$min<typeof x>
}

/**
 * Given a list, return the minimum numeric value in the list.
 * String numbers like "42" are converted to their numeric equivalent.
 * If any element cannot be converted to a number, returns never.
 *
 * @param {unknown[]} x - The list to find the minimum element of.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const T0 = List.min([1, 2, 3]); // 1
 * const T1 = List.min([]); // never
 * const T2 = List.min([1, "2", 3]); // 1
 * const T3 = List.min([1, "abc", 3]); // never (contains non-numeric value)
 * ```
 */
export const min = ((x: unknown[]) => {
  if (x.length === 0) return Type.never

  // First check all values are validly coercible to numbers
  for (let i = 0; i < x.length; i++) {
    const num = Number(x[i])
    if (Number.isNaN(num)) {
      return Type.never
    }
  }

  // Now compute the min
  let minVal = Number(x[0])

  for (let i = 1; i < x.length; i++) {
    const num = Number(x[i])
    if (num < minVal) {
      minVal = num
    }
  }

  return minVal
}) as Kind._$reify<Min>
