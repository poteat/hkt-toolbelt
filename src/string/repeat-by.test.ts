import { $, String, Test } from '..'

type RepeatBy_Spec = [
  /**
   * Can repeat a string by a given number.
   */
  Test.Expect<$<$<String.RepeatBy, 3>, 'foo'>, 'foofoofoo'>,

  /**
   * Can repeat an empty string by a given number.
   */
  Test.Expect<$<$<String.RepeatBy, 3>, ''>, ''>,

  /**
   * Can repeat a string by zero, results in an empty string.
   */
  Test.Expect<$<$<String.RepeatBy, 0>, 'foo'>, ''>
]

it('should repeat a string by a given number', () => {
  expect(String.repeatBy(3)('foo')).toBe('foofoofoo')
})

it('should repeat an empty string by a given number', () => {
  expect(String.repeatBy(3)('')).toBe('')
})

it('should return an empty string if the number is zero', () => {
  expect(String.repeatBy(0)('foo')).toBe('')
})
