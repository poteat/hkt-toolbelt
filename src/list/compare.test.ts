import { $, List, Test } from '..'

type Compare_Spec = [
  /**
   * Identical lists should return 0.
   */
  Test.Expect<$<$<List.Compare, ['a', 'b']>, ['a', 'b']>, 0>,

  /**
   * Different lists: L1 < L2.
   */
  Test.Expect<$<$<List.Compare, ['a', 'b']>, ['a', 'c']>, -1>,

  /**
   * Different lists: L1 > L2.
   */
  Test.Expect<$<$<List.Compare, ['a', 'c']>, ['a', 'b']>, 1>,

  /**
   * Shorter list < longer list.
   */
  Test.Expect<$<$<List.Compare, ['a']>, ['a', 'b']>, -1>,

  /**
   * Longer list > shorter list.
   */
  Test.Expect<$<$<List.Compare, ['a', 'b']>, ['a']>, 1>,

  /**
   * Numbers are less than strings.
   */
  Test.Expect<$<$<List.Compare, [1, 2]>, ['a', 'b']>, -1>,

  /**
   * Strings are greater than numbers.
   */
  Test.Expect<$<$<List.Compare, ['a', 'b']>, [1, 2]>, 1>,

  /**
   * Identical lists of numbers should return 0.
   */
  Test.Expect<$<$<List.Compare, [1, 2, 3]>, [1, 2, 3]>, 0>,

  /**
   * Different numbers: L1 < L2 numerically.
   */
  Test.Expect<$<$<List.Compare, [1, 2, 3]>, [1, 2, 4]>, -1>
]

it('should return 0 for identical lists', () => {
  expect(List.compare(['a', 'b'])(['a', 'b'])).toBe(0)
})

it('should return -1 if L1 < L2 (string comparison)', () => {
  expect(List.compare(['a', 'b'])(['a', 'c'])).toBe(-1)
})

it('should return 1 if L1 > L2 (string comparison)', () => {
  expect(List.compare(['a', 'c'])(['a', 'b'])).toBe(1)
})

it('should consider shorter lists as smaller', () => {
  expect(List.compare(['a'])(['a', 'b'])).toBe(-1)
  expect(List.compare(['a', 'b'])(['a'])).toBe(1)
})

it('should consider all numbers less than all strings', () => {
  expect(List.compare([1, 2])(['a', 'b'])).toBe(-1)
  expect(List.compare(['a', 'b'])([1, 2])).toBe(1)
})

it('should return 0 for identical lists of numbers', () => {
  expect(List.compare([1, 2, 3])([1, 2, 3])).toBe(0)
})

it('should return -1 if L1 < L2 numerically', () => {
  expect(List.compare([1, 2, 3])([1, 2, 4])).toBe(-1)
})
