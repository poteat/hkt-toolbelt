import { $, String, Test } from '..'

type Unwords_Spec = [
  /**
   * Can join a list of strings with a space delimiter.
   */
  Test.Expect<$<String.Unwords, ['foo', 'bar', 'baz']>, 'foo bar baz'>,

  /**
   * An empty list results in an empty string.
   */
  Test.Expect<$<String.Unwords, []>, ''>
]

it('should join a list of strings with a space delimiter', () => {
  expect(String.unwords(['foo', 'bar', 'baz'])).toBe('foo bar baz')
})

it('should return an empty string if the list is empty', () => {
  expect(String.unwords([])).toBe('')
})
