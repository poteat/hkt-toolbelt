import { $, Kind, Type, Function } from '..'

/**
 * `_$apply` is the internal implementation for the `Apply` utility.
 *
 * @see {@link $}
 * It takes a value X and kind K, casts X to the input type of K, and applies
 * K to the casted X using the `$` operator.
 *
 * @template X - The value to apply K to
 * @template K - The kind to apply
 *
 * @returns The result of applying K to the casted X
 */
export type _$apply<X, K extends Kind.Kind> = $<
  K,
  Type._$cast<X, Kind._$inputOf<K>>
>

interface Apply_T<X> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: X) => unknown>>
  ): _$apply<X, typeof x>
}

/**
 * `Apply` is a type-level function that applies a kind to a type.
 *
 * It takes a value X and kind K, casts X to the input type of K, and applies
 * K to the casted X using the `$` operator.
 *
 * @see {@link $}
 * Notably, the argument positions are reversed compared to `\$`.
 * Here, we first take in a value, and then a kind to apply to that value.
 *
 * @template X - The value of type X to apply the kind to
 * @template K - The kind to apply
 *
 * @returns The result of applying K to x
 *
 * @example
 *
 * For a simple example, we can apply `Identity` to the type 42:
 *
 * ```ts
 * import { $, Kind, Function } from 'hkt-toolbelt'
 *
 * type X = $<$<Kind.Apply, 42>, Function.Identity> // 42
 * ```
 *
 * @example
 *
 * `Apply` is particularly useful for more complicated chains of type-level
 * logic. For example, we can map over a list of kinds and apply all of them
 * to an input type:
 *
 * ```ts
 * import { $, Kind, List, String } from 'hkt-toolbelt'
 *
 * type X = $<
 *   $<List.Map, $<Kind.Apply, 'qux'>>,
 *   [$<String.Prepend, 'foo'>, $<String.Append, 'bar'>, String.ToUpper]
 * >
 * // ['fooqux', 'quxbar', 'QUX']
 * ```
 *
 * In the above example, we map over a list of kinds, and apply each of them
 * to the input type `'qux'`. The result is a list of types, each of which
 * is the result of applying the corresponding kind to `'qux'`.
 */
export interface Apply extends Kind.Kind {
  f(x: this[Kind._]): Apply_T<typeof x>
}

/**
 * Given a value and a kind, apply the kind to the value.
 *
 * @param {unknown} x - The value to apply the kind to.
 * @param {Kind.Kind} f - The kind to apply.
 *
 * @example
 * ```ts
 * import { Kind, String } from "hkt-toolbelt";
 *
 * const result = Kind.apply('foo')(String.toUpper)
 * //    ^? 'FOO'
 * ```
 */
export const apply = ((x: unknown) => (f: Function.Function) =>
  f(x as never)) as Kind._$reify<Apply>
