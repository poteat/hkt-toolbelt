import { $, Boolean, Test } from '..'

type Not_Spec = [
  /**
   * !True = False
   */
  Test.Expect<$<Boolean.Not, false>>,

  /**
   * !False = True
   */
  Test.ExpectNot<$<Boolean.Not, true>>,

  /**
   * Running 'Not' on a non-boolean type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<Boolean.Not, number>>
]

it('should return the opposite boolean', () => {
  expect(Boolean.not(true)).toBe(false)
})

it('should return the opposite boolean', () => {
  expect(Boolean.not(false)).toBe(true)
})
