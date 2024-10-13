import { $, Test, List, Function, String } from '..'

type MinBy_Spec = [
  /**
   * Can find the minimum element of a list of numbers.
   */
  Test.Expect<$<$<List.MinBy, Function.Identity>, [1, 2, 3]>, 1>,

  /**
   * Can find the minimum element of a list of strings, based on length.
   */
  Test.Expect<$<$<List.MinBy, String.Length>, ['foo', 'bars', 'qu']>, 'qu'>
]

it('should return the element in the list that has the lowest score', () => {
  expect(List.minBy(String.length)(['foob', 'bar', 'qu'])).toBe('qu')
})

it('should handle identity functions', () => {
  expect(List.minBy(Function.identity)([1, 2, 3])).toBe(1)
})
