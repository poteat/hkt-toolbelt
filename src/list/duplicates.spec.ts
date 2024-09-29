import { $, List, Test } from '..'

type Duplicates_Spec = [
  /**
   * Can find the duplicates in a list.
   */
  Test.Expect<$<List.Duplicates, [1, 2, 3, 4, 5, 1]>, [1]>,

  /**
   * Can handle multiple duplicates.
   */
  Test.Expect<
    $<List.Duplicates, [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1]>,
    [1, 2, 3, 4, 5]
  >,

  /**
   * Can find the duplicates in a list, even if the list is empty.
   */
  Test.Expect<$<List.Duplicates, []>, []>,

  /**
   * All unique array results in an empty list.
   */
  Test.Expect<$<List.Duplicates, [1, 2, 3]>, []>
]

it('should return the duplicates of a list', () => {
  expect(List.duplicates([1, 2, 3, 4, 5, 1])).toEqual([1])
})

it('should return an empty list if the input is empty', () => {
  expect(List.duplicates([])).toEqual([])
})

it('should return an empty list if the input is unique', () => {
  expect(List.duplicates([1, 2, 3])).toEqual([])
})
