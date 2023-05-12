import { Test, $, Parser2 } from '../..'

type MyParser = $<
  Parser2.Run,
  $<Parser2.Utility.CommaSeparated, $<Parser2.Literal, 'foobar'>>
>

type CommaSeparated_Spec = [
  /**
   * Can parse a comma-separated list of strings.
   */
  Test.Expect<$<MyParser, 'foobar, foobar'>, ['foobar', 'foobar']>,

  /**
   * It's fine if there's no matched elements.
   */
  Test.Expect<$<MyParser, 'barfoo'>, []>,

  /**
   * Also fine if there's only one element.
   */
  Test.Expect<$<MyParser, 'foobar'>, ['foobar']>,

  /**
   * We should be robust to whitespace.
   */
  Test.Expect<$<MyParser, 'foobar , foobar  '>, ['foobar', 'foobar']>,

  /**
   * Leading whitespace doesn't match.
   */
  // @ts-expect-error
  Test.Expect<$<MyParser, '  foobar , foobar  '>, ['foobar', 'foobar']>
]
