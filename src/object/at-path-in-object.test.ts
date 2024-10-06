import { $, Test, Object } from '..'

type AtPathInObject_Spec = [
  /**
   * Can get the value at a path.
   */
  Test.Expect<
    $<
      $<Object.AtPathInObject, { name: { first: 'foo'; last: 'bar' } }>,
      ['name', 'first']
    >,
    'foo'
  >,

  /**
   * Will emit never if the path does not exist.
   */
  Test.Expect<
    $<
      $<Object.AtPathInObject, { name: { first: 'foo'; last: 'bar' } }>,
      ['name', 'first', 'last']
    >,
    never
  >,

  /**
   * Empty path should return the object.
   */
  Test.Expect<
    $<$<Object.AtPathInObject, { name: { first: 'foo'; last: 'bar' } }>, []>,
    { name: { first: 'foo'; last: 'bar' } }
  >
]

it('should return the value at a path', () => {
  expect(
    Object.atPathInObject({ name: { first: 'foo', last: 'bar' } })([
      'name',
      'first'
    ])
  ).toBe('foo')
})

it('empty path should return the object', () => {
  expect(
    Object.atPathInObject({ name: { first: 'foo', last: 'bar' } })([])
  ).toEqual({ name: { first: 'foo', last: 'bar' } })
})
