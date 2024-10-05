import { $, Test, List, Function, String } from '..'

type MaxBy_Spec = [
  /**
   * Can find the maximum element of a list of numbers.
   */
  Test.Expect<$<$<List.MaxBy, Function.Identity>, [1, 2, 3]>, 3>,

  /**
   * Can find the maximum element of a list of strings, based on length.
   */
  Test.Expect<$<$<List.MaxBy, String.Length>, ['foo', 'bars', 'qux']>, 'bars'>,

  /**
   * Returns the first maximal element in the list.
   */
  Test.Expect<$<$<List.MaxBy, String.Length>, ['foob', 'bar', 'quxo']>, 'foob'>
]

it('should return the element in the list that has the highest score', () => {
  expect(List.maxBy(Function.identity)([1, 2, 3])).toBe(3)
})

it('should return the first maximal element in the list', () => {
  expect(List.maxBy(String.length)(['foob', 'bar', 'quxo'])).toBe('foob')
})
