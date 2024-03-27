import { Test, Type } from '..'

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
  Test.Expect<Type._$cast<true, boolean>, true>,

  /**
   * Can coercively cast a type to an unrelated type.
   */
  Test.Expect<Type._$cast<boolean, 0>, 0>
]
