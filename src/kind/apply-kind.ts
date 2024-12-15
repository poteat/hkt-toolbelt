import { $, Kind, Type, Function } from '..'

/**
 * `_$applyKind` is a type-level function that takes in a kind `K` and a value `X`,
 * and applies the kind to the value.
 *
 * @template K - The kind to apply
 * @template X - The value to apply K to
 *
 * @example
 * ```ts
 * import { Kind, Function } from "hkt-toolbelt";
 *
 * type Result = Kind._$applyKind<Function.Identity, [1, 2, 3]>; // [1, 2, 3]
 * ```
 */
export type _$applyKind<K extends Kind.Kind, X> = $<
  K,
  Type._$cast<X, Kind._$inputOf<K>>
>

interface ApplyKind_T<K extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<K>>): _$applyKind<K, typeof x>
}

/**
 * `ApplyKind` is a type-level function that takes in a kind `K` and a value `X`,
 * and applies the kind to the value.
 *
 * @template K - The kind to apply
 * @template X - The value to apply K to
 *
 * @example
 * ```ts
 * import { $, Kind, Function } from "hkt-toolbelt";
 *
 * type Result = $<$<Kind.ApplyKind, Function.Identity>, [1, 2, 3]>; // [1, 2, 3]
 * // Equivalent to $<Function.Identity, [1, 2, 3]>
 * ```
 */
export interface ApplyKind extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): ApplyKind_T<typeof x>
}

/**
 * Given a kind and a value, apply the kind to the value.
 *
 * @param {Kind.Kind} k - The kind to apply.
 * @param {unknown} x - The value to apply the kind to.
 *
 * @example
 * ```ts
 * import { Kind, Function } from "hkt-toolbelt";
 *
 * const result = Kind.applyKind(Function.identity)([1, 2, 3])
 * //    ^? [1, 2, 3]
 * ```
 */
export const applyKind = ((k: Function.Function) => (x: unknown) =>
  k(x as never)) as Kind._$reify<ApplyKind>
