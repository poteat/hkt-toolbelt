import { $, Type, Kind, String } from '../..'

/**
 * Given a kind, return an isomorphism such that the input is converted to a
 * list of characters, and the output is joined into a string with spaces as
 * delimiters.
 *
 * @param {Kind.Kind} K - The kind to convert to a string.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type T0 = String._$chars<$<List.Map, $<String.RepeatBy, 2>>>;
 * type T1 = $<T0, "bar">; // "bbaarr"
 */
export type _$chars<K extends Kind.Kind> = $<
  Kind.Pipe,
  [String.ToList, K, String.FromList]
>

/**
 * Given a kind, return an isomorphism such that the input is converted to a
 * list of characters, and the output is joined into a string with spaces as
 * delimiters.
 *
 * @param {Kind.Kind} K - The kind to convert to a string.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type T0 = $<String.Chars, $<List.Map, $<String.RepeatBy, 2>>>
 * type T1 = $<T0, "bar">; // "bbaarr"
 */
export interface Chars extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): _$chars<typeof x>
}

/**
 * Given a kind, return an isomorphism such that the input is converted to a
 * list of characters, and the output is joined into a string with spaces as
 * delimiters.
 *
 * @param {Kind.Kind} K - The kind to convert to a string.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const T0 = String.chars(List.map(String.repeatBy(2)));
 * const T1 = T0("bar"); // "bbaarr"
 */
export const chars = ((f: Kind._$reify<Kind.Kind<(x: string[]) => string[]>>) =>
  (x: string) =>
    String.fromList(f(String.toList(x)))) as Kind._$reify<Chars>
