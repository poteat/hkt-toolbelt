import { Conditional, Test, Type } from '..'

/**
 * `ExpectNot` is a type-level function that checks if a type `X` does not equal a type `V`.
 * It causes a compiler error to be emitted if the types are equivalent.
 * 
 * @template X - The type to check.
 * @template V - The type to compare with. Defaults to `false`.
 * 
 * @example
 * type T0 = ExpectNot<true, false> // true
 * type T1 = ExpectNot<true, true> // Compiler error
 */
export type ExpectNot<
  X extends Conditional._$equals<X, V> extends true ? V : V & Test._,
  V = false
> = Type._$isNever<V> extends true
  ? X
  : Type._$isNever<X> extends true
  ? ExpectNot<X, V>
  : X
