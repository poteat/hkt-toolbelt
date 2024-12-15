import { $, Test, String } from '..'

type Compare_Spec = [
  /**
   * Can compare two strings.
   */
  Test.Expect<$<$<String.Compare, 'foo'>, 'bar'>, 1>,
  Test.Expect<$<$<String.Compare, 'bar'>, 'foo'>, -1>,
  Test.Expect<$<$<String.Compare, 'foo'>, 'foo'>, 0>,

  /**
   * Shorter is earlier.
   */
  Test.Expect<$<$<String.Compare, 'foo'>, 'foobar'>, -1>,

  /**
   * Longer is later.
   */
  Test.Expect<$<$<String.Compare, 'foobar'>, 'foo'>, 1>
]

it('should compare two strings', () => {
  expect(String.compare('foo')('bar')).toBe(1)
  expect(String.compare('bar')('foo')).toBe(-1)
  expect(String.compare('foo')('foo')).toBe(0)
})

it('should compare two strings of different lengths', () => {
  expect(String.compare('foo')('foobar')).toBe(-1)
  expect(String.compare('foobar')('foo')).toBe(1)
})
