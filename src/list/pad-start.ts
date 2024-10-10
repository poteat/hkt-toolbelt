import { Kind, Type, List, NaturalNumber, Number, DigitList } from '..'

type _$padStart2<
  N extends DigitList.DigitList,
  V,
  T extends unknown[],
  DEC extends DigitList.DigitList = DigitList._$decrement<N>
> = 0 extends 1 ? never : N extends ['0'] ? T : _$padStart2<DEC, V, [V, ...T]>

/**
 * `_$padStart` is a type-level function that takes in a desired length `N`,
 * a padding value `V`, and a list `T`, and returns a new list with the list
 * padded to the desired length with the padding value.
 *
 * If the list is already longer than the desired length, it is returned
 * unchanged.
 *
 * @template {number} N - The desired length of the list.
 * @template {unknown} V - The padding value.
 * @template {unknown[]} T - The list to pad.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type Result = List._$padStart<8, 0, [1, 2, 3]>; // [0, 0, 0, 1, 2, 3]
 * ```
 */
export type _$padStart<
  N extends Number.Number,
  V,
  T extends unknown[],
  N_LIST extends DigitList.DigitList = NaturalNumber._$toList<N>,
  T_LEN_LIST extends DigitList.DigitList = NaturalNumber._$toList<
    List._$length<T>
  >,
  TO_ADD extends DigitList.DigitList = DigitList._$subtract<N_LIST, T_LEN_LIST>
> = TO_ADD extends ['0'] ? T : _$padStart2<TO_ADD, V, T>

export interface PadStart_T2<N extends Number.Number, V> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$padStart<N, V, typeof x>
}

export interface PadStart_T1<N extends Number.Number> extends Kind.Kind {
  f(x: this[Kind._]): PadStart_T2<N, typeof x>
}

/**
 * `PadStart` is a type-level function that takes in a desired length `N`,
 * a padding value `V`, and a list `T`, and returns a new list with the list
 * padded to the desired length with the padding value.
 *
 * If the list is already longer than the desired length, it is returned
 * unchanged.
 *
 * @template {number} N - The desired length of the list.
 * @template {unknown} V - The padding value.
 * @template {unknown[]} T - The list to pad.
 *
 * @example
 * ```ts
 * import { $, List } from "hkt-toolbelt";
 *
 * type Result = $<$<$<List.PadStart, 8>, 0>, [1, 2, 3]>; // [0, 0, 0, 1, 2, 3]
 * ```
 */
export interface PadStart extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): PadStart_T1<typeof x>
}

/**
 * Given a desired length, a padding value, and a list, pad the list to the
 * desired length with the padding value.
 *
 * @param {number} n - The desired length of the list.
 * @param {unknown} v - The padding value.
 * @param {unknown[]} x - The list to pad.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.padStart(8)(0)([1, 2, 3])
 * //    ^? [0, 0, 0, 1, 2, 3]
 * ```
 */
export const padStart = ((n: number) => (v: unknown) => (x: unknown[]) => {
  if (x.length >= n) {
    return x
  }

  const result = []

  for (let i = 0; i < n - x.length; i++) {
    result.push(v)
  }

  return result.concat(x)
}) as Kind._$reify<PadStart>
