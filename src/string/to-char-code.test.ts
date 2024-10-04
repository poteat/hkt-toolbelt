import { $, String, Test } from '..'

type ToCharCode_Spec = [
  /**
   * Can get the character code of a string.
   */
  Test.Expect<$<String.ToCharCode, 'f'>, 102>,

  /**
   * Can get the character code of a space.
   */
  Test.Expect<$<String.ToCharCode, ' '>, 32>,

  /**
   * An empty string results in never.
   */
  Test.Expect<$<String.ToCharCode, ''>, never>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.ToCharCode, number>,

  /**
   * Non-ASCII characters result in never
   */
  Test.Expect<$<String.ToCharCode, '😀'>, never>
]

it('should return the character code of a string', () => {
  expect(String.toCharCode('f')).toBe(102)
})
