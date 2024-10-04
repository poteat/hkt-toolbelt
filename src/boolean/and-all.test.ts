import { $, Boolean, Test } from '..'

type AndAll_Spec = [
  /**
   * An empty array returns false.
   */
  Test.Expect<$<Boolean.AndAll, []>, false>,
  /**
   * An array of trues  resolves to true
   */
  Test.Expect<$<Boolean.AndAll, [true, true, true]>, true>,
  /**
   * An array having falses resolves to false
   */
  Test.Expect<$<Boolean.AndAll, [true, true, false]>, false>,

  /**
   * Running 'AndAll' on a non-boolean type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<Boolean.AndAll, true>, number>>
]

it('should return true if all elements are true', () => {
  expect(Boolean.andAll([true, true, true])).toBe(true)
})

it('should return false if any element is false', () => {
  expect(Boolean.andAll([true, true, false])).toBe(false)
})
