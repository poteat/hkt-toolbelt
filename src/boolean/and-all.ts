import { Kind, Type } from '..'

/**
 * `_$andAll` is a type-level function that determines whether all elements
 * in a sequence of booleans are `true`.
 *
 * @template B - A sequence of booleans.
 *
 * @example
 * For example, we can use `_$andAll` to check if all elements in a boolean
 * array are `true`. In this example, we have an array with all elements being
 * `true`:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$andAll<[true, true, true]>; // true
 * ```
 */
export type _$andAll<B extends boolean[]> = TrueList<
  B['length'] extends 0 ? 1 : B['length']
> extends B
  ? true
  : false

type TrueList<
  L extends number,
  A extends unknown[] = [],
  Output extends unknown[] = A['length'] extends L
    ? A
    : TrueList<L, [...A, true]>
> = Output

/**
 * `AndAll` is a type-level function that applies the '_$andAll' operation to
 * a sequence of booleans.
 *
 * @example
 * For example, we can use `AndAll` to check if all elements in a boolean array
 * are `true`. In this example, we have an array with all elements being `true`:
 *
 * We apply `AndAll` to the boolean array using the `$` type-level applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<$<Boolean.AndAll, [true, true, true]>>; // true
 * ```
 */
export interface AndAll extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean[]>): _$andAll<typeof x>
}
