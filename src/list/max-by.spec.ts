import { $, Test, List, Function, String } from '..'

type MaxBy_Spec = [
  /**
   * Can find the maximum element of a list of numbers.
   */
  Test.Expect<$<$<List.MaxBy, Function.Identity>, [1, 2, 3]>, 3>,

  /**
   * Can find the maximum element of a list of strings, based on length.
   */
  Test.Expect<$<$<List.MaxBy, String.Length>, ['foo', 'bars', 'qux']>, 'bars'>
]
