import { $, Test, Type } from '..'

type Intersect_Spec = [
  /**
   * Can intersect two types.
   */
  Test.Expect<
    $<$<Type.Intersect, { foo: string }>, { bar: string }>,
    { foo: string; bar: string }
  >,

  /**
   * Can intersect with an empty type.
   */
  Test.Expect<$<$<Type.Intersect, {}>, { bar: string }>, { bar: string }>,

  /**
   * Can intersect with non-object types.
   */
  Test.Expect<
    $<$<Type.Intersect, string>, { bar: string }>,
    string & {
      bar: string
    }
  >
]
