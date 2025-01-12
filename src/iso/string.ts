export * from './string/'

/**
 * The `Iso.String` module contains various string-related isomorphisms. These
 * isomorphisms are used to transform between different representations of
 * strings.
 *
 * @example
 * ```ts
 * import { String, Iso } from "hkt-toolbelt";
 *
 * type T0 = $<Iso.String.Words, $<List.Map, String.Capitalize>>;
 * type T1 = $<T0, 'foo bar baz'>; // 'Foo Bar Baz'
 * ```
 */
declare module './string' {}
