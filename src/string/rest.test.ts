import { $, String, Test } from '..'

type Rest_Spec = [
  /**
   * Can remove the first character from a string.
   */
  Test.Expect<$<String.Rest, 'foo'>, 'oo'>,

  /**
   * Can remove the first character from an empty string.
   */
  Test.Expect<$<String.Rest, ''>, ''>,

  /**
   * Can remove the first character from a string.
   */
  Test.Expect<$<String.Rest, `foo${string}`>, `oo${string}`>
]

it('should return the string with the first character removed', () => {
  expect(String.rest('foo')).toBe('oo')
})

it('should return an empty string if the string is empty', () => {
  expect(String.rest('')).toBe('')
})
