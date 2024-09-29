import { $, Test, List, Function, String } from '..'

type MinBy_Spec = [
  /**
   * Can find the minimum element of a list of numbers.
   */
  Test.Expect<$<$<List.MinBy, Function.Identity>, [1, 2, 3]>, 1>,

  /**
   * Can find the minimum element of a list of strings, based on length.
   */
  Test.Expect<$<$<List.MinBy, String.Length>, ['foo', 'bars', 'qu']>, 'qu'>
]
