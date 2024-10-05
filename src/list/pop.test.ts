import { $, List, Test } from '..'

type Pop_Spec = [
  /**
   * Can pop the last element of a list.
   */
  Test.Expect<$<List.Pop, ['a', 'b', 'c']>, ['a', 'b']>,

  /**
   * Popping an empty list results in never.
   */
  Test.Expect<$<List.Pop, []>, never>,

  /**
   * Popping a list with a single element results in an empty list.
   */
  Test.Expect<$<List.Pop, ['a']>, []>,

  /**
   * Popping a list with a single element results in an empty list.
   */
  Test.Expect<$<List.Pop, [1, 2, 3]>, [1, 2]>
]

it('should remove the last element from the list', () => {
  expect(List.pop(['a', 'b', 'c'])).toEqual(['a', 'b'])
})
