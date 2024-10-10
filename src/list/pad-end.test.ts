import { $, Test, List } from '..'

type PadEnd_Spec = [
  /**
   * Can pad a list to a desired length.
   */
  Test.Expect<$<$<$<List.PadEnd, 8>, 0>, []>, [0, 0, 0, 0, 0, 0, 0, 0]>,

  /**
   * Padding a list longer than the specified length results in the original list.
   */
  Test.Expect<$<$<$<List.PadEnd, 2>, '0'>, [1, 2, 3]>, [1, 2, 3]>,

  /**
   * Can pad a list to a desired length.
   */
  Test.Expect<$<$<$<List.PadEnd, 6>, 0>, [1, 2, 3]>, [1, 2, 3, 0, 0, 0]>
]

it('should pad a list to a desired length', () => {
  expect(List.padEnd(8)(0)([])).toEqual([0, 0, 0, 0, 0, 0, 0, 0])
})

it('padding a list longer than the specified length results in the original list', () => {
  expect(List.padEnd(2)('0')([1, 2, 3])).toEqual([1, 2, 3])
})

it('can pad a list to a desired length', () => {
  expect(List.padEnd(6)(0)([1, 2, 3])).toEqual([1, 2, 3, 0, 0, 0])
})
