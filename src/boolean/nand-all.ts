import { Kind, Type, Boolean } from '..'

/**
 * `_$nAndAll` is a type-level function that determines whether none of the
 * elements in a sequence of booleans are `true`.
 *
 * @template B - A sequence of booleans.
 *
 * @example
 * For example, we can use `_$nAndAll` to check if none of the elements in a
 * boolean array are `true`. In this example, we have an array with all elements
 * being `false`:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$nAndAll<[false, false, false]>; // true
 * ```
 */
export type _$nandAll<B extends boolean[]> = 0 extends B['length']
  ? false
  : Boolean._$andAll<B> extends true
    ? false
    : true

/**
 * `NandAll` is a type-level function that applies the '_$nAndAll' operation to
 * a sequence of booleans.
 *
 * @example
 * For example, we can use `NandAll` to check if none of the elements in a
 * boolean array are `true`. In this example, we have an array with all elements
 * being `false`:
 *
 * We apply `NandAll` to the boolean array using the `$` type-level applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<$<Boolean.NandAll, [false, false, false]>>; // true
 * ```
 */
export interface NandAll extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean[]>): _$nandAll<typeof x>
}
