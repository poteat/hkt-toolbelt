import { $, Type, Kind, String } from '../..'

/**
 * Given a kind, return an isomorphism such that the input is converted to a
 * list of words, and the output is converted from a list of words back to a
 * composite string.
 *
 * @param {Kind.Kind} K - The kind to wrap.
 *
 * @example
 * ```ts
 * import { String, Iso } from "hkt-toolbelt";
 *
 * type T0 = Iso.String._$words<$<List.Map, String.Capitalize>>;
 * type T1 = $<T0, 'foo bar baz'>; // 'Foo Bar Baz'
 * ```
 */
export type _$words<K extends Kind.Kind> = $<
  Kind.Pipe,
  [String.Words, K, String.Unwords]
>

/**
 * Given a kind, return an isomorphism such that the input is converted to a
 * list of words, and the output is converted from a list of words back to a
 * composite string.
 *
 * @param {Kind.Kind} K - The kind to wrap.
 *
 * @example
 * ```ts
 * import { String, Iso } from "hkt-toolbelt";
 *
 * type T0 = $<Iso.String.Words, $<List.Map, String.Capitalize>>;
 * type T1 = $<T0, 'foo bar baz'>; // 'Foo Bar Baz'
 * ```
 */
export interface Words extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): _$words<typeof x>
}

/**
 * Given a kind, return an isomorphism such that the input is converted to a
 * list of words, and the output is converted from a list of words back to a
 * composite string.
 *
 * @param {Kind.Kind} K - The kind to wrap.
 *
 * @example
 * ```ts
 * import { String, Iso } from "hkt-toolbelt";
 *
 * const T0 = Iso.string.words(List.map(String.capitalize));
 * ```
 */
export const words = ((f: Kind._$reify<Kind.Kind<(x: string[]) => string[]>>) =>
  (x: string) =>
    String.unwords(f(String.words(x)))) as Kind._$reify<Words>
