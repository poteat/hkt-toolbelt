import { $, Test, List, String, Function } from '..'

type Sort_Spec = [
  /**
   * Can sort a list of numbers.
   */
  Test.Expect<
    $<$<List.Sort, Function.Identity>, [5, 4, 6, 3, 7, 2, 8, 1, 9, 10]>,
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  >,

  /**
   * Can sort a list of strings by length.
   */
  Test.Expect<
    $<$<List.Sort, String.Length>, ['foo', 'bar', 'baz', 'x', 'qux', 'quux']>,
    ['x', 'foo', 'bar', 'baz', 'qux', 'quux']
  >,

  /**
   * Can sort an empty list.
   */
  Test.Expect<$<$<List.Sort, Function.Identity>, []>, []>
]

it('should sort a list of numbers', () => {
  expect(List.sort(Function.identity)([5, 4, 6, 3, 7, 2, 8, 1, 9, 10])).toEqual(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  )
})

it('should sort a list of strings by length', () => {
  expect(
    List.sort(String.length)(['foo', 'bar', 'baz', 'x', 'qux', 'quux'])
  ).toEqual(['x', 'foo', 'bar', 'baz', 'qux', 'quux'])
})

it('should sort an empty list', () => {
  expect(List.sort(Function.identity)([])).toEqual([])
})
