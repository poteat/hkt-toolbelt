import { $, Test, Object, Type } from '..'

type AtKey_Spec = [
  /**
   * Can get the value at a key.
   */
  Test.Expect<$<$<Object.AtKey, { a: 1; b: 2; c: 3 }>, 'a'>, 1>,

  /**
   * Can get the value at a key in a union.
   */
  Test.Expect<$<$<Object.AtKey, { a: 1 } | { a: 2 }>, 'a'>, 1 | 2>,

  /**
   * Will emit never if the key does not exist.
   */
  Test.Expect<$<$<Object.AtKey, { b: 1 }>, 'a'>, never>,

  /**
   * Running 'AtKey' on a non-object type should emit an error.
   */
  // @ts-expect-error
  $<$<Object.AtKey, number>, 'a'>
]

it('should return the value at the specified key', () => {
  expect(Object.atKey({ a: 1, b: 2, c: 3 })('a')).toBe(1)
})

it('should return never if the key does not exist', () => {
  expect(Object.atKey({ b: 1 })('a')).toBe(Type.never)
})
