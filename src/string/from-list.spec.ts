import { $, Test, String } from '..'

type FromList_Spec = [
  /**
   * [a, b, c] => abc
   */
  Test.Expect<$<String.FromList, ['a', 'b', 'c']>, 'abc'>,

  /**
   * [] => ""
   */
  Test.Expect<$<String.FromList, []>, ''>,

  /**
   * "foo", "bar" => foobar
   */
  Test.Expect<$<String.FromList, ['foo', 'bar']>, 'foobar'>
]

it('should convert a list of strings to a single string', () => {
  expect(String.fromList(['foo', 'bar'])).toBe('foobar')
})

it('should convert a list of strings to a single string', () => {
  expect(String.fromList(['foo', 'bar', 'baz'])).toBe('foobarbaz')
})

it('can convert an empty list', () => {
  expect(String.fromList([])).toBe('')
})
