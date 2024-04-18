import { Test, Type } from '..'

type Assert_Spec = [
  /**
   * Can cast a type to itself.
   */
  Test.Expect<Type._$assert<true, true>, true>,

  /**
   * Can cast a type to a subtype.
   */
  Test.Expect<Type._$assert<boolean, true>, true>,

  /**
   * Can cast a type to a supertype.
   */
  Test.Expect<Type._$assert<true, boolean>, boolean>,

  /**
   * Returns `never` if the types are not related.
   */
  Test.Expect<Type._$assert<boolean, 0>, never>
]
