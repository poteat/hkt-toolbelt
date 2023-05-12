import { Test, $, Parser2 } from '../..'

type MyParser = $<Parser2.Run, Parser2.JSON.JSON>

type JSON_Spec = [
  /**
   * Can parse true.
   */
  Test.Expect<$<MyParser, 'true'>, true>,

  /**
   * Can parse null.
   */
  Test.Expect<$<MyParser, 'null'>, null>,

  /**
   * Can parse strings.
   */
  Test.Expect<$<MyParser, '"foo\\"bar"'>, 'foo"bar'>,

  /**
   * Can parse arrays.
   */
  Test.Expect<$<MyParser, '[]'>, []>,

  /**
   * Can parse nested arrays.
   */
  Test.Expect<$<MyParser, '[[]]'>, [[]]>,

  /**
   * Can parse arrays of arrays of strings.
   */
  Test.Expect<$<MyParser, '[["foo", "bar"]]'>, [['foo', 'bar']]>,

  /**
   * Robust to whitespace.
   */
  Test.Expect<$<MyParser, ' [ "foo" , "bar" ] '>, ['foo', 'bar']>,

  /**
   * Robust to whitespace for objects.
   */
  Test.Expect<$<MyParser, ' { "foo" : "bar" } '>, { foo: 'bar' }>,

  /**
   * Can parse nested objects.
   */
  Test.Expect<$<MyParser, '{"foo": {"bar": "baz"}}'>, { foo: { bar: 'baz' } }>
]
