import { $, Test, Object } from '..'

type Pick_Spec = [
  /**
   * Can pick a key from an object.
   */
  Test.Expect<$<$<Object.Pick, ['a']>, { a: 1; b: 2; c: 3 }>, { a: 1 }>,

  /**
   * Can pick multiple keys from an object.
   */
  Test.Expect<
    $<$<Object.Pick, ['a', 'b']>, { a: 1; b: 2; c: 3 }>,
    { a: 1; b: 2 }
  >,

  /**
   * Picking zero keys results in an empty object.
   */
  Test.Expect<$<$<Object.Pick, []>, { a: 1; b: 2; c: 3 }>, {}>,

  /**
   * Picking a non-existent key results in an empty object.
   */
  Test.Expect<$<$<Object.Pick, ['d']>, { a: 1; b: 2; c: 3 }>, {}>
]

it('should pick a key from an object', () => {
  expect(Object.pick(['a'])({ a: 1, b: 2, c: 3 })).toEqual({ a: 1 })
})

it('should pick multiple keys from an object', () => {
  expect(Object.pick(['a', 'b'])({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2 })
})

it('should pick zero keys from an object', () => {
  expect(Object.pick([])({ a: 1, b: 2, c: 3 })).toEqual({})
})
