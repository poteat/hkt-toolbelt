import { $, Test, String } from '..'

type CompareChar_Spec = [
  /**
   * Can compare two characters.
   */
  Test.Expect<$<$<String.CompareChar, 'a'>, 'b'>, -1>,
  Test.Expect<$<$<String.CompareChar, 'b'>, 'a'>, 1>,
  Test.Expect<$<$<String.CompareChar, 'a'>, 'a'>, 0>,

  /**
   * Numbers come before letters.
   */
  Test.Expect<$<$<String.CompareChar, '1'>, 'a'>, -1>
]

it('should compare two characters', () => {
  expect(String.compareChar('a')('b')).toBe(-1)
  expect(String.compareChar('b')('a')).toBe(1)
  expect(String.compareChar('a')('a')).toBe(0)
})
