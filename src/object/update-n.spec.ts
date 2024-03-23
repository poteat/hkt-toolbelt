import { $, Test, Object } from '..'

type UpdateN_Spec = [
  /**
   * Can  Update List Of Keys
   */
  Test.Expect<
    $<
      $<$<Object.UpdateN, ['name', 'age']>, ['x', 20]>,
      {
        name: {
          first: 'Joe'
        }
        age: number
      }
    >,
    {
      name: 'x'
      age: 20
    }
  >,
  /**
   * Can  Update nested paths
   */
  Test.Expect<
    $<
      $<
        $<Object.UpdateN, [['name', 'first'], ['location', 'country']]>,
        ['David', { state: 'California'; city: 'Sacramento' }]
      >,
      {
        name: {
          first: 'Joe'
        }
        location: {
          country: {
            city: 'Michigan'
          }
        }
      }
    >,
    {
      name: {
        first: 'David'
      }
      location: {
        country: { state: 'California'; city: 'Sacramento' }
      }
    }
  >,
  /**
   * Can  Update a list of keys and nested paths
   */
  Test.Expect<
    $<
      $<
        $<
          Object.UpdateN,
          ['age', ['name', 'first'], ['location', 'country', 'city']]
        >,
        [30, 'David', 'SF']
      >,
      {
        name: {
          first: 'Joe'
        }
        age: number
        location: {
          country: {
            city: 'Michigan'
          }
        }
      }
    >,
    {
      name: {
        first: 'David'
      }
      age: 30
      location: {
        country: {
          city: 'SF'
        }
      }
    }
  >,

  /**
   *  Keeps original object if the path is invalid
   */
  Test.Expect<
    $<
      $<$<Object.UpdateN, [['name', 'last']]>, ['bar']>,
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
