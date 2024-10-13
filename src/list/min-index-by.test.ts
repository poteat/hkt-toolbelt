import { $, Test, List, Function, String } from '..'

type MinIndexBy_Spec = [
  /**
   * Can find the index of the minimum element of a list of numbers.
   */
  Test.Expect<$<$<List.MinIndexBy, Function.Identity>, [1, 2, 3]>, 0>,

  /**
   * Can find the index of the minimum element of a list of strings, based on length.
   */
  Test.Expect<$<$<List.MinIndexBy, String.Length>, ['foo', 'bars', 'qu']>, 2>,

  /**
   * An empty list returns -1.
   */
  Test.Expect<$<$<List.MinIndexBy, Function.Identity>, []>, -1>
]

it('should return the index of the element in the list that has the lowest score', () => {
  expect(List.minIndexBy(String.length)(['foob', 'bar', 'qux'])).toBe(1)
})

it('should return the index of the element in the list that has the lowest score', () => {
  expect(List.minIndexBy(Function.identity)([1, 2, 3, 4])).toBe(0)
})

it('should return -1 if the list is empty', () => {
  expect(List.minIndexBy(Function.identity)([])).toBe(-1)
})
