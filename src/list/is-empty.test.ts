import { $, List, Test } from '..'

type IsEmpty_Spec = [
  /**
   * Can check if a list is empty.
   */
  Test.Expect<$<List.IsEmpty, []>, true>,

  /**
   * Can check if a list is not empty.
   */
  Test.Expect<$<List.IsEmpty, [1, 2, 3]>, false>
]

it('should return true for empty lists', () => {
  expect(List.isEmpty([])).toBe(true)
})

it('should return false for non-empty lists', () => {
  expect(List.isEmpty([1, 2, 3])).toBe(false)
})
