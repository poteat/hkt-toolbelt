import { $, Test, Object } from '..'

type Omit_Spec = [
  /**
   * Can omit a key from an object.
   */
  Test.Expect<$<$<Object.Omit, ['a']>, { a: 1; b: 2; c: 3 }>, { b: 2; c: 3 }>,

  /**
   * Can omit multiple keys from an object.
   */
  Test.Expect<$<$<Object.Omit, ['a', 'b']>, { a: 1; b: 2; c: 3 }>, { c: 3 }>,

  /**
   * Omitting zero keys results in the original object.
   */
  Test.Expect<
    $<$<Object.Omit, []>, { a: 1; b: 2; c: 3 }>,
    { a: 1; b: 2; c: 3 }
  >,

  /**
   * Omitting a non-existent key results in the original object.
   */
  Test.Expect<
    $<$<Object.Omit, ['d']>, { a: 1; b: 2; c: 3 }>,
    { a: 1; b: 2; c: 3 }
  >
]

it('should omit a key from an object', () => {
  expect(Object.omit(['a'])({ a: 1, b: 2, c: 3 })).toEqual({ b: 2, c: 3 })
})

it('should omit multiple keys from an object', () => {
  expect(Object.omit(['a', 'b'])({ a: 1, b: 2, c: 3 })).toEqual({ c: 3 })
})

it('should omit zero keys from an object', () => {
  expect(Object.omit([])({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 })
})

it('should omit a non-existent key from an object', () => {
  expect(Object.omit(['d'])({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 })
})
