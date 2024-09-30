import { $, List, Test } from '..'

type Shift_Spec = [
  /**
   * Can shift the first element of a list.
   */
  Test.Expect<$<List.Shift, ['a', 'b', 'c']>, ['b', 'c']>,

  /**
   * Shifting an empty list results in never.
   */
  Test.Expect<$<List.Shift, []>, never>
]

it('should remove the first element from the list', () => {
  expect(List.shift(['a', 'b', 'c'])).toEqual(['b', 'c'])
})
