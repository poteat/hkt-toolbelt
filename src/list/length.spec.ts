import { $, List, Test } from '..'

type Length_Spec = [
  /**
   * Can get the length of a tuple.
   */
  Test.Expect<$<List.Length, [1, 2, 3]>, 3>,

  /**
   * The length of an empty tuple is 0.
   */
  Test.Expect<$<List.Length, []>, 0>,

  /**
   * The length of a tuple of indeterminate length is the underlying type.
   */
  Test.Expect<$<List.Length, number[]>, number>,

  /**
   * When the last element of a tuple is variadic, the length is `number`.
   */
  Test.Expect<$<List.Length, [string, ...number[]]>, number>,

  /**
   * The length of a one-tuple is 1.
   */
  Test.Expect<$<List.Length, [string]>, 1>
]

it('should return the length of a list', () => {
  expect(List.length([1, 2, 3])).toBe(3)
})
