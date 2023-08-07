import { $, Test, Object } from '..'

/**
 * Tests for `Object.Paths`, which returns the paths to all values in an object
 * as a tuple.
 */
type Paths_Spec = [
  /**
   * Can get the paths of an object.
   */
  Test.Expect<
    $<
      Object.Paths,
      {
        name: {
          first: string
          last: string
        }
        age: number
      }
    >[number],
    [['name'], ['name', 'first'], ['name', 'last'], ['age']][number]
  >,

  /**
   * The paths of an empty object is an empty tuple.
   */
  Test.Expect<$<Object.Paths, {}>, []>,

  /**
   * Will emit an error if applied to a non-object.
   */
  // @ts-expect-error
  $<Object.Paths, number>,

  /**
   * Can handle larger structures.
   */
  Test.Expect<
    $<
      Object.Paths,
      {
        name: {
          first: string
          last: string
        }
        age: number
        address: {
          street: string
          city: string
          state: string
          zip: {
            code: string
          }
        }
      }
    >[number],
    [
      ['name'],
      ['name', 'first'],
      ['name', 'last'],
      ['age'],
      ['address'],
      ['address', 'street'],
      ['address', 'city'],
      ['address', 'state'],
      ['address', 'zip'],
      ['address', 'zip', 'code']
    ][number]
  >
]
