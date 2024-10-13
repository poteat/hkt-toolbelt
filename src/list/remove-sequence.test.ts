import { $, List, Test } from '..'

type RemoveSequence_Spec = [
  /**
   * Can remove a sequence of numbers from a tuple.
   */
  Test.Expect<$<$<List.RemoveSequence, [1, 2, 3]>, [1, 2, 3, 4, 5]>, [4, 5]>,

  /**
   * If the sequence is not present, the list is returned unchanged.
   */
  Test.Expect<$<$<List.RemoveSequence, [1, 2, 3]>, [4, 5, 6]>, [4, 5, 6]>,

  /**
   * Removes all instances of the sequence.
   */
  Test.Expect<$<$<List.RemoveSequence, [1, 2, 3]>, [1, 2, 3, 1, 2, 3]>, []>
]

it('should remove a sequence of numbers from a tuple', () => {
  expect(List.removeSequence([1, 2, 3])([1, 2, 3, 4, 5])).toEqual([4, 5])
})

it('if the sequence is not present, the list is returned unchanged', () => {
  expect(List.removeSequence([1, 2, 3])([4, 5, 6])).toEqual([4, 5, 6])
})

it('removes all instances of the sequence', () => {
  expect(List.removeSequence([1, 2, 3])([1, 2, 3, 1, 2, 3])).toEqual([])
})
