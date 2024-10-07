import { $, Function, Kind, Type } from '..'

/**
 * `_$collapse` is a type-level function that takes in a kind `K` and a value
 * `X`, and repeatedly applies the current function to the value until it no
 * longer returns a kind.
 *
 * @template {Kind.Kind} K - The kind to collapse.
 * @template {unknown} X - The value to collapse with.
 *
 * @example
 * ```ts
 * import { $, Kind, Combinator } from "hkt-toolbelt";
 *
 * type T0 = _$collapse<$<Combinator.Collate, 2>, 1> // [2, 2]
 * ```
 */
export type _$collapse<K extends Kind.Kind, X extends Kind._$inputOf<K>> =
  $<K, X> extends infer NewValue
    ? NewValue extends Kind.Kind
      ? _$collapse<NewValue, Type._$cast<X, Kind._$inputOf<NewValue>>>
      : NewValue
    : never

interface Collapse_T<K extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<K>>): _$collapse<K, typeof x>
}

/**
 * `Collapse` is a type-level function that takes in a kind `K` and a value
 * `X`, and repeatedly applies the current function to the value until it no
 * longer returns a kind.
 *
 * @template {Kind.Kind} K - The kind to collapse.
 * @template {unknown} X - The value to collapse with.
 *
 * @example
 * ```ts
 * import { $, Kind, Combinator } from "hkt-toolbelt";
 *
 * type T0 = $<$<Kind.Collapse, $<Combinator.Collate, 2>>, 1> // [2, 2]
 * ```
 */
export interface Collapse extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): Collapse_T<typeof x>
}

/**
 * Given a kind `K` and a value `X`, repeatedly apply the current function to
 * the value until it no longer returns a kind.
 *
 * @param {Kind.Kind} k - The kind to collapse.
 * @param {unknown} x - The value to collapse with.
 *
 * @example
 * ```ts
 * import { Kind, Combinator } from "hkt-toolbelt";
 *
 * const result = Kind.collapse(Combinator.collate(2))(1)
 * //    ^? [1, 1]
 * ```
 */
export const collapse = ((k: Function.Function) => (x: unknown) => {
  let f = k

  while (typeof f === 'function') {
    f = f(x as never) as Function.Function
  }

  return f
}) as unknown as Kind._$reify<Collapse>
