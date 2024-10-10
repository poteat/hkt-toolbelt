import { $, Test, List } from '..'

type PadStart_Spec = [
  /**
   * Can pad a list to a desired length.
   */
  Test.Expect<
    $<$<$<List.PadStart, 8>, '0'>, []>,
    ['0', '0', '0', '0', '0', '0', '0', '0']
  >,

  /**
   * Padding a list longer than the specified length results in the original list.
   */
  Test.Expect<$<$<$<List.PadStart, 2>, '0'>, [1, 2, 3]>, [1, 2, 3]>,

  /**
   * Can pad a list to a desired length.
   */
  Test.Expect<
    $<$<$<List.PadStart, 6>, '0'>, [1, 2, 3]>,
    ['0', '0', '0', 1, 2, 3]
  >
]

it('should pad a list to a desired length', () => {
  expect(List.padStart(8)(0)([])).toEqual([0, 0, 0, 0, 0, 0, 0, 0])
})

it('padding a list longer than the specified length results in the original list', () => {
  expect(List.padStart(2)('0')([1, 2, 3])).toEqual([1, 2, 3])
})

it('can pad a list to a desired length', () => {
  expect(List.padStart(6)('0')([1, 2, 3])).toEqual(['0', '0', '0', 1, 2, 3])
})
