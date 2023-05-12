import { Test, $, Parser2 } from '../..'

type MyParser = $<Parser2.Run, $<Parser2.JSON.Array, Parser2.JSON.JSON>>

type Array_Spec = [
  /**
   * Can parse arrays of strings
   */
  Test.Expect<$<MyParser, '["foo", "bar"]'>, ['foo', 'bar']>,

  /**
   * Can parse various items.
   */
  Test.Expect<
    $<MyParser, '["foo", null, false, "false"]'>,
    ['foo', null, false, 'false']
  >,

  /**
   * Empty arrays are allowed.
   */
  Test.Expect<$<MyParser, '[]'>, []>,

  /**
   * Anything else doesn't match.
   */
  Test.Expect<$<MyParser, 'foobar'>, never>,

  /**
   * Robust against whitespace.
   */
  Test.Expect<$<MyParser, '[ "foo" , "bar" ]'>, ['foo', 'bar']>
]
