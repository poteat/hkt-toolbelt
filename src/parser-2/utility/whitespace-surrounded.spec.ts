import { Test, $, Parser2 } from '../..'

type MyParser = $<
  Parser2.Run,
  $<Parser2.Utility.WhitespaceSurrounded, $<Parser2.Literal, 'foobar'>>
>

type WhitespaceSurrounded_Spec = [
  /**
   * Can parse a string surrounded by optional whitespace.
   */
  Test.Expect<$<MyParser, '  foobar  '>, 'foobar'>,

  /**
   * It's fine if there's no whitespace.
   */
  Test.Expect<$<MyParser, 'foobar'>, 'foobar'>,

  /**
   * If it doesn't match, it fails.
   */
  Test.Expect<$<MyParser, 'foo bar'>, never>
]
