import { Test, $, Parser2 } from '../..'

type MyParser = $<Parser2.Run, $<Parser2.JSON.KeyValuePair, Parser2.JSON.JSON>>

type JSON_Spec = [
  /**
   * Can parse "foo": "bar".
   */
  Test.Expect<$<MyParser, '"foo": "bar"'>, ['foo', 'bar']>,

  /**
   * Robust against whitespace.
   */
  Test.Expect<$<MyParser, ' "foo" : "bar" '>, ['foo', 'bar']>,

  /**
   * Can parse arrays as values.
   */
  Test.Expect<$<MyParser, '"foo": []'>, ['foo', []]>
]
