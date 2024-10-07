import { $, List, Test } from '..'

type Entries_Spec = [
  /**
   * Can get the entries of a list.
   */
  Test.Expect<$<List.Entries, [1, 2, 3]>, [[0, 1], [1, 2], [2, 3]]>,

  /**
   * Can get the entries of an empty list.
   */
  Test.Expect<$<List.Entries, []>, []>,

  /**
   * Can get the entries of a list with a single element.
   */
  Test.Expect<$<List.Entries, [1]>, [[0, 1]]>
]

it('should return the entries of a list', () => {
  expect(List.entries([1, 2, 3])).toEqual([
    [0, 1],
    [1, 2],
    [2, 3]
  ])
})

it('should return the entries of an empty list', () => {
  expect(List.entries([])).toEqual([])
})

it('should return the entries of a list with a single element', () => {
  expect(List.entries([1])).toEqual([[0, 1]])
})
