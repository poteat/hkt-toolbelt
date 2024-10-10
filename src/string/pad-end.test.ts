import { $, Test, String } from '..'

type PadEnd_Spec = [
  /**
   * Can pad a string to a desired length.
   */
  Test.Expect<$<$<$<String.PadEnd, 8>, '0'>, 'foo'>, 'foo00000'>,

  /**
   * Padding a string longer than the specified length results in the original string.
   */
  Test.Expect<$<$<$<String.PadEnd, 4>, '0'>, 'foobar'>, 'foobar'>
]

it('should pad a string to a desired length', () => {
  expect(String.padEnd(8)('0')('foo')).toBe('foo00000')
})

it('padding a string longer than the specified length results in the original string', () => {
  expect(String.padEnd(4)('0')('foobar')).toBe('foobar')
})
