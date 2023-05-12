import { Test, $, Parser2 } from '../..'

type MyParser = $<Parser2.Run, Parser2.JSON.Boolean>

type Boolean_Spec = [
  /**
   * Can parse true.
   */
  Test.Expect<$<MyParser, 'true'>, true>,

  /**
   * Can parse false.
   */
  Test.Expect<$<MyParser, 'false'>, false>,

  /**
   * Anything else doesn't match.
   */
  Test.Expect<$<MyParser, 'foobar'>, never>
]
