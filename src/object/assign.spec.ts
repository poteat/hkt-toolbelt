import { $, Object, Test } from '..'

type Assign_Spec = [
  /**
   * Can assign a value to a key.
   */
  Test.Expect<$<$<$<Object.Assign, 'foo'>, 'bar'>, {}>, { foo: 'bar' }>,

  /**
   * Can assign a value to a key.
   */
  Test.Expect<$<$<$<Object.Assign, 'foo'>, 42>, {}>, { foo: 42 }>,

  /**
   * Can overwrite a value.
   */
  Test.Expect<
    $<$<$<Object.Assign, 'foo'>, 'bar'>, { foo: 'baz' }>,
    { foo: 'bar' }
  >,

  /**
   * Can assign a value to a key on an object with existing keys.
   */
  Test.Expect<
    $<$<$<Object.Assign, 'foo'>, 'bar'>, { bar: 'baz' }>,
    { foo: 'bar'; bar: 'baz' }
  >
]
