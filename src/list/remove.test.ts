import { $, List, Test } from '..'

type Remove_Spec = [
  /**
   * Can remove elements from a tuple.
   */
  Test.Expect<$<$<List.Remove, 3>, [1, 2, 3, 4, 5]>, [1, 2, 4, 5]>,

  /**
   * Can remove elements from a tuple with duplicates.
   */
  Test.Expect<$<$<List.Remove, 2>, [1, 2, 3, 2, 4, 2]>, [1, 3, 4]>,

  /**
   * Can attempt to remove a non-existent element.
   */
  Test.Expect<$<$<List.Remove, 10>, [1, 2, 3, 4, 5]>, [1, 2, 3, 4, 5]>,

  /**
   * Can remove union types without affecting constituent types.
   */
  Test.Expect<
    $<$<List.Remove, 'foo' | 'bar'>, ['foo' | 'bar', 'bar', 'baz', 'foo']>,
    ['bar', 'baz', 'foo']
  >,

  /**
   * Can remove constituent types without affecting union types.
   */
  Test.Expect<
    $<$<List.Remove, 'foo'>, ['foo' | 'bar', 'bar', 'baz', 'foo']>,
    ['foo' | 'bar', 'bar', 'baz']
  >
]

it('should remove elements from a tuple', () => {
  expect(List.remove(3)([1, 2, 3, 4, 5])).toEqual([1, 2, 4, 5])
})

it('should remove elements from a tuple with duplicates', () => {
  expect(List.remove(2)([1, 2, 3, 2, 4, 2])).toEqual([1, 3, 4])
})

it('can attempt to remove a non-existent element', () => {
  expect(List.remove(10)([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
})
