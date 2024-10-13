import { Kind, Type, Conditional } from '..'

/**
 * `_$startsWith` is a type-level function that takes in a list `X` and a list
 * `T`, and returns a boolean indicating whether `T` starts with `X`.
 *
 * @template X - The value to check.
 * @template T - The list to check.
 *
 * @returns A boolean indicating whether `T` starts with `X`.
 *
 * @example
 * For example, we can use `_$startsWith` to check if a list starts with a value:
 *
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type Result = List._$startsWith<[1, 2, 3], [1, 2, 3, 4, 5]>; // true
 * ```
 */
export type _$startsWith<X extends unknown[], T extends unknown[]> = X extends [
  infer HeadX,
  ...infer TailX
]
  ? T extends [infer HeadT, ...infer TailT]
    ? Conditional._$equals<HeadX, HeadT> extends true
      ? _$startsWith<TailX, TailT>
      : false
    : false
  : true

interface StartsWith_T<X extends unknown[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$startsWith<X, typeof x>
}

/**
 * `StartsWith` is a type-level function that takes in a list `X` and a list
 * `T`, and returns a boolean indicating whether `T` starts with `X`.
 *
 * @template X - The value to check.
 * @template T - The list to check.
 *
 * @returns A boolean indicating whether `T` starts with `X`.
 *
 * @example
 * For example, we can use `StartsWith` to check if a list starts with a value:
 *
 * ```ts
 * import { $, List } from "hkt-toolbelt";
 *
 * type Result = $<$<List.StartsWith, [1, 2, 3]>, [1, 2, 3, 4, 5]>; // true
 * ```
 */
export interface StartsWith extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): StartsWith_T<typeof x>
}

/**
 * Given a list and a value, return a boolean indicating whether the list
 * starts with the value.
 *
 * @param {unknown[]} x - The value to check.
 * @param {unknown[]} values - The list to check.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.startsWith([1, 2, 3])([1, 2, 3, 4, 5])
 * //    ^? true
 * ```
 */
export const startsWith = ((x: unknown[]) => (values: unknown[]) => {
  if (x.length === 0) return true

  for (let i = 0; i < x.length; i++) {
    if (x[i] !== values[i]) return false
  }

  return true
}) as Kind._$reify<StartsWith>
