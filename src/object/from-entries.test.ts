import { $, Test, Object } from '..'

type FromEntries_Spec = [
  /**
   * Can convert a list of key-value pairs to a record.
   */
  Test.Expect<
    $<Object.FromEntries, [['foo', 'bar'], ['baz', 42]]>,
    { foo: 'bar'; baz: 42 }
  >,

  /**
   * Can convert a list of key-value pairs to a record.
   */
  Test.Expect<
    $<Object.FromEntries, [['foo', 'bar'], ['baz', 42], ['qux', 'corge']]>,
    { foo: 'bar'; baz: 42; qux: 'corge' }
  >
]

it('should convert a list of key-value pairs to a record', () => {
  expect(
    Object.fromEntries([
      ['foo', 'bar'],
      ['baz', 42]
    ])
  ).toEqual({ foo: 'bar', baz: 42 })
})

it('should convert a list of key-value pairs to a record', () => {
  expect(
    Object.fromEntries([
      ['foo', 'bar'],
      ['baz', 42],
      ['qux', 'corge']
    ])
  ).toEqual({ foo: 'bar', baz: 42, qux: 'corge' })
})
