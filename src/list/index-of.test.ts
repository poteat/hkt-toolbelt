import { $, List, Test } from '..'

type IndexOf_Spec = [
  /**
   * Can find the index of a number present in a tuple.
   */
  Test.Expect<$<$<List.IndexOf, 3>, [1, 2, 3]>, 2>,

  /**
   * Can find the index of a number present in a tuple.
   */
  Test.Expect<$<$<List.IndexOf, 42>, [42, 'bar']>, 0>,

  /**
   * Can find the index of an element in a tuple.
   */
  Test.Expect<$<$<List.IndexOf, 'foo'>, ['foo', 'bar']>, 0>,

  /**
   * Returns -1 if no element is equal to the value.
   */
  Test.Expect<$<$<List.IndexOf, 'qux'>, ['foo', 'bar']>, -1>
]

it('should return the index of the first element in the list that is equal to the value', () => {
  expect(List.indexOf('foo')(['foo', 'bar'])).toBe(0)
})

it('should return -1 if no element is equal to the value', () => {
  expect(List.indexOf('qux')(['foo', 'bar'])).toBe(-1)
})

it('can find the index of a number present in a tuple', () => {
  expect(List.indexOf(3)([1, 2, 3])).toBe(2)
})
