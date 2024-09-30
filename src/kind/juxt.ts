import { $, Kind, Type, Function } from '..'

/**
 * `_$juxt` is a type-level function that takes in a tuple of kinds `FX` and
 * applies each kind in the tuple to the input type `X`.
 *
 * @template FX - A tuple of kinds to apply.
 * @template X - The input type to apply the kinds to.
 *
 * @returns A tuple of the results of applying each kind in the tuple to `X`.
 *
 * @example
 *
 * In the below example, we apply `Kind._$juxt` to a tuple of two kinds,
 * List.Length and List.Reverse. On the successive line, we apply the kinds to
 * the input type `[1, 2, 3]`. The result is a tuple of two types, the first
 * being the length of the input list `[1, 2, 3]` (3), and the second being the
 * reversed list `[3, 2, 1]`.
 *
 * ```ts
 * import { $, Kind, List } from "hkt-toolbelt";
 *
 * type MyJuxt = Kind._$juxt<[List.Length, List.Reverse]>;
 *
 * type Result = $<MyJuxt, [1, 2, 3]>; // [3, [3, 2, 1]]
 * ```
 */
export type _$juxt<FX extends Kind.Kind[], X> = {
  [key in keyof FX]: $<FX[key], Type._$cast<X, Kind._$inputOf<FX[key]>>>
}

interface Juxt_T<FX extends Kind.Kind[]> extends Kind.Kind {
  f(
    x: Type._$cast<
      this[Kind._],
      FX extends [] ? unknown : Kind._$inputOf<FX[number]>
    >
  ): _$juxt<FX, typeof x>
}

/**
 * `Juxt` is a type-level function that applies a tuple of kinds to a type.
 *
 * This is useful for implementing point-free style type-level functions.
 *
 * @template FX - A tuple of kinds to apply.
 * @template X - The input type to apply the kinds to.
 *
 * @returns A tuple of the results of applying each kind in the tuple to `X`.
 *
 * @example
 *
 * In the below example, we apply `Kind.Juxt` to a tuple of two kinds,
 * List.Length and List.Reverse. On the successive line, we apply the kinds to
 * the input type `[1, 2, 3]`. The result is a tuple of two types, the first
 * being the length of the input list `[1, 2, 3]` (3), and the second being the
 * reversed list `[3, 2, 1]`.
 *
 * ```ts
 * import { $, Kind, List } from "hkt-toolbelt";
 *
 * type MyJuxt = $<Kind.Juxt, [List.Length, List.Reverse]>;
 *
 * type Result = MyJuxt<[1, 2, 3]>; // [3, [3, 2, 1]]
 * ```
 */
export interface Juxt extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind[]>): Juxt_T<typeof x>
}

/**
 * Given a list of kinds, apply them all to a value, returning a tuple of the
 * results.
 *
 * @param {Kind.Kind[]} fx - The list of kinds to apply.
 * @param {unknown} x - The value to apply the kinds to.
 *
 * @example
 * ```ts
 * import { Kind, List } from "hkt-toolbelt";
 *
 * const result = Kind.juxt([List.length, List.reverse])([1, 2, 3])
 * //    ^? [3, [3, 2, 1]]
 * ```
 */
export const juxt = ((fx: Function.Function[]) => (x: unknown) => {
  const result = []
  for (const f of fx) {
    result.push(f(x as never))
  }
  return result
}) as Kind._$reify<Juxt>
