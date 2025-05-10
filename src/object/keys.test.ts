import { $, Test, Object } from '..'

/**
 * Tests for `Object.Keys` type, which returns the keys as a tuple.
 */
type Keys_Spec = [
  /**
   * Can get the keys of an object.
   */
  Test.Expect<$<Object.Keys, { a: 1; b: 2; c: 3 }>[number], 'a' | 'b' | 'c'>,

  /**
   * The resultant tuple has correct length.
   */
  Test.Expect<$<Object.Keys, { a: 1; b: 2; c: 3 }>['length'], 3>,

  /**
   * The keys of an empty object is an empty tuple.
   */
  Test.Expect<$<Object.Keys, {}>, []>,

  /**
   * Numeric keys are converted to strings (matching JS runtime behavior).
   */
  Test.Expect<$<Object.Keys, { 1: 'a'; 2: 'b' }>[number], '1' | '2'>,

  /**
   * Will emit an error if applied to a non-object.
   */
  // @ts-expect-error
  $<Object.Keys, number>
]

it('should return the keys of an object', () => {
  expect(Object.keys({ a: 1, b: 2, c: 3 })).toEqual(['a', 'b', 'c'])
})

it('should return an empty tuple if the object is empty', () => {
  expect(Object.keys({})).toEqual([])
})

it('should convert numeric keys to strings', () => {
  expect(Object.keys({ 1: 'a', 2: 'b' })).toEqual(['1', '2'])
})
