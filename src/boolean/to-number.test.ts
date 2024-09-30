import { $, Boolean, Test } from '..'

type ToNumber_Spec = [
  /**
   * Can convert true to 1.
   */
  Test.Expect<$<Boolean.ToNumber, true>, 1>,

  /**
   * Can convert false to 0.
   */
  Test.Expect<$<Boolean.ToNumber, false>, 0>,

  /**
   * 'boolean' results in 0 | 1.
   */
  Test.Expect<$<Boolean.ToNumber, boolean>, 0 | 1>
]

it('should convert a boolean to a number', () => {
  expect(Boolean.toNumber(true)).toBe(1)
})
