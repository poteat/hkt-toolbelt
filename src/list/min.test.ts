import { $, Test, List, Type } from '..'

type Min_Spec = [
  /**
   * Can find the minimum element of a list of numbers.
   */
  Test.Expect<$<List.Min, [1, 2, 3]>, 1>,

  /**
   * An empty list returns never.
   */
  Test.Expect<$<List.Min, []>, never>,

  /**
   * Can handle numeric string literals.
   */
  Test.Expect<$<List.Min, [1, "2", 3]>, 1>,

  /**
   * Returns never for non-numeric elements.
   */
  Test.Expect<$<List.Min, [1, "abc", 3]>, never>,

  /**
   * Converts all valid numeric representations.
   */
  Test.Expect<$<List.Min, ["42", 10, "5"]>, 5>
]

describe('List.min', () => {
  it('should return the minimum element of a list of numbers', () => {
    expect(List.min([1, 2, 3])).toBe(1)
  })

  it('should return never if the list is empty', () => {
    expect(List.min([])).toBe(Type.never)
  })

  it('should handle numeric strings', () => {
    expect(List.min([1, '2', 3])).toBe(1)
    expect(List.min([1, '10', 3])).toBe(1)
    expect(List.min(['42', 10, '5'])).toBe(5)
  })

  it('should return never if any element is not a valid number', () => {
    expect(List.min([1, 'abc', 3])).toBe(Type.never)
    expect(List.min([{}, 2, 3])).toBe(Type.never)
    expect(List.min([[1, 2], 3])).toBe(Type.never)
  })

  it('should handle boolean values correctly', () => {
    expect(List.min([0, true])).toBe(0)
    expect(List.min([false, 1])).toBe(0)
  })

  it('should handle objects with valueOf method', () => {
    const obj = { valueOf: () => 10 }
    expect(List.min([15, obj])).toBe(10)
  })
})
