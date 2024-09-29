import { $, List, String, Test } from '..'

type TransformAt_Spec = [
  /**
   * Can transform the element at index 1 in a list.
   */
  Test.Expect<
    $<$<$<List.TransformAt, String.ToUpper>, 1>, ['foo', 'bar']>,
    ['foo', 'BAR']
  >,

  /**
   * Can transform the element at index 0 in a list.
   */
  Test.Expect<
    $<$<$<List.TransformAt, String.ToUpper>, 0>, ['foo', 'bar']>,
    ['FOO', 'bar']
  >,

  /**
   * Transforming at a non-existent index returns the original list.
   */
  Test.Expect<
    $<$<$<List.TransformAt, String.ToUpper>, 100>, ['foo', 'bar']>,
    ['foo', 'bar']
  >
]
