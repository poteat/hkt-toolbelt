import { $, Conditional, Function, List, String, Test } from '..'

type FindIndex_Spec = [
  /**
   * Can find the index of a number present in a tuple.
   */
  Test.Expect<$<$<List.FindIndex, $<Conditional.Equals, 3>>, [1, 2, 3]>, 2>,

  /**
   * Can find the index of a string present in a tuple.
   */
  Test.Expect<$<$<List.FindIndex, String.IsString>, [42, 'bar']>, 1>,

  /**
   * Can find the index of an element in a tuple.
   */
  Test.Expect<
    $<$<List.FindIndex, $<Conditional.Equals, 'foo'>>, ['foo', 'bar']>,
    0
  >,

  /**
   * Returns -1 if no element satisfies the predicate.
   */
  Test.Expect<$<$<List.FindIndex, $<Conditional.Equals, 42>>, [1, 2, 3]>, -1>
]

it('should return the index of the first element in the list that satisfies the predicate', () => {
  expect(List.findIndex(Conditional.equals('bar'))(['foo', 'bar', 'bar'])).toBe(
    1
  )
})

it('should return -1 if no element satisfies the predicate', () => {
  expect(List.findIndex(String.isString)([42])).toBe(-1)
})

it('can find the index of a number present in a tuple', () => {
  expect(List.findIndex(Function.constant(true))([1, 2, 3])).toBe(0)
})

it('can find the index of a string present in a tuple', () => {
  expect(List.findIndex(String.isString)(['foo', 'bar'])).toBe(0)
})
