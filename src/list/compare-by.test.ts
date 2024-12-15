import { $, List, Test, String, Number, Kind } from '..'

type CompareBy_Spec = [
  /**
   * Identical lists with no comparators should return 0.
   */
  Test.Expect<$<$<$<List.CompareBy, []>, ['a', 'b']>, ['a', 'b']>, 0>,

  /**
   * Can handle empty comparators.
   */
  Test.Expect<$<$<$<List.CompareBy, []>, []>, []>, 0>,

  /**
   * Can handle empty comparators with non-empty lists.
   */
  Test.Expect<$<$<$<List.CompareBy, []>, ['a']>, ['b']>, -1>,

  /**
   * With no comparators, it should fallback to default logic.
   * L1 < L2 (string lex order)
   */
  Test.Expect<$<$<$<List.CompareBy, []>, ['a', 'b']>, ['a', 'c']>, -1>,

  /**
   * With a single comparator (e.g. Number.Compare),
   * comparing numerical lists in ascending order.
   */
  Test.Expect<$<$<$<List.CompareBy, [Number.Compare]>, [1, 2]>, [1, 3]>, -1>,

  /**
   * With multiple comparators:
   *  1. Compare first element as a number ascending
   *  2. Compare second element as a string descending (String.Compare inverted)
   *  3. Compare third element as number ascending again
   */
  Test.Expect<
    $<
      $<
        $<
          List.CompareBy,
          [
            Number.Compare,
            $<Kind.LazyPipe, [String.Compare, Number.Negate]>,
            Number.Compare
          ]
        >,
        [3, 'a', 1]
      >,
      [3, 'b', 3]
    >,
    1
  >,

  /**
   * Shorter lists are considered smaller, even with comparators.
   */
  Test.Expect<$<$<$<List.CompareBy, [String.Compare]>, ['a']>, ['a', 'b']>, -1>,

  /**
   * Numbers are still less than strings when fallback is triggered.
   */
  Test.Expect<$<$<$<List.CompareBy, []>, [1]>, ['a']>, -1>,

  /**
   * Strings are greater than numbers when fallback is triggered.
   */
  Test.Expect<$<$<$<List.CompareBy, []>, ['a']>, [1]>, 1>,

  /**
   * Complex scenario:
   * First compare by string ascending, then fallback for next element (both numbers).
   */
  Test.Expect<
    $<$<$<List.CompareBy, [String.Compare]>, ['apple', 2]>, ['banana', 2]>,
    -1
  > // 'apple' < 'banana', so -1
]

describe('List.compareBy', () => {
  it('should return 0 for identical lists with no comparators', () => {
    expect(List.compareBy([])(['a', 'b'])(['a', 'b'])).toBe(0)
  })

  it('should fallback to default logic when no comparator is given', () => {
    expect(List.compareBy([])(['a', 'b'])(['a', 'c'])).toBe(-1)
  })

  it('should allow a single numeric comparator (Number.compare)', () => {
    expect(List.compareBy([Number.compare])([1, 2])([1, 3])).toBe(-1)
    expect(List.compareBy([Number.compare])([2, 2])([2, 2])).toBe(0)
    expect(List.compareBy([Number.compare])([3])([2])).toBe(1)
  })

  it('should handle multiple comparators', () => {
    // comparators: first by number ascending, then by string descending, then by number ascending
    const myComparators = [
      Number.compare,
      Kind.lazyPipe([String.compare, Number.negate]),
      Number.compare
    ] as const

    expect(List.compareBy(myComparators)([3, 'a', 1])([2, 'b', 3])).toBe(1)
    expect(List.compareBy(myComparators)([2, 'b', 1])([2, 'b', 1])).toBe(0)
    expect(List.compareBy(myComparators)([2, 'b', 3])([3, 'a', 1])).toBe(-1)
  })

  it('should consider shorter lists smaller', () => {
    expect(List.compareBy([String.compare])(['a'])(['a', 'b'])).toBe(-1)
    expect(List.compareBy([String.compare])(['a', 'b'])(['a'])).toBe(1)
  })

  it('should still treat numbers less than strings on fallback', () => {
    expect(List.compareBy([])([1])(['a'])).toBe(-1)
    expect(List.compareBy([])(['a'])([1])).toBe(1)
  })

  it('complex scenario with partial fallback', () => {
    // Only one comparator for the first element (string ascending),
    // fallback applies to the second element (numbers)
    const myComparators = [String.compare]
    expect(List.compareBy(myComparators)(['apple', 2])(['banana', 2])).toBe(-1)
    expect(List.compareBy(myComparators)(['apple', 3])(['apple', 2])).toBe(1)
  })
})
