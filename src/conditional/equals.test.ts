import { $, Conditional, Test } from '..'

type Equals_Spec = [
  /**
   * A type equals itself.
   */
  Test.Expect<$<$<Conditional.Equals, true>, true>>,

  /**
   * A type does not equal a different type.
   */
  Test.ExpectNot<$<$<Conditional.Equals, true>, false>>,

  /**
   * A type does not equal a supertype.
   */
  Test.ExpectNot<$<$<Conditional.Equals, true>, boolean>>,

  /**
   * True does not equal never.
   */
  Test.ExpectNot<$<$<Conditional.Equals, true>, never>>,

  /**
   * Never does not equal true.
   */
  Test.ExpectNot<$<$<Conditional.Equals, never>, true>>,

  /**
   * Never equals never.
   */
  Test.Expect<$<$<Conditional.Equals, never>, never>>,

  /**
   * Unknown equals unknown.
   */
  Test.Expect<$<$<Conditional.Equals, unknown>, unknown>>,

  /**
   * Deeply equals nested lists
   */
  Test.Expect<$<$<Conditional.Equals, [1, [2, [3, [4]]]]>, [1, [2, [3, [4]]]]>>,

  /**
   * Deeply equals nested objects
   */
  Test.Expect<
    $<
      $<
        Conditional.Equals,
        { a: 1; b: 2; c: { d: 3; e: { f: 4; g: [5, 6, 7]; h: 8 | 9 | 10 } } }
      >,
      { a: 1; b: 2; c: { d: 3; e: { f: 4; g: [5, 6, 7]; h: 8 | 9 | 10 } } }
    >
  >,

  /**
   * Equals empty lists and objects
   */
  Test.Expect<$<$<Conditional.Equals, []>, []>>,
  Test.Expect<$<$<Conditional.Equals, [[]]>, [[]]>>,
  Test.Expect<$<$<Conditional.Equals, {}>, {}>>,
  Test.Expect<$<$<Conditional.Equals, {}>, object>>,
  Test.Expect<$<$<Conditional.Equals, {}>, Record<PropertyKey, unknown>>>,
  Test.Expect<$<$<Conditional.Equals, [{}]>, [{}]>>
]

it('should return true for equal values', () => {
  expect(Conditional.equals(1)(1)).toBe(true)
})

it('should return false for unequal values', () => {
  expect(Conditional.equals(1)(2)).toBe(false)
})

it('performs deep equality', () => {
  expect(Conditional.equals({ a: 1, b: 2 })({ a: 1, b: 2 })).toBe(true)
})
