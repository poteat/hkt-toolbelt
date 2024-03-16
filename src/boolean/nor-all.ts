import { Kind, Type } from '..'

/**
 * `_$norAll` is a type-level function that determines whether none of the
 * elements in a sequence of booleans are `true`.
 *
 * @template B - A sequence of booleans.
 *
 * @example
 * For example, we can use `_$norAll` to check if none of the elements in a
 * boolean array are `true`. In this example, we have an array with all elements
 * being `false`:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$norAll<[false, false, false]>; // true
 * ```
 */
export type _$norAll<B extends boolean[]> =
  FalseList<B['length'] extends 0 ? 1 : B['length']> extends B ? true : false

type FalseList<
  L extends number,
  A extends unknown[] = [],
  Output extends unknown[] = A['length'] extends L
    ? A
    : FalseList<L, [...A, false]>
> = Output

/**
 * `NorAll` is a type-level function that applies the '_$norAll' operation to
 * a sequence of booleans.
 *
 * @example
 * For example, we can use `NorAll` to check if none of the elements in a
 * boolean array are `true`. In this example, we have an array with all elements
 * being `false`:
 *
 * We apply `NorAll` to the boolean array using the `$` type-level applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<$<Boolean.NorAll, [false, false, false]>>; // true
 * ```
 */
export interface NorAll extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean[]>): _$norAll<typeof x>
}
