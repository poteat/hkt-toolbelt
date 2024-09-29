import { $, Test, Type } from '..'

type Union_Spec = [
  /**
   * Can union two types.
   */
  Test.Expect<
    $<$<Type.Union, { foo: string }>, { bar: string }>,
    { foo: string } | { bar: string }
  >,

  /**
   * Can union with an empty type.
   */
  Test.Expect<$<$<Type.Union, {}>, { bar: string }>, {} | { bar: string }>,

  /**
   * Can union with non-object types.
   */
  Test.Expect<
    $<$<Type.Union, string>, { bar: string }>,
    | string
    | {
        bar: string
      }
  >
]
