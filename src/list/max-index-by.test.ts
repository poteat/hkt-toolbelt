import { $, Test, List, Function, String } from '..'

type MaxIndexBy_Spec = [
  /**
   * Can find the index of the maximum element of a list of numbers.
   */
  Test.Expect<$<$<List.MaxIndexBy, Function.Identity>, [1, 2, 3]>, 2>,

  /**
   * Can find the index of the maximum element of a list of strings, based on length.
   */
  Test.Expect<$<$<List.MaxIndexBy, String.Length>, ['foo', 'bars', 'qu']>, 1>,

  /**
   * An empty list returns -1.
   */
  Test.Expect<$<$<List.MaxIndexBy, Function.Identity>, []>, -1>
]

it('should return the index of the element in the list that has the highest score', () => {
  expect(List.maxIndexBy(String.length)(['foob', 'bar', 'qux'])).toBe(0)
})

it('should return the index of the element in the list that has the highest score', () => {
  expect(List.maxIndexBy(Function.identity)([1, 2, 3, 4])).toBe(3)
})

it('should return -1 if the list is empty', () => {
  expect(List.maxIndexBy(Function.identity)([])).toBe(-1)
})
