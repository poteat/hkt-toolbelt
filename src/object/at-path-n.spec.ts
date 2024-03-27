import { $, Test, Object } from '..'

/**
 * Tests for `Object.AtPath`, which returns the value at a given path in an
 * object. The path is specified as a tuple of keys.
 */
type AtPath_NSpec = [
  /**
   * Can get the value at a key and path.
   */
  Test.Expect<
    $<
      $<Object.AtPathN, ['age', ['name', 'first']]>,
      {
        name: {
          first: 'foo'
          last: string
        }
        age: 30
      }
    >,
    'foo' | 30
  >,

  /**
   * Can get the value at a path and key in a union.
   */
  Test.Expect<
    $<
      $<Object.AtPathN, ['age', ['name', 'first']]>,
      | {
          name: {
            first: 'foo'
            last: string
          }
          age: 20
        }
      | {
          name: {
            first: 'bar'
            last: string
          }
          age: 30
        }
    >,
    'foo' | 'bar' | 20 | 30
  >,

  /**
   * Will emit never if the path does not exist.
   */
  Test.Expect<
    $<
      $<Object.AtPathN, [['name', 'first']]>,
      { name: { last: string }; age: number }
    >,
    never
  >,
  /**
   * Emits an error if applied to a non-object.
   */
  // @ts-expect-error
  $<$<Object.AtPathN, [['name', 'first']]>, number>
]
