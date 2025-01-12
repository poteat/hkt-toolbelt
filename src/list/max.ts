import { Type, Number as Number_, Kind } from '..'

/**
 * Given a list, return the maximum element in the list. Only numbers can be
 * compared.
 *
 * @param {unknown[]} x - The list to find the maximum element of.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type T0 = List._$max<[1, 2, 3]>; // 3
 * type T1 = List._$max<[]>; // never
 * ```
 */
export type _$max<T extends unknown[], MaxValue = never> = T extends [
  infer Head,
  ...infer Tail
]
  ? [MaxValue] extends [never]
    ? _$max<Tail, Head>
    : Number_._$compare<
          Type._$cast<Head, Number_.Number>,
          Type._$cast<MaxValue, Number_.Number>
        > extends 1
      ? _$max<Tail, Head>
      : _$max<Tail, MaxValue>
  : MaxValue

/**
 * Given a list, return the maximum element in the list. Only numbers can be
 * compared.
 *
 * @param {unknown[]} x - The list to find the maximum element of.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type T0 = $<List.Max, [1, 2, 3]>; // 3
 * type T1 = $<List.Max, []>; // never
 * ```
 */
export interface Max extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$max<typeof x>
}

/**
 * Given a list, return the maximum element in the list. Only numbers can be
 * compared.
 *
 * @param {unknown[]} x - The list to find the maximum element of.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const T0 = List.max([1, 2, 3]); // 3
 * const T1 = List.max([]); // never
 * ```
 */
export const max = ((x: unknown[]) => {
  let result = x[0]

  for (const value of x) {
    const num = Number(value)

    if (num > Number(result)) {
      result = value
    }
  }

  return result
}) as Kind._$reify<Max>
