import { $, Test, String } from '..'

type PadStart_Spec = [
  /**
   * Can pad a string to a desired length.
   */
  Test.Expect<$<$<$<String.PadStart, 8>, '0'>, 'foo'>, '00000foo'>,

  /**
   * Padding a string longer than the specified length results in the original string.
   */
  Test.Expect<$<$<$<String.PadStart, 4>, '0'>, 'foobar'>, 'foobar'>
]

it('should pad a string to a desired length', () => {
  expect(String.padStart(8)('0')('foo')).toBe('00000foo')
})
