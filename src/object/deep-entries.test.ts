import { $, Test, Object } from '..'

type DeepEntries_Spec = [
  /**
   * Simple object
   */
  Test.Expect<
    $<Object.DeepEntries, { foo: 'bar'; baz: 42 }>,
    [['foo', 'bar'], ['baz', 42]]
  >,

  /**
   * Nested object
   */
  Test.Expect<
    $<Object.DeepEntries, { name: { first: 'john'; last: 'smith' }; age: 25 }>,
    [['name', 'first', 'john'], ['name', 'last', 'smith'], ['age', 25]]
  >,

  /**
   * Deeper nesting
   */
  Test.Expect<
    $<Object.DeepEntries, { a: { b: { c: 'd' } } }>,
    [['a', 'b', 'c', 'd']]
  >,

  /**
   * Mixed nesting (arrays are treated as values)
   */
  Test.Expect<
    $<Object.DeepEntries, { x: ['y', 'z']; w: { v: 1 } }>,
    [['x', ['y', 'z']], ['w', 'v', 1]]
  >
]

it('should return the entries of an object', () => {
  expect(Object.deepEntries({ a: 1, b: 2, c: 3 })).toEqual([
    ['a', 1],
    ['b', 2],
    ['c', 3]
  ])
})

it('should return the entries of an object', () => {
  expect(Object.deepEntries({ a: { b: 1 } })).toEqual([['a', 'b', 1]])
})
