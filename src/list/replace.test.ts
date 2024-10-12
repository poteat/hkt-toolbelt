import { $, List, Test } from '..'

type Replace_Spec = [
  /**
   * Can replace a value in a list.
   */
  Test.Expect<$<$<$<List.Replace, 1>, 2>, [1, 2, 3]>, [2, 2, 3]>,

  /**
   * Can replace multiple values in a list.
   */
  Test.Expect<$<$<$<List.Replace, 1>, 2>, [1, 1, 2, 3, 4]>, [2, 2, 2, 3, 4]>,

  /**
   * Can replace a value in a list with the same value.
   */
  Test.Expect<$<$<$<List.Replace, 1>, 1>, [1, 2, 3]>, [1, 2, 3]>,

  /**
   * Will act as an identity function for non-matching values.
   */
  Test.Expect<$<$<$<List.Replace, 42>, 42>, [1, 2, 3]>, [1, 2, 3]>
]

it('should replace a value in a list', () => {
  expect(List.replace(1)(2)([1, 2, 3])).toEqual([2, 2, 3])
})

it('should replace multiple values in a list', () => {
  expect(List.replace(1)(2)([1, 1, 2, 3, 4])).toEqual([2, 2, 2, 3, 4])
})

it('should replace a value in a list with the same value', () => {
  expect(List.replace(1)(1)([1, 2, 3])).toEqual([1, 2, 3])
})

it('will act as an identity function for non-matching values', () => {
  expect(List.replace(42)(42)([1, 2, 3])).toEqual([1, 2, 3])
})
