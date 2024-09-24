import { Kind, Type } from '..'
import { _$norAll } from './nor-all'

/**
 * `_$orAll` is a type-level function that determines whether any of the
 * elements in a sequence of booleans are `true`.
 *
 * @template {boolean[]} B - A sequence of booleans.
 *
 * @example
 * For example, we can use `_$orAll` to check if any of the elements in a
 * boolean array are `true`. In this example, we have an array with all elements
 * being `false`:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$orAll<[false, false, false]>; // false
 * ```
 */
export type _$orAll<B extends boolean[]> = 0 extends B['length']
  ? false
  : _$norAll<B> extends true
    ? false
    : true

/**
 * `OrAll` is a type-level function that returns true if any of the elements in
 * the given sequence of booleans are true.
 *
 * @template {boolean[]} T - The boolean array to check.
 *
 * @example
 * For example, we can use `OrAll` to check if any of the elements in a
 * boolean array are `true`. In this example, we have an array with all elements
 * being `false`:
 *
 * We apply `OrAll` to the boolean array using the `$` type-level applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<Boolean.OrAll, [false, false, false]>; // false
 * ```
 */
export interface OrAll extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean[]>): _$orAll<typeof x>
}
