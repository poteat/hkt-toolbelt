import { $, Boolean, Type, Kind, Function } from '..'

/**
 * `_$every` is a type-level function that checks if every element in a tuple satisfies a predicate.
 *
 * @template F - The predicate function.
 * @template T - The tuple to check.
 * @returns A boolean.
 *
 * @example
 * type T0 = List._$every<$<Conditional.Extends, number>, [1, 2, 3]> // true
 * type T1 = List._$every<$<Conditional.Extends, number>, [1, 2, 3, 'x']> // false
 */
export type _$every<
  F extends Kind.Kind<(x: never) => boolean>,
  T extends unknown[],
  O extends boolean = true
> = T extends [infer Head, ...infer Rest]
  ? _$every<
      F,
      Rest,
      Boolean._$and<O, $<F, Type._$cast<Head, Kind._$inputOf<F>>>>
    >
  : O

interface Every_T<F extends Kind.Kind<(x: never) => boolean>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<F>[]>): _$every<F, typeof x>
}

/**
 * `Every` is a type-level function that checks if every element in a tuple satisfies a predicate.
 *
 * @template F - The predicate function.
 * @template T - The tuple to check.
 * @returns A boolean.
 *
 * @example
 * type T0 = $<$<List.Every, $<Conditional.Extends, number>>, [1, 2, 3]> // true
 * type T1 = $<$<List.Every, $<Conditional.Extends, number>>, [1, 2, 3, 'x']> // false
 */
export interface Every extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => boolean>>
  ): Every_T<typeof x>
}

/**
 * Given a predicate and a list, check if all elements of the list satisfy the
 * predicate.
 *
 * @param {Kind.Kind<(x: unknown) => boolean>} f - The predicate to check.
 * @param {unknown[]} values - The list to check.
 *
 * @example
 * ```ts
 * import { List, String } from "hkt-toolbelt";
 *
 * const result = List.every(String.isString)(['foo', 'bar'])
 * //    ^? true
 * ```
 */
export const every = ((f: Function.Function) => (values: unknown[]) =>
  values.every((value) => f(value as never))) as Kind._$reify<Every>
