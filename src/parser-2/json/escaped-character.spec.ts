import { Test, $, Parser2 } from '../..'

type MyParser = $<Parser2.Run, Parser2.JSON.EscapedCharacter>

type EscapedCharacters_Spec = [
  /**
   * Can parse escaped newlines.
   */
  Test.Expect<$<MyParser, '\\n'>, '\n'>,

  /**
   * Can parse escaped backslahes.
   */
  Test.Expect<$<MyParser, '\\\\'>, '\\'>,

  /**
   * Can parse escaped double quotes.
   */
  Test.Expect<$<MyParser, '\\"'>, '"'>,

  /**
   * Anything else doesn't match.
   */
  Test.Expect<$<MyParser, 'foobar'>, never>
]
