import { $, Test, Object } from '..'

/**
 * Tests for `Object.AtPath`, which returns the value at a given path in an
 * object. The path is specified as a tuple of keys.
 */
type AtPath_Spec = [
  /**
   * Can get the value at a path.
   */
  Test.Expect<
    $<
      $<Object.AtPath, ['name', 'first']>,
      {
        name: {
          first: 'foo'
          last: string
        }
        age: number
      }
    >,
    'foo'
  >,

  /**
   * Can get the value at a path in a union.
   */
  Test.Expect<
    $<
      $<Object.AtPath, ['name', 'first']>,
      | {
          name: {
            first: 'foo'
            last: string
          }
          age: number
        }
      | {
          name: {
            first: 'bar'
            last: string
          }
          age: number
        }
    >,
    'foo' | 'bar'
  >,

  /**
   * Will emit never if the path does not exist.
   */
  Test.Expect<
    $<
      $<Object.AtPath, ['name', 'first']>,
      { name: { last: string }; age: number }
    >,
    never
  >,

  /**
   * Empty path should return the object.
   */
  Test.Expect<
    $<$<Object.AtPath, []>, { name: { first: 'foo'; last: 'bar' } }>,
    { name: { first: 'foo'; last: 'bar' } }
  >
]

it('should return the value at a path', () => {
  expect(
    Object.atPath(['name', 'first'])({ name: { first: 'foo', last: 'bar' } })
  ).toBe('foo')
})

it('empty path should return the object', () => {
  expect(Object.atPath([])({ name: { first: 'foo', last: 'bar' } })).toEqual({
    name: { first: 'foo', last: 'bar' }
  })
})
