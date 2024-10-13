import { $, List, Test } from '..'

type EndsWith_Spec = [
  /**
   * Can check if a list ends with a value.
   */
  Test.Expect<$<$<List.EndsWith, [3, 4, 5]>, [1, 2, 3, 4, 5]>, true>,

  /**
   * Can check if a list does not end with a value.
   */
  Test.Expect<$<$<List.EndsWith, [3, 4, 5]>, [1, 2, 3, 4]>, false>,

  /**
   * Can check if a list ends with an empty value.
   */
  Test.Expect<$<$<List.EndsWith, []>, [1, 2, 3]>, true>
]

it('should return true if the list ends with the value', () => {
  expect(List.endsWith([3, 4, 5])([1, 2, 3, 4, 5])).toBe(true)
})

it('should return false if the list does not end with the value', () => {
  expect(List.endsWith([3, 4, 5])([1, 2, 3, 4])).toBe(false)
})

it('should return true if the list ends with an empty value', () => {
  expect(List.endsWith([])([1, 2, 3])).toBe(true)
})
