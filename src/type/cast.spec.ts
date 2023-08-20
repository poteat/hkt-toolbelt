import { Test, Type } from '..'

/**
 * `Cast_Spec` is a type that tests the `_$cast` type-level function.
 * It includes tests for casting a type to itself, to a subtype, and to a supertype.
 */
type Cast_Spec = [
  /**
   * Can cast a type to itself.
   */
  Test.Expect<Type._$cast<true, true>, true>,

  /**
   * Can cast a type to a subtype.
   */
  Test.Expect<Type._$cast<boolean, true>, true>,

  /**
   * Casting to a supertype keeps the type narrow.
   */
  Test.Expect<Type._$cast<true, boolean>, true>
]
