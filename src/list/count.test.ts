import { $, Test, List } from '..'

type Count_Spec = [
  /**
   * Can count the number of occurrences of each key in a list.
   */
  Test.Expect<
    $<List.Count, ['foo', 'foo', 'bar']>,
    {
      foo: 2
      bar: 1
    }
  >,

  /**
   * Can count the number of occurrences of each key in a list.
   */
  Test.Expect<
    $<List.Count, ['foo', 'foo', 'bar', 'baz']>,
    {
      foo: 2
      bar: 1
      baz: 1
    }
  >,

  /**
   * Counting an empty list results in an empty map.
   */
  Test.Expect<$<List.Count, []>, {}>,

  /**
   * Counting a list with a single element results in a map with one entry.
   */
  Test.Expect<$<List.Count, ['foo']>, { foo: 1 }>,

  /**
   * Counting a list of non-property keys results in a type error.
   */
  // @ts-expect-error
  Test.Expect<$<List.Count, ['foo', { foo: 'foo' }]>>
]

it('should count the number of occurrences of each key in a list', () => {
  expect(List.count(['foo', 'foo', 'bar'])).toEqual({
    foo: 2,
    bar: 1
  })
})

it('should count the number of occurrences of each key in a list', () => {
  expect(List.count(['foo', 'foo', 'bar', 'baz'])).toEqual({
    foo: 2,
    bar: 1,
    baz: 1
  })
})

it('should count an empty list as an empty map', () => {
  expect(List.count([])).toEqual({})
})

it('should count a list with a single element as a map with one entry', () => {
  expect(List.count(['foo'])).toEqual({ foo: 1 })
})
