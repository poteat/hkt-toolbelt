import { $, Kind, NaturalNumber, Number, Type } from '..'

/**
 * `_$arity` is a type-level function that takes in a curried type-level function,
 * and returns the total number of arguments it needs in order to be fully applied.
 *
 * @template {Kind.Kind} K - A type-level function whose arity will be returned.
 * @returns {Number.Number} The number of arguments that `K` can be successively applied to.
 *
 * If `K` is a fully-applied `Kind`, 0 will be returned.
 * If `K` is not a `Kind`, an error will be emitted.
 */
export type _$arity<K extends Kind.Kind, ACC extends Number.Number = 0> =
  Kind._$inputOf<K> extends never
    ? ACC
    : $<K, never> extends Kind.Kind
      ? _$arity<$<K, never>, NaturalNumber._$increment<ACC>>
      : never

/**
 * `Arity` is a type-level function that takes in a curried type-level function,
 * and returns the total number of arguments it needs in order to be fully applied.
 *
 * @template {Kind.Kind} K - A type-level function whose arity will be returned.
 * @returns {Number.Number} The number of arguments that `K` can be successively applied to.
 *
 * If `K` is a fully-applied `Kind`, 0 will be returned.
 * If `K` is not a `Kind`, an error will be emitted.
 *
 * @example
 * ```ts
 * type ReduceArity = $<Kind.Arity, List.Reduce>  // 3
 * type PartialApply1 = $<Kind.Arity, $<List.Reduce, never>>  // 2
 * type PartialApply2 = $<Kind.Arity, $<$<List.Reduce, never>, never>>  // 1
 * type FullApply = $<Kind.Arity, $<$<$<List.Reduce, never>, never>, never>>  // 0
 * ```
 */
export interface Arity extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): _$arity<typeof x>
}
