import { Kind, Type, Conditional } from '..'

/**
 * `_$endsWith` is a type-level function that takes in a list `X` and a list
 * `T`, and returns a boolean indicating whether `T` ends with `X`.
 *
 * @template X - The value to check.
 * @template T - The list to check.
 *
 * @returns A boolean indicating whether `T` ends with `X`.
 *
 * @example
 * For example, we can use `_$endsWith` to check if a list ends with a value:
 *
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type Result = List._$endsWith<[3, 4, 5], [1, 2, 3, 4, 5]>; // true
 * ```
 */
export type _$endsWith<X extends unknown[], T extends unknown[]> = X extends [
  ...infer TailX,
  infer HeadX
]
  ? T extends [...infer TailT, infer HeadT]
    ? Conditional._$equals<HeadX, HeadT> extends true
      ? _$endsWith<TailX, TailT>
      : false
    : false
  : true

interface EndsWith_T<X extends unknown[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$endsWith<X, typeof x>
}

/**
 * `EndsWith` is a type-level function that takes in a list `X` and a list
 * `T`, and returns a boolean indicating whether `T` ends with `X`.
 *
 * @template X - The value to check.
 * @template T - The list to check.
 *
 * @returns A boolean indicating whether `T` ends with `X`.
 *
 * @example
 * For example, we can use `EndsWith` to check if a list ends with a value:
 *
 * ```ts
 * import { $, List } from "hkt-toolbelt";
 *
 * type Result = $<$<List.EndsWith, [3, 4, 5]>, [1, 2, 3, 4, 5]>; // true
 * ```
 */
export interface EndsWith extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): EndsWith_T<typeof x>
}

/**
 * Given a list and a value, return a boolean indicating whether the list
 * ends with the value.
 *
 * @param {unknown[]} x - The value to check.
 * @param {unknown[]} values - The list to check.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.endsWith([3, 4, 5])([1, 2, 3, 4, 5])
 * //    ^? true
 * ```
 */
export const endsWith = (x: unknown[]) => (values: unknown[]) => {
  if (x.length === 0) return true

  for (let i = 0; i < x.length; i++) {
    if (x[i] !== values[values.length - x.length + i]) return false
  }

  return true
}
