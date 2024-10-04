import { $, Boolean, Test } from '..'

type And_Spec = [
  /**
   * True && True = True
   */
  Test.Expect<$<$<Boolean.And, true>, true>>,

  /**
   * True && False = False
   */
  Test.ExpectNot<$<$<Boolean.And, true>, false>>,

  /**
   * False && True = False
   */
  Test.ExpectNot<$<$<Boolean.And, false>, true>>,

  /**
   * False && False = False
   */
  Test.ExpectNot<$<$<Boolean.And, false>, false>>,

  /**
   * Running 'And' on a non-boolean type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<Boolean.And<true>, number>>
]

it('should return true if both inputs are true', () => {
  expect(Boolean.and(true)(true)).toBe(true)
})

it('should return false if one input is false', () => {
  expect(Boolean.and(true)(false)).toBe(false)
})
