import { $, String, Test } from '..';

type EndsWith_Spec = [
  /**
   * Suffixes should match correctly.
   */
  Test.Expect<$<$<String.EndsWith, 'bar'>, 'foobar'>>,

  /**
   * Two different strings should result in false.
   */
  Test.ExpectNot<$<$<String.EndsWith, 'foo'>, 'foobar'>>,

  /**
   * Non-empty strings end with "".
   */
  Test.Expect<$<$<String.EndsWith, ''>, 'foobar'>>,

  /**
   * "" end with "".
   */
  Test.Expect<$<$<String.EndsWith, ''>, ''>>,

  /**
   * "" does not end with non-empty strings.
   */
  Test.ExpectNot<$<$<String.EndsWith, 'foo'>, ''>>,

  /**
   * Every string ends with a string.
   */
  Test.Expect<$<$<String.EndsWith, string>, 'foobar'>>,

  /**
   * "" ends with a string.
   */
  Test.Expect<$<$<String.EndsWith, string>, ''>>,

  /**
   * Non-empty strings do not end with 'string'.
   */
  Test.ExpectNot<$<$<String.EndsWith, 'foobar'>, string>>,

  /**
   * Every string ends with "".
   */
  Test.Expect<$<$<String.EndsWith, ''>, string>>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  Test.Expect<$<String.EndsWith<''>, number>>
];
