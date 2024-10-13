import { $, List, Test } from '..'

type RemoveIndex_Spec = [
  /**
   * Can remove an element from a list.
   */
  Test.Expect<$<$<List.RemoveIndex, 1>, [1, 2, 3]>, [1, 3]>,

  /**
   * Can remove an element from the end of a list.
   */
  Test.Expect<$<$<List.RemoveIndex, 2>, [1, 2, 3]>, [1, 2]>,

  /**
   * Can remove an element from the beginning of a list.
   */
  Test.Expect<$<$<List.RemoveIndex, 0>, [1, 2, 3]>, [2, 3]>,

  /**
   * Removing an empty index results in the original list.
   */
  Test.Expect<$<$<List.RemoveIndex, -1>, [1, 2, 3]>, [1, 2, 3]>
]

it('should remove an element from a list', () => {
  expect(List.removeIndex(1)([1, 2, 3])).toEqual([1, 3])
})

it('should remove an element from the end of a list', () => {
  expect(List.removeIndex(2)([1, 2, 3])).toEqual([1, 2])
})

it('should remove an element from the beginning of a list', () => {
  expect(List.removeIndex(0)([1, 2, 3])).toEqual([2, 3])
})

it('removing an empty index results in the original list', () => {
  expect(List.removeIndex(-1)([1, 2, 3])).toEqual([1, 2, 3])
})
