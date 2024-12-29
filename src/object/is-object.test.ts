import { $, Test, Object } from '..'

type IsObject_Spec = [
  /**
   * Can check if a number is an object.
   */
  Test.Expect<$<Object.IsObject, 42>, false>,

  /**
   * Can check if an object is an object.
   */
  Test.Expect<$<Object.IsObject, { foo: 'bar' }>, true>,

  /**
   * Can check if a function is an object.
   */
  Test.Expect<$<Object.IsObject, () => 42>, false>
]

it('should return true if the input is an object', () => {
  expect(Object.isObject({ foo: 'bar' })).toBe(true)
})

it('should return false if the input is not an object', () => {
  expect(Object.isObject(42)).toBe(false)
})

it('should return false if the input is a function', () => {
  expect(Object.isObject(() => 42)).toBe(false)
})
