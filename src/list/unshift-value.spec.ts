import { $, List, Test } from '..'

type UnshiftValue_Spec = [
  /**
   * Can unshift a value onto a list.
   */
  Test.Expect<$<$<List.UnshiftValue, [1, 2, 3]>, 4>, [4, 1, 2, 3]>,

  /**
   * Can unshift a value onto a list.
   */
  Test.Expect<$<$<List.UnshiftValue, [1, 2, 3]>, 4>, [4, 1, 2, 3]>,

  /**
   * Can handle array input.
   */
  Test.Expect<
    $<$<List.UnshiftValue, [1, 2, 3]>, [4, 5, 6]>,
    [[4, 5, 6], 1, 2, 3]
  >
]

it('should unshift a value onto the start of a list', () => {
  expect(List.unshiftValue([1, 2, 3])(4)).toEqual([4, 1, 2, 3])
})
