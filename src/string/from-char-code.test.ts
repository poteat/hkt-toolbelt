import { $, String, Test } from '..'

type FromCharCode_Spec = [
  /**
   * Can get the character of a character code.
   */
  Test.Expect<$<String.FromCharCode, 102>, 'f'>,

  /**
   * Can get the character of a space.
   */
  Test.Expect<$<String.FromCharCode, 32>, ' '>,

  /**
   * An empty string results in never.
   */
  Test.Expect<$<String.FromCharCode, 0>, never>,

  /**
   * Non-number input results in a compiler error.
   */
  // @ts-expect-error
  $<String.FromCharCode, string>,

  /**
   * Non-ASCII characters result in never
   */
  Test.Expect<$<String.FromCharCode, 12345>, never>
]

it('should return the character of a character code', () => {
  expect(String.fromCharCode(102)).toBe('f')
})
