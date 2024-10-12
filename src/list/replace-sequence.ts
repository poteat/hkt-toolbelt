import { Kind, Type, List } from '..'

/**
 * `_$replaceSequence` is a type-level function that takes in a list `X`, a list
 * `Y`, and a list `T`, and returns a new list with all instances of the
 * sequence `X` replaced with the sequence `Y`.
 *
 * @template {unknown[]} X - The list to replace.
 * @template {unknown[]} Y - The list to replace `X` with.
 * @template {unknown[]} T - The list to replace in.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type T0 = List._$replaceSequence<[1, 2, 3], [4, 5], [1, 2, 3, 4, 5]> // [4, 5, 4, 5]
 * ```
 */
export type _$replaceSequence<
  X extends unknown[],
  Y extends unknown[],
  T extends unknown[]
> =
  List._$indexOfSequence<X, T> extends -1
    ? T
    : List._$splice<List._$indexOfSequence<X, T>, X['length'], Y, T>

interface ReplaceSequence_T2<X extends unknown[], Y extends unknown[]>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$replaceSequence<X, Y, typeof x>
}

interface ReplaceSequence_T1<X extends unknown[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): ReplaceSequence_T2<X, typeof x>
}

/**
 * `ReplaceSequence` is a type-level function that takes in a list `X` and a
 * list `T`, and returns a new list with all instances of `X` replaced with `T`.
 *
 * @template {unknown[]} X - The list to replace.
 * @template {unknown[]} T - The list to replace in.
 *
 * @example
 * ```ts
 * type T0 = $<$<$<List.ReplaceSequence, [1, 2, 3]>, [4, 5]>, [1, 2, 3, 4, 5]> // [4, 5, 4, 5]
 * ```
 */
export interface ReplaceSequence extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): ReplaceSequence_T1<typeof x>
}

/**
 * Given a list and a value, replace the first element in the list that is
 * equal to the value.
 *
 * @param {unknown[]} x - The list to replace.
 * @param {unknown[]} values - The list to replace in.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.replaceSequence([1, 2, 3])([4, 5])([1, 2, 3, 4, 5])
 * //    ^? [4, 5, 4, 5]
 * ```
 */
export const replaceSequence = ((x: unknown[]) =>
  (y: unknown[]) =>
  (values: unknown[]) => {
    const subsequenceIndex: number = List.indexOfSequence(x as never)(
      values as never
    )

    if (subsequenceIndex === -1) return values

    return List.splice(subsequenceIndex)(x.length)(y as never)(values as never)
  }) as unknown as Kind._$reify<ReplaceSequence>
