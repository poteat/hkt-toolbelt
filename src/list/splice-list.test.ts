import { $, List, Test } from '..'

type SpliceList_Spec = [
  /**
   * Can delete elements from start index without inserting elements.
   */
  Test.Expect<
    $<$<$<$<List.SpliceList, [1, 2, 3, 4, 5]>, 1>, 2>, []>,
    [1, 4, 5]
  >,

  /**
   * Can insert elements from start index without deleting elements.
   */
  Test.Expect<
    $<$<$<$<List.SpliceList, [1, 2, 3, 4, 5]>, 1>, 0>, [6, 7]>,
    [1, 6, 7, 2, 3, 4, 5]
  >
]

it('should splice a list', () => {
  expect(List.spliceList([1, 2, 3, 4, 5])(1)(0)([6, 7])).toEqual([
    1, 6, 7, 2, 3, 4, 5
  ])
})
