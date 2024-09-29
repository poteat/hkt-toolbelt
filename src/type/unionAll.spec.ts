import { $, Test, Type } from '..'

type UnionAll_Spec = [
  /**
   * Can union all types in a tuple.
   */
  Test.Expect<
    $<Type.UnionAll, [{ foo: string }, { bar: string }]>,
    { foo: string } | { bar: string }
  >,

  /**
   * Unioning an empty tuple results in `never`.
   */
  Test.Expect<$<Type.UnionAll, []>, never>,

  /**
   * Can union with non-object types.
   */
  Test.Expect<
    $<Type.UnionAll, [string, { bar: string }]>,
    | string
    | {
        bar: string
      }
  >
]
