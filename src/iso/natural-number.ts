export * from './natural-number/'

/**
 * The `Iso.NaturalNumber` module contains various number-related isomorphisms.
 * These first compute some transformation on the input, and then apply the
 * inverse transformation to the output.
 *
 * @example
 * ```ts
 * import { Iso } from "hkt-toolbelt";
 *
 * type T0 = $<Iso.NaturalNumber.Increment, $<NaturalNumber.Multiply, 2>>;
 * type T1 = $<T0, 10>; // (N + 1) * 2 - 1 = 21
 * ```
 */
declare module './natural-number' {}
