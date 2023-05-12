import { Test, $, Parser2 } from '../..'

type MyParser = $<Parser2.Run, Parser2.JSON.String>

type String_Spec = [
  /**
   * Can parse a simple string.
   */
  Test.Expect<$<MyParser, '"foobar"'>, 'foobar'>,

  /**
   * Can parse strings with escaped double quotes.
   */
  Test.Expect<$<MyParser, '"foo\\"bar"'>, 'foo"bar'>,

  /**
   * Does not consume leading whitespace.
   */
  Test.Expect<$<MyParser, ' "foobar"'>, never>,

  /**
   * Doesn't match when there are no quotes.
   */
  Test.Expect<$<MyParser, 'foobar'>, never>
]
