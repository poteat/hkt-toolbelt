import { $, Test, Type } from '..'

type IsNever_Spec = [
  /**
   * "1" is not never.
   */
  Test.Expect<$<Type.IsNever, '1'>, false>,

  /**
   * 'never' is never.
   */
  Test.Expect<$<Type.IsNever, never>>,

  /**
   * 'unknown' is not never.
   */
  Test.Expect<$<Type.IsNever, unknown>, false>,

  /**
   * 'any' is not never.
   */
  Test.Expect<$<Type.IsNever, any>, false>
]
