import { $, Test, Object } from '..'

type Update_Spec = [
  /**
   * Can update at key.
   */
  Test.Expect<
    $<
      $<$<Object.Update, ['name']>, { fullname: 'Joe Doe' }>,
      {
        name: {
          first: 'Joe'
        }
        age: number
      }
    >,
    {
      name: { fullname: 'Joe Doe' }
      age: number
    }
  >,
  /**
   * Can update at nested path.
   */
  Test.Expect<
    $<
      $<$<Object.Update, ['name', 'first']>, 'Jane'>,
      {
        name: {
          first: 'Joe'
        }
        age: number
      }
    >,
    {
      name: { first: 'Jane' }
      age: number
    }
  >,
  /**
   * Keeps original object if the path is invalid
   */
  Test.Expect<
    $<
      $<$<Object.Update, ['name', 'first', 'last']>, 'bar'>,
      {
        name: {
          first: 'Joe'
        }
        age: number
      }
    >,
    {
      name: {
        first: 'Joe'
      }
      age: number
    }
  >,
  /**
   * Running 'Update' on a non-Object type should emit an error.
   */
  //@ts-expect-error
  $<$<$<Object.Update, ['name', 'first', 'last']>, 'bar'>, number>
]
