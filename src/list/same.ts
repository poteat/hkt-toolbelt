import { Kind, Type } from '..'
import { deepEqual } from '../_internal/deepEqual'

/**
 * `_$same` is a type-level function that takes in a list of values and
 * returns a boolean indicating whether all elements in the list are equal.
 *
 * @template {unknown[]} T - The list of values to check.
 *
 * @example
 * ```ts
 * type T0 = _$same<[1, 1, 1]> // true
 * type T1 = _$same<[1, 2, 3, 4]> // false
 * ```
 */
export type _$same<T extends unknown[]> = T extends [infer Head, ...infer Tail]
  ? Tail extends []
    ? true
    : [Head, Tail[number]] extends [Tail[number], Head]
      ? _$same<Tail>
      : false
  : true

/**
 * `Same` is a type-level function that takes in a list of values and
 * returns a boolean indicating whether all elements in the list are equal.
 *
 * @template {unknown[]} T - The list of values to check.
 *
 * @example
 * ```ts
 * type T0 = $<List.Same, [1, 1, 1]> // true
 * type T1 = $<List.Same, [1, 2, 3, 4]> // false
 * ```
 */
export interface Same extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$same<typeof x>
}

/**
 * Given a list of values, return a boolean indicating whether all elements
 * in the list are equal.
 *
 * @param {unknown[]} x - The list of values to check.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.same([1, 1, 1])
 * //    ^? true
 * ```
 */
export const same = ((x: unknown[]) => {
  let result = true
  let first = x[0]

  for (let i = 0; i < x.length; i++) {
    if (!deepEqual(x[i], first)) {
      result = false
      break
    }
  }

  return result
}) as Kind._$reify<Same>
