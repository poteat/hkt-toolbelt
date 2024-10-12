import { $, List, Test } from '..'

type IndexOfSequence_Spec = [
  /**
   * Can find the index of a sequence of numbers present in a tuple.
   */
  Test.Expect<$<$<List.IndexOfSequence, [1, 2, 3]>, [1, 2, 3, 4, 5]>, 0>,

  /**
   * Can determine if a sequence of numbers is not present in a tuple.
   */
  Test.Expect<$<$<List.IndexOfSequence, [1, 2, 3]>, [4, 5, 6]>, -1>,

  /**
   * Can find the index of a sequence of numbers present in a tuple.
   */
  Test.Expect<$<$<List.IndexOfSequence, [2, 3]>, [1, 2, 3, 4, 5]>, 1>,

  /**
   * Can find sequence at the end of a tuple.
   */
  Test.Expect<$<$<List.IndexOfSequence, [4, 5]>, [1, 2, 3, 4, 5]>, 3>
]

it('should return the index of the first element in the list that is equal to the value', () => {
  expect(List.indexOfSequence([1, 2, 3])([1, 2, 3, 4, 5])).toBe(0)
})

it('should return -1 if no element is equal to the value', () => {
  expect(List.indexOfSequence([1, 2, 3])([4, 5, 6])).toBe(-1)
})

it('can find the index of a number present in a tuple', () => {
  expect(List.indexOfSequence([2, 3])([1, 2, 3, 4, 5])).toBe(1)
})

it('can find sequence at the end of a tuple', () => {
  expect(List.indexOfSequence([4, 5])([1, 2, 3, 4, 5])).toBe(3)
})
