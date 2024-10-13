import { $, Boolean, Type, Kind, Function } from '..'

/**
 * `_$some` is a type-level function that checks if some element in a tuple satisfies a predicate.
 *
 * @template F - The predicate function.
 * @template T - The tuple to check.
 * @returns A boolean.
 *
 * @example
 * type T0 = List._$some<$<Conditional.Extends, number>, [1, 2, 3, 'x']> // true
 * type T1 = List._$some<$<Conditional.Extends, number>, ['x', 'y', 'z']> // false
 */
export type _$some<
  F extends Kind.Kind<(x: never) => boolean>,
  T extends unknown[],
  O extends boolean = false
> = 0 extends 1
  ? never
  : T extends [infer Head, ...infer Rest]
    ? _$some<
        F,
        Rest,
        Boolean._$or<O, $<F, Type._$cast<Head, Kind._$inputOf<F>>>>
      >
    : O

interface Some_T<T extends Kind.Kind<(x: never) => boolean>> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<T>[]>): _$some<T, typeof x>
}

/**
 * `Some` is a type-level function that checks if some element in a tuple satisfies a predicate.
 *
 * @template F - The predicate function.
 * @template T - The tuple to check.
 * @returns A boolean.
 *
 * @example
 * type T0 = $<$<List.Some, $<Conditional.Extends, number>>, [1, 2, 3, 'x']>  // true
 * type T1 = $<$<List.Some, $<Conditional.Extends, number>>, ['x', 'y', 'z']> // false
 */
export interface Some extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => boolean>>
  ): Some_T<typeof x>
}

/**
 * Given a predicate and a list, return whether or not at least one element in
 * the list satisfies the predicate.
 *
 * @param {Kind.Kind<(x: never) => boolean>} f - The predicate to check.
 * @param {unknown[]} values - The list to check.
 *
 * @example
 * ```ts
 * import { List, String } from "hkt-toolbelt";
 *
 * const result = List.some(String.isString)(['foo', 'bar'])
 * //    ^? true
 * ```
 */
export const some = ((f: Function.Function) => (values: unknown[]) =>
  values.some((value) => f(value as never))) as Kind._$reify<Some>
