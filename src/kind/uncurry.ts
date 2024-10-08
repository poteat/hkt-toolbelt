import { $, Kind, Type, Function } from '..'

/**
 * `_$uncurry` is a type-level function that takes in a type-level function and
 * a list of arguments, and applies each element of the list to the kind one-by-
 * one.
 *
 * This is syntactic sugar for nested `$` applications. See `$N`, which is the
 * operator shorthand for this function.
 *
 * @template {Kind.Kind} K - The type-level function to apply.
 * @template {List.List} X - The list of arguments to apply the type-level function to.
 *
 * This is useful for applying a type-level function that takes many arguments,
 * such as conditionals.
 */
export type _$uncurry<K extends Kind.Kind, X extends unknown[]> = X extends [
  infer A extends Kind._$inputOf<K>,
  ...infer B
]
  ? $<K, A> extends Kind.Kind
    ? _$uncurry<$<K, A>, B>
    : $<K, A>
  : K

interface Uncurry_T<K extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$uncurry<K, typeof x>
}

/**
 * `Uncurry` is a type-level function that takes in a type-level function and
 * a list of arguments, and applies the type-level function to the list of
 * arguments.
 *
 * This is syntactic sugar for nested `$` applications. See `$N`, which is the
 * operator shorthand for this function.
 *
 * @template {Kind.Kind} K - The type-level function to apply.
 * @template {List.List} X - The list of arguments to apply the type-level function to.
 *
 * This is useful for applying a type-level function that takes many arguments,
 * such as conditionals.
 *
 * Additionally, this can be used in conjunction with `Curry` to "lift"
 * arguments out of function composition.
 */
export interface Uncurry extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): Uncurry_T<typeof x>
}

/**
 * Given a kind `K`, return a function that takes in a list of arguments and
 * returns the result of applying `K` successively to each argument.
 *
 * @param {Kind.Kind} k - The kind to uncurry.
 * @param {unknown[]} x - The list of arguments to apply the kind to.
 *
 * @example
 * ```ts
 * import { Kind, String } from "hkt-toolbelt";
 *
 * const result = Kind.uncurry(String.append)(['foo', 'bar'])
 * //    ^? 'barfoo'
 * ```
 */
export const uncurry = ((k: Function.Function) => (x: unknown[]) => {
  let value: unknown = k

  for (let i = 0; i < x.length; i++) {
    value = (value as Function.Function)(x[i] as never)
  }

  return value
}) as Kind._$reify<Uncurry>
