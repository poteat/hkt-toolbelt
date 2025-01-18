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

it('should assign a value to a key', () => {
  expect(Object.assign('foo')('bar')({})).toEqual({ foo: 'bar' })
})

it('should assign a value to a key', () => {
  expect(Object.assign('foo')(42)({})).toEqual({ foo: 42 })
})

it('should overwrite a value', () => {
  expect(Object.assign('foo')('bar')({ foo: 'baz' })).toEqual({ foo: 'bar' })
})

it('should assign a value to a key on an object with existing keys', () => {
  expect(Object.assign('foo')('bar')({ bar: 'baz' })).toEqual({
    foo: 'bar',
    bar: 'baz'
  })
})
