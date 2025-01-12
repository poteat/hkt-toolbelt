import { $, Test, List, Type } from '..'

type Max_Spec = [
  /**
   * Can find the maximum element of a list of numbers.
   */
  Test.Expect<$<List.Max, [1, 2, 3]>, 3>,

  /**
   * An empty list returns never.
   */
  Test.Expect<$<List.Max, []>, never>
]

it('should return the maximum element of a list of numbers', () => {
  expect(List.max([1, 2, 3])).toBe(3)
})

it('should return never if the list is empty', () => {
  expect(List.max([])).toBe(Type.never)
})
