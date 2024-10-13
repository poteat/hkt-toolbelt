import { Kind, Type, List } from '..'

type _$removeSequence2<X extends unknown[], T extends unknown[]> =
  List._$indexOfSequence<X, T> extends -1
    ? T
    : _$removeSequence2<
        X,
        List._$splice<List._$indexOfSequence<X, T>, X['length'], [], T>
      >

/**
 * `_$removeSequence` is a type-level function that takes in a list `X` and a
 * list `T`, and returns a new list with all instances of the sequence `X`
 * removed.
 *
 * @template {unknown[]} X - The list to remove.
 * @template {unknown[]} T - The list to remove from.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type T0 = List._$removeSequence<[1, 2, 3], [1, 2, 3, 4, 5]> // [4, 5]
 * ```
 */
export type _$removeSequence<
  X extends unknown[],
  T extends unknown[]
> = X extends [] ? T : _$removeSequence2<X, T>

interface RemoveSequence_T<X extends unknown[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$removeSequence<X, typeof x>
}

/**
 * `RemoveSequence` is a type-level function that takes in a list `X` and a
 * list `T`, and returns a new list with all instances of `X` removed.
 *
 * @template {unknown[]} X - The list to remove.
 * @template {unknown[]} T - The list to remove from.
 *
 * @example
 * ```ts
 * type T0 = $<$<$<List.RemoveSequence, [1, 2, 3]>, [1, 2, 3, 4, 5]> // [4, 5]
 * ```
 */
export interface RemoveSequence extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): RemoveSequence_T<typeof x>
}

/**
 * Given a list and a value, remove the first element in the list that is
 * equal to the value.
 *
 * @param {unknown[]} x - The list to remove.
 * @param {unknown[]} values - The list to remove from.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.removeSequence([1, 2, 3])([1, 2, 3, 4, 5])
 * //    ^? [4, 5]
 * ```
 */
export const removeSequence = ((x: unknown[]) => (values: unknown[]) =>
  List.replaceSequence(x as never)([] as never)(
    values as never
  )) as unknown as Kind._$reify<RemoveSequence>
