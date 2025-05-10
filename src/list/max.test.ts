import { $, Test, List, Type } from '..'

type Max_Spec = [
  /**
   * Can find the maximum element of a list of numbers.
   */
  Test.Expect<$<List.Max, [1, 2, 3]>, 3>,

  /**
   * An empty list returns never.
   */
  Test.Expect<$<List.Max, []>, never>,

  /**
   * Can handle numeric string literals.
   */
  Test.Expect<$<List.Max, [1, '2', 3]>, 3>,

  /**
   * Returns never for non-numeric elements.
   */
  Test.Expect<$<List.Max, [1, 'abc', 3]>, never>,

  /**
   * Converts all valid numeric representations.
   */
  Test.Expect<$<List.Max, ['42', 10, '5']>, 42>
]

describe('List.max', () => {
  it('should return the maximum element of a list of numbers', () => {
    expect(List.max([1, 2, 3])).toBe(3)
  })

  it('should return never if the list is empty', () => {
    expect(List.max([])).toBe(Type.never)
  })

  it('should handle numeric strings', () => {
    expect(List.max([1, '2', 3])).toBe(3)
    expect(List.max([1, '10', 3])).toBe(10)
    expect(List.max(['42', 10, '5'])).toBe(42)
  })

  it('should return never if any element is not a valid number', () => {
    expect(List.max([1, 'abc', 3])).toBe(Type.never)
    expect(List.max([{}, 2, 3])).toBe(Type.never)
    expect(List.max([[1, 2], 3])).toBe(Type.never)
  })

  it('should handle boolean values correctly', () => {
    expect(List.max([0, true])).toBe(1)
    expect(List.max([false, 0])).toBe(0)
  })

  it('should handle objects with valueOf method', () => {
    const obj = { valueOf: () => 10 }
    expect(List.max([5, obj])).toBe(10)
  })
})
