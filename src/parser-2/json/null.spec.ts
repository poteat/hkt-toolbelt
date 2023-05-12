import { Test, $, Parser2 } from '../..'

type MyParser = $<Parser2.Run, Parser2.JSON.Null>

type Null_Spec = [
  /**
   * Can parse null.
   */
  Test.Expect<$<MyParser, 'null'>, null>,

  /**
   * Anything else doesn't match.
   */
  Test.Expect<$<MyParser, 'foobar'>, never>
]
