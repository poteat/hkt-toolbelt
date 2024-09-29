import { $, Test, Object } from '..'

type Entries_Spec = [
  Test.Expect<
    $<Object.Entries, { foo: 'bar'; baz: 42 }>[number],
    ['foo', 'bar'] | ['baz', 42]
  >,

  Test.Expect<$<Object.Entries, {}>, []>
]

it('should return the entries of an object', () => {
  expect(Object.entries({ foo: 'bar', baz: 42 })).toEqual([
    ['foo', 'bar'],
    ['baz', 42]
  ])
})
