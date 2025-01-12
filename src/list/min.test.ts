import { $, Test, List, Type } from '..'

type Min_Spec = [
  /**
   * Can find the minimum element of a list of numbers.
   */
  Test.Expect<$<List.Min, [1, 2, 3]>, 1>,

  /**
   * An empty list returns never.
   */
  Test.Expect<$<List.Min, []>, never>
]

it('should return the minimum element of a list of numbers', () => {
  expect(List.min([1, 2, 3])).toBe(1)
})

it('should return never if the list is empty', () => {
  expect(List.min([])).toBe(Type.never)
})
