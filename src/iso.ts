export * from './iso/'

/**
 * The `Iso` module contains various isomorphisms. These isomorphisms are used
 * to transform between different representations of the same type.
 *
 * Generally, isomorphisms consist of a mapping and an inverse mapping.
 * The isomorphism takes in a kind, and returns a new kind where the input is
 * transformed via the primary mapping, and the output is transformed via the
 * inverse mapping.
 *
 * A very common operation is to perform a .split(""), do some operations, and
 * then .join("") the result. This can be combined into a single step using
 * the `Iso` module.
 *
 * @example
 * ```ts
 * import { String, Iso } from "hkt-toolbelt";
 *
 * type T0 = $<Iso.String.Words, $<List.Map, String.Capitalize>>;
 * type T1 = $<T0, 'foo bar baz'>; // 'Foo Bar Baz'
 * ```
 */
declare module './iso' {}
