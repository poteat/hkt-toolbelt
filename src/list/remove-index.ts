import {
  Kind,
  Type,
  DigitList,
  Conditional,
  Number as Number_,
  NaturalNumber
} from '..'

type _$removeIndex2<
  I extends DigitList.DigitList,
  T extends unknown[],
  O extends unknown[] = [],
  Seek extends DigitList.DigitList = ['0']
> = T extends [infer Head, ...infer Tail]
  ? _$removeIndex2<
      I,
      Tail,
      Conditional._$equals<I, Seek> extends true ? O : [...O, Head],
      DigitList._$increment<Seek>
    >
  : O

/**
 * `_$removeIndex` is a type-level function that takes in an index `I`, a list
 * `T`, and returns a new list with the element at index `I` removed.
 *
 * Indices not present in the list are ignored.
 *
 * @template {DigitList.DigitList} I - The index to remove.
 * @template {unknown[]} T - The list to remove from.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type Result = List._$removeIndex<1, [1, 2, 3]>; // [1, 3]
 * ```
 */
export type _$removeIndex<I extends Number_.Number, T extends unknown[]> =
  Number_._$isNatural<I> extends true
    ? _$removeIndex2<NaturalNumber._$toList<I>, T>
    : T

interface RemoveIndex_T<I extends Number_.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$removeIndex<I, typeof x>
}

/**
 * `RemoveIndex` is a type-level function that takes in an index `I`, a list
 * `T`, and returns a new list with the element at index `I` removed.
 *
 * Indices not present in the list are ignored.
 *
 * @template {DigitList.DigitList} I - The index to remove.
 * @template {unknown[]} T - The list to remove from.
 *
 * @example
 * ```ts
 * type T0 = $<$<$<List.RemoveIndex, 1>, [1, 2, 3]>; // [1, 3]
 * ```
 */
export interface RemoveIndex extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): RemoveIndex_T<typeof x>
}

/**
 * Given an index and a list, return a new list with the element at the index
 * removed.
 *
 * Indices not present in the list are ignored.
 *
 * @param {Number_.Number} i - The index to remove.
 * @param {unknown[]} values - The list to remove from.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.removeIndex(1)([1, 2, 3])
 * //    ^? [1, 3]
 * ```
 */
export const removeIndex = ((i: Number_.Number) => (values: unknown[]) => {
  const index = Number(i)

  const result: unknown[] = []

  for (let i = 0; i < values.length; i++) {
    if (i !== index) {
      result.push(values[i])
    }
  }

  return result
}) as Kind._$reify<RemoveIndex>
