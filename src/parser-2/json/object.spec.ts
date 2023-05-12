import { Test, $, Parser2 } from '../..'

type MyParser = $<Parser2.Run, $<Parser2.JSON.Object, Parser2.JSON.JSON>>

type JSON_Spec = [
  /**
   * Can parse simple object.
   */
  Test.Expect<$<MyParser, '{"foo": "bar"}'>, { foo: 'bar' }>,

  /**
   * Can parse objects with array values.
   */
  Test.Expect<$<MyParser, '{"foo": ["foo", "bar"]}'>, { foo: ['foo', 'bar'] }>
]
