import { Type, Number as Number_, Kind } from '..'

/**
 * Given a list, return the minimum element in the list. Only numbers can be
 * compared.
 *
 * @param {unknown[]} x - The list to find the minimum element of.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type T0 = List._$min<[1, 2, 3]>; // 1
 * type T1 = List._$min<[]>; // never
 * ```
 */
export type _$min<T extends unknown[], MinValue = never> = T extends [
  infer Head,
  ...infer Tail
]
  ? [MinValue] extends [never]
    ? _$min<Tail, Head>
    : Number_._$compare<
          Type._$cast<Head, Number_.Number>,
          Type._$cast<MinValue, Number_.Number>
        > extends -1
      ? _$min<Tail, Head>
      : _$min<Tail, MinValue>
  : MinValue

/**
 * Given a list, return the minimum element in the list. Only numbers can be
 * compared.
 *
 * @param {unknown[]} x - The list to find the minimum element of.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type T0 = $<List.Min, [1, 2, 3]>; // 1
 * type T1 = $<List.Min, []>; // never
 * ```
 */
export interface Min extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$min<typeof x>
}

/**
 * Given a list, return the minimum element in the list. Only numbers can be
 * compared.
 *
 * @param {unknown[]} x - The list to find the minimum element of.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const T0 = List.min([1, 2, 3]); // 1
 * const T1 = List.min([]); // never
 * ```
 */
export const min = ((x: unknown[]) => {
  let result = x[0]

  for (const value of x) {
    if (Number(value) < Number(result)) {
      result = value
    }
  }

  return result
}) as Kind._$reify<Min>
