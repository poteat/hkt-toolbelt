import { Test, $, Parser2 } from '../..'

type MyParser = $<Parser2.Run, Parser2.JSON.JSON>

type JSON_Spec = [
  /**
   * Can parse up to seven nested arrays.
   */
  Test.Expect<$<MyParser, `[[[[[[[]]]]]]]`>, [[[[[[[]]]]]]]>,

  /**
   * Can parse up to five nested objects.
   */
  Test.Expect<
    $<
      MyParser,
      `
{
  "a": {
    "b": {
      "c": {
        "d": {
        }
      }
    }
  }
}`
    >,
    {
      a: {
        b: {
          c: {
            d: {}
          }
        }
      }
    }
  >,

  /**
   * Can parse somewhat complicated realistic object.
   */
  Test.Expect<
    $<
      MyParser,
      `
{
  "a": "b", 
  "b": false, 
  "c": [true, false, "hello", {
    "a": "b", 
    "b": false
  }], 
  "nil": null
}
`
    >,
    {
      a: 'b'
      b: false
      c: [
        true,
        false,
        'hello',
        {
          a: 'b'
          b: false
        }
      ]
      nil: null
    }
  >,

  /**
   * Can parse long arrays.
   */
  Test.Expect<
    $<
      MyParser,
      '["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]'
    >,
    [
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x'
    ]
  >
]
