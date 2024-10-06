import { $, List, Test, Type } from '..'

type SlidingWindow_Spec = [
  /**
   * Can slide a window of length 2 over a list.
   */
  Test.Expect<
    $<$<List.SlidingWindow, 2>, [1, 2, 3, 4, 5]>,
    [[1, 2], [2, 3], [3, 4], [4, 5]]
  >,

  /**
   * Can slide a window of length 3 over a list.
   */
  Test.Expect<
    $<$<List.SlidingWindow, 3>, [1, 2, 3, 4, 5]>,
    [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
  >,

  /**
   * Sliding a window of equal length results in the original list.
   */
  Test.Expect<$<$<List.SlidingWindow, 5>, [1, 2, 3, 4, 5]>, [[1, 2, 3, 4, 5]]>,

  /**
   * Sliding a window of length 0 results in an empty array.
   */
  Test.Expect<$<$<List.SlidingWindow, 0>, [1, 2, 3, 4, 5]>, [[]]>,

  /**
   * Sliding a window over the length of the list results in never.
   */
  Test.Expect<$<$<List.SlidingWindow, 6>, [1, 2, 3, 4, 5]>, never>,

  /**
   * Can slide a window of length 1 over a list.
   */
  Test.Expect<
    $<$<List.SlidingWindow, 1>, [1, 2, 3, 4, 5]>,
    [[1], [2], [3], [4], [5]]
  >
]

it('should slide a window of length 2 over a list', () => {
  expect(List.slidingWindow(2)([1, 2, 3, 4, 5])).toEqual([
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5]
  ])
})

it('sliding a window of length 0 results in an empty array', () => {
  expect(List.slidingWindow(0)([1, 2, 3, 4, 5])).toEqual([[]])
})

it('sliding a window of length 1 results in a single-element array', () => {
  expect(List.slidingWindow(1)([1, 2, 3, 4, 5])).toEqual([
    [1],
    [2],
    [3],
    [4],
    [5]
  ])
})

it('sliding a window over the length of the list results in never', () => {
  expect(List.slidingWindow(6)([1, 2, 3, 4, 5])).toBe(Type.never)
})
