import { $, String, Test } from '..'

type Entries_Spec = [
  /**
   * Can get the entries of a string.
   */
  Test.Expect<$<String.Entries, 'foo'>, [[0, 'f'], [1, 'o'], [2, 'o']]>,

  /**
   * Can get the entries of an empty string.
   */
  Test.Expect<$<String.Entries, ''>, []>,

  /**
   * Can get the entries of a string with a single character.
   */
  Test.Expect<$<String.Entries, 'a'>, [[0, 'a']]>
]

it('should return the entries of a string', () => {
  expect(String.entries('foo')).toEqual([
    [0, 'f'],
    [1, 'o'],
    [2, 'o']
  ])
})
