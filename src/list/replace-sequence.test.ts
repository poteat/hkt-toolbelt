import { $, List, Test } from '..'

type ReplaceSequence_Spec = [
  /**
   * Can replace a sequence of numbers in a tuple.
   */
  Test.Expect<
    $<$<$<List.ReplaceSequence, [1, 2, 3]>, [4, 5]>, [1, 2, 3, 4, 5]>,
    [4, 5, 4, 5]
  >,

  /**
   * Can replace a sequence of numbers in a tuple.
   */
  Test.Expect<
    $<$<$<List.ReplaceSequence, [1, 2, 3]>, [4, 5, 6]>, [1, 2, 3, 4, 5]>,
    [4, 5, 6, 4, 5]
  >,

  /**
   * Can replace a sequence with nothing.
   */
  Test.Expect<
    $<$<$<List.ReplaceSequence, [1, 2, 3]>, []>, [1, 2, 3, 4, 5]>,
    [4, 5]
  >,

  /**
   * Replacing an empty sequence returns the list unchanged.
   */
  Test.Expect<
    $<$<$<List.ReplaceSequence, []>, [1, 2, 3]>, [1, 2, 3, 4, 5]>,
    [1, 2, 3, 4, 5]
  >,

  /**
   * All instances of the sequence are replaced.
   */
  Test.Expect<
    $<$<$<List.ReplaceSequence, [1, 2, 3]>, [4, 5, 6]>, [1, 2, 3, 1, 2, 3]>,
    [4, 5, 6, 4, 5, 6]
  >
]

it('should replace a sequence of numbers in a tuple', () => {
  expect(List.replaceSequence([1, 2, 3])([4, 5])([1, 2, 3, 4, 5])).toEqual([
    4, 5, 4, 5
  ])
})

it('should replace a sequence of numbers in a tuple', () => {
  expect(List.replaceSequence([1, 2, 3])([4, 5, 6])([1, 2, 3, 4, 5])).toEqual([
    4, 5, 6, 4, 5
  ])
})

it('should replace a sequence with nothing', () => {
  expect(List.replaceSequence([1, 2, 3])([])([1, 2, 3, 4, 5])).toEqual([4, 5])
})

it('replacing an empty sequence does not change the list', () => {
  expect(List.replaceSequence([])([1, 2, 3])([1, 2, 3, 4, 5])).toEqual([
    1, 2, 3, 4, 5
  ])
})

it('all instances of the sequence are replaced', () => {
  expect(
    List.replaceSequence([1, 2, 3])([4, 5, 6])([1, 2, 3, 1, 2, 3])
  ).toEqual([4, 5, 6, 4, 5, 6])
})
