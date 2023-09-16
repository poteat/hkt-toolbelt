import { $, Boolean, Type, Kind } from '..'

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
