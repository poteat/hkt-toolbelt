import { $, List, Test } from '..'

type StartsWith_Spec = [
  /**
   * Can check if a list starts with a value.
   */
  Test.Expect<$<$<List.StartsWith, [1, 2, 3]>, [1, 2, 3, 4, 5]>, true>,

  /**
   * Can check if a list does not start with a value.
   */
  Test.Expect<$<$<List.StartsWith, [1, 2, 3]>, [4, 5, 6]>, false>,

  /**
   * Can check if a list starts with an empty value.
   */
  Test.Expect<$<$<List.StartsWith, []>, [1, 2, 3]>, true>
]

it('should return true if the list starts with the value', () => {
  expect(List.startsWith([1, 2, 3])([1, 2, 3, 4, 5])).toBe(true)
})

it('should return false if the list does not start with the value', () => {
  expect(List.startsWith([1, 2, 3])([4, 5, 6])).toBe(false)
})

it('should return true if the list starts with an empty value', () => {
  expect(List.startsWith([])([1, 2, 3])).toBe(true)
})
