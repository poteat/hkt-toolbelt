import { $, Kind, Type, List } from '..'

/**
 * `_$parameters` is a type-level function that takes in a curried n-ary type-level function,
 * and returns an ordered list of the types of the n arguments that the input function is expecting.
 *
 * @template {Kind.Kind} K - A type-level function whose parameters will be returned.
 * @returns {List.List} A list of the types of the arguments that `K` can be successively applied to.
 *
 * `K` can be applied successively to a series of arguments that extend each element of the
 * list returned by `_$parameters` by using the @see {@link `$`} operator.
 *
 * `K` can also be applied to a list of arguments that extends the list returend by `_$parameters`
 * by using the @see {@link `$N`} operator.
 *
 * If `K` is a fully-applied `Kind`, an empty list will be returned.
 * If `K` is not a `Kind`, an error will be emitted.
 */
export type _$parameters<
  K extends Kind.Kind,
  ACC extends List.List = []
> = Kind._$inputOf<K> extends never
  ? ACC
  : $<K, never> extends Kind.Kind
  ? _$parameters<$<K, never>, List._$push<Kind._$inputOf<K>, ACC>>
  : never

/**
 * `Parameters` is a type-level function that takes in a curried n-ary type-level function,
 * and returns an ordered of the types of the n arguments that the input function is expecting.
 *
 * @template {Kind.Kind} K - A type-level function whose parameters will be returned.
 * @returns {List.List} A list of the types of the arguments that `K` can be successively applied to.
 *
 * `K` can be applied successively to a series of arguments that extend each element of the
 * list returned by `Parameters` by using the @see {@link `$`} operator.
 *
 * `K` can also be applied to a list of arguments that extends the list returend by `Parameters`
 * by using the @see {@link `$N`} operator.
 *
 * If `K` is a fully-applied `Kind`, an empty list will be returned.
 * If `K` is not a `Kind`, an error will be emitted.
 *
 * @example
 * type ReduceParams = $<Kind.Parameters, List.Reduce>  // [Kind.Kind<(x: never) => Kind.Kind>, unknown, List.List]
 * type PartialApply1 = $<Kind.Parameters, $<List.Reduce, never>>  // [unknown, List.List]
 * type PartialApply2 = $<Kind.Parameters, $<$<List.Reduce, never>, never>>  // [List.List]
 * type FullApply = $<Kind.Parameters, $<$<$<List.Reduce, never>, never>, never>>  // []
 */
export interface Parameters extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): _$parameters<typeof x>
}
