import { Kind, Type, Conditional } from '..'
import { deepEqual } from '../_internal/deepEqual'

/**
 * `_$replace` is a type-level function that takes in a list `X` and a list
 * `T`, and returns a new list with all instances of `X` replaced with `T`.
 *
 * @template X - The value to replace.
 * @template Y - The value to replace `X`with.
 * @template T - The list to replace in.
 *
 * @returns A new list with all instances of `X` replaced with `Y`.
 *
 * @example
 * For example, we can use `_$replace` to replace a value in a list:
 *
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type Result = List._$replace<1, 2, [1, 1, 2, 3, 4]>; // [2, 2, 2, 3, 4]
 * ```
 */
export type _$replace<
  X extends unknown,
  Y extends unknown,
  T extends unknown[],
  O extends unknown[] = []
> = T extends [infer Head, ...infer Tail]
  ? _$replace<
      X,
      Y,
      Tail,
      [...O, Conditional._$equals<Head, X> extends true ? Y : Head]
    >
  : O

interface Replace_T2<X, Y> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$replace<X, Y, typeof x>
}

interface Replace_T1<X> extends Kind.Kind {
  f(x: this[Kind._]): Replace_T2<X, typeof x>
}

/**
 * `Replace` is a type-level function that takes in a list `X` and a list
 * `T`, and returns a new list with all instances of `X` replaced with `T`.
 *
 * @template X - The value to replace.
 * @template Y - The value to replace `X`with.
 * @template T - The list to replace in.
 *
 * @returns A new list with all instances of `X` replaced with `Y`.
 *
 * @example
 * For example, we can use `Replace` to replace a value in a list:
 *
 * ```ts
 * import { $, List } from "hkt-toolbelt";
 *
 * type Result = $<$<$<List.Replace, 1>, 2>, [1, 1, 2, 3, 4]>; // [2, 2, 2, 3, 4]
 * ```
 */
export interface Replace extends Kind.Kind {
  f(x: this[Kind._]): Replace_T1<typeof x>
}

/**
 * Given a value X, a value Y, and a list, return a new list with all instances
 * of X replaced with Y.
 *
 * @param {unknown} x - The value to replace.
 * @param {unknown} y - The value to replace X with.
 * @param {unknown[]} values - The list to replace in.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.replace(1)(2)([1, 1, 2, 3, 4])
 * //    ^? [2, 2, 2, 3, 4]
 * ```
 */
export const replace = ((x: unknown) => (y: unknown) => (values: unknown[]) => {
  const result: unknown[] = []

  for (const value of values) {
    if (deepEqual(value, x)) {
      result.push(y)
    } else {
      result.push(value)
    }
  }

  return result
}) as Kind._$reify<Replace>
