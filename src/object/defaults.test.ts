import { $, Test, Object } from '..'

type Defaults_Spec = [
  /**
   * Can defaultize a record.
   */
  Test.Expect<
    $<
      $<Object.Defaults, { foo: 'qux'; qux: 'qux' }>,
      { foo: 'bar'; bar: 'foo' }
    >,
    { foo: 'bar'; bar: 'foo'; qux: 'qux' }
  >,

  /**
   * An empty default record is the identity function.
   */
  Test.Expect<$<$<Object.Defaults, {}>, { foo: 'bar' }>, { foo: 'bar' }>,

  /**
   * Can defaultize numeric keys.
   */
  Test.Expect<
    $<$<Object.Defaults, { 2: 'qux' }>, { 0: 'bar'; 1: 'foo' }>,
    { 0: 'bar'; 1: 'foo'; 2: 'qux' }
  >
]

it('should defaultize a record', () => {
  expect(
    Object.defaults({ foo: 'qux', qux: 'qux' })({ foo: 'bar', bar: 'foo' })
  ).toEqual({
    foo: 'bar',
    bar: 'foo',
    qux: 'qux'
  })
})

it('should defaultize numeric keys', () => {
  expect(Object.defaults({ 2: 'qux' })({ 0: 'bar', 1: 'foo' })).toEqual({
    0: 'bar',
    1: 'foo',
    2: 'qux'
  })
})
