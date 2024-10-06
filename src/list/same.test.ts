import { $, Test, List } from '..'

type Same_Spec = [
  /**
   * Can check if a list of values is all equal.
   */
  Test.Expect<$<List.Same, [1, 1, 1]>, true>,

  /**
   * Can check if a list of values is not all equal.
   */
  Test.Expect<$<List.Same, [1, 2, 3, 4]>, false>,

  /**
   * Can check if an empty list is all equal.
   */
  Test.Expect<$<List.Same, []>, true>,

  /**
   * Can check if a list of one value is all equal.
   */
  Test.Expect<$<List.Same, [1]>, true>
]

it('should return true if a list of values is all equal', () => {
  expect(List.same([1, 1, 1])).toBe(true)
})

it('should return false if a list of values is not all equal', () => {
  expect(List.same([1, 2, 3, 4])).toBe(false)
})

it('should return true if an empty list is all equal', () => {
  expect(List.same([])).toBe(true)
})

it('should return true if a list of one value is all equal', () => {
  expect(List.same([1])).toBe(true)
})

it('should return false if two elements are not equal', () => {
  expect(List.same([0, 1])).toBe(false)
})
