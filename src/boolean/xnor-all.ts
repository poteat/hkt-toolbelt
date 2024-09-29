import { $, Kind, NaturalNumber, Type } from '..'

/**
 * `_$xnorAll` is a type-level function that determines whether an odd number
 * of elements in a sequence of booleans are `true`.
 *
 * @template {boolean[]} B - A sequence of booleans.
 *
 * @example
 * For example, we can use `_$xnorAll` to check if an odd number of elements
 * in a boolean array are `true`. In this example, we have an array with an odd
 * number of `true` elements:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$xnorAll<[true, false, false]>; // false
 * ```
 */
export type _$xnorAll<B extends boolean[]> = $<
  NaturalNumber.IsOdd,
  NumberOfTrues<B>
>

type NumberOfTrues<
  B extends boolean[],
  Acc extends unknown[] = [],
  Output extends number = B extends [
    infer Init,
    ...infer Tail extends boolean[]
  ]
    ? NumberOfTrues<Tail, [...Acc, ...(Init extends true ? [Init] : [])]>
    : Acc['length']
> = Output

/**
 * `XnorAll` is a type-level function that returns true if an odd number of
 * elements in the given sequence of booleans are true.
 *
 * @template {boolean[]} T - The boolean array to check.
 *
 * @example
 * For example, we can use `XnorAll` to check if an even number of elements in
 * a boolean array are `true`. In this example, we have an array with an odd
 * number of `true` elements:
 *
 * We apply `XnorAll` to the boolean array using the `$` type-level applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<Boolean.XnorAll, [true, false, true]>; // false
 * ```
 */
export interface XnorAll extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean[]>): _$xnorAll<typeof x>
}
