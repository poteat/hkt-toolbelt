import { $, String, Test } from '..'

type StartsWith_Spec = [
  /**
   * Prefixes should match correctly.
   */
  Test.Expect<$<$<String.StartsWith, 'foo'>, 'foobar'>>,

  /**
   * Two different strings should result in false.
   */
  Test.ExpectNot<$<$<String.StartsWith, 'bar'>, 'foobar'>>,

  /**
   * Non-empty strings start with "".
   */
  Test.Expect<$<$<String.StartsWith, ''>, 'foobar'>>,

  /**
   * "" starts with "".
   */
  Test.Expect<$<$<String.StartsWith, ''>, ''>>,

  /**
   * "" does not start with non-empty strings.
   */
  Test.ExpectNot<$<$<String.StartsWith, 'foo'>, ''>>,

  /**
   * Every string starts with a string.
   */
  Test.Expect<$<$<String.StartsWith, string>, 'foobar'>>,

  /**
   * "" starts with a string.
   */
  Test.Expect<$<$<String.StartsWith, string>, ''>>,

  /**
   * Non-empty strings do not start with 'string'.
   */
  Test.ExpectNot<$<$<String.StartsWith, 'foobar'>, string>>,

  /**
   * Every string starts with "".
   */
  Test.Expect<$<$<String.StartsWith, ''>, string>>
]

it('should return true if the string starts with the prefix', () => {
  expect(String.startsWith('foo')('foobar')).toBe(true)
})

it('should return false if the string does not start with the prefix', () => {
  expect(String.startsWith('bar')('foobar')).toBe(false)
})

it('should return true if the string starts with an empty prefix', () => {
  expect(String.startsWith('')('foobar')).toBe(true)
})
