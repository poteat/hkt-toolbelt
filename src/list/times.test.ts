import { $, Test, List } from '..'

type Times_Spec = [
  /**
   * Can create a tuple of length 0
   */
  Test.Expect<$<List.Times, 0>, []>,

  /**
   * N = 8
   */
  Test.Expect<$<List.Times, 8>, [0, 1, 2, 3, 4, 5, 6, 7]>,

  /**
   * N = 10
   */
  Test.Expect<$<List.Times, 10>, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]>,

  /**
   * Has 'never' for non-natural numbers.
   */
  Test.Expect<$<List.Times, -1>, never>
]

it('should return a list of numbers from 0 to N-1', () => {
  expect(List.times(8)).toEqual([0, 1, 2, 3, 4, 5, 6, 7])
})
