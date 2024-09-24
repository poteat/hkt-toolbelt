import { $, Test, Type } from '..'

type IntersectAll_Spec = [
  /**
   * Can intersect all types in a tuple.
   */
  Test.Expect<
    $<Type.IntersectAll, [{ foo: string }, { bar: string }]>,
    { foo: string; bar: string }
  >,

  /**
   * Intersecting an empty tuple results in `unknown`
   */
  Test.Expect<$<Type.IntersectAll, []>, unknown>,

  /**
   * Can intersect with non-object types.
   */
  Test.Expect<
    $<Type.IntersectAll, [string, { bar: string }]>,
    string & {
      bar: string
    }
  >,

  /**
   * An intersection of a 1-tuple is the identity of the element.
   */
  Test.Expect<$<Type.IntersectAll, [string]>, string>
]
