import { values } from 'lodash'
import { Kind, Type } from '..'

/**
 * `PushValue` is a type-level function that takes in a tuple `T` and a value
 * `U`, and returns a new tuple with `U` appended to the end of `T`.
 *
 * This is the swapped argument order of the `List.Push` function.
 *
 * @template T - The tuple to push the value to.
 * @template U - The value to push.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.PushValue, [1, 2, 3]>, 4> // [1, 2, 3, 4]
 * ```
 */
export type _$pushValue<T extends unknown[], U> = [...T, U]

interface PushValue_T<T extends unknown[]> extends Kind.Kind {
  f(x: this[Kind._]): _$pushValue<T, typeof x>
}

/**
 * `PushValue` is a type-level function that takes in a tuple `T` and a value
 * `U`, and returns a new tuple with `U` appended to the end of `T`.
 *
 * This is the swapped argument order of the `List.Push` function.
 *
 * @template T - The tuple to push the value to.
 * @template U - The value to push.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.PushValue, [1, 2, 3]>, 4> // [1, 2, 3, 4]
 * ```
 */
export interface PushValue extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): PushValue_T<typeof x>
}

/**
 * Given a list and a value, push the value onto the end of the list.
 *
 * @param {unknown[]} values - The list to push the value onto.
 * @param {unknown} x - The value to push onto the list.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.pushValue([1, 2, 3])(4)
 * //    ^? [1, 2, 3, 4]
 * ```
 */
export const pushValue = ((values: unknown[]) => (x: unknown) => [
  ...values,
  x
]) as Kind._$reify<PushValue>
