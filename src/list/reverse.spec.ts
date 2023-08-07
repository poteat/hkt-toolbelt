import { $, List, Test } from '..'

type Reverse_Spec = [
  /**
   * Can reverse a tuple.
   */
  Test.Expect<$<List.Reverse, [1, 2, 3]>, [3, 2, 1]>,

  /**
   * The reverse of the empty tuple is the empty tuple.
   */
  Test.Expect<$<List.Reverse, []>, []>,

  /**
   * Can reverse a tuple of indeterminate length.
   */
  Test.Expect<$<List.Reverse, number[]>, number[]>,

  /**
   * Can reverse a tuple with a variadic.
   */
  Test.Expect<$<List.Reverse, [1, 2, 3, ...number[]]>, [...number[], 3, 2, 1]>,

  /**
   * Can reverse a tuple with a variadic and elements following the variadic.
   */
  Test.Expect<
    $<List.Reverse, [1, 2, 3, ...number[], 'foo']>,
    ['foo', ...number[], 3, 2, 1]
  >
]
