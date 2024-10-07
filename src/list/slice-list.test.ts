import { $, List, Test } from '..'

type SliceList_Spec = [
  /**
   * Can slice lists.
   */
  Test.Expect<$<$<$<List.SliceList, [1, 2, 3, 4, 5]>, 1>, 3>, [2, 3]>,

  /**
   * Can slice lists with negative indices.
   */
  Test.Expect<$<$<$<List.SliceList, [1, 2, 3, 4, 5]>, -2>, -1>, [4]>,
  Test.Expect<$<$<$<List.SliceList, [1, 2, 3, 4, 5]>, -3>, -1>, [3, 4]>,
  Test.Expect<$<$<$<List.SliceList, [1, 2, 3, 4, 5]>, -4>, -1>, [2, 3, 4]>,

  /**
   * Can handle empty lists.
   */
  Test.Expect<$<$<$<List.SliceList, []>, 0>, 0>, []>
]

it('should return a slice of a list', () => {
  expect(List.sliceList([1, 2, 3, 4, 5])(1)(3)).toEqual([2, 3])
})

it('should return a slice of a list with negative indices', () => {
  expect(List.sliceList([1, 2, 3, 4, 5])(-2)(-1)).toEqual([4])
})

it('can handle empty lists', () => {
  expect(List.sliceList([])(0)(0)).toEqual([])
})
