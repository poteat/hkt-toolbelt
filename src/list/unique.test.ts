import { $, List, Test } from '..'

type Unique_Spec = [
  /**
   * Can find the unique elements in a list.
   */
  Test.Expect<$<List.Unique, [1, 2, 3, 2, 1]>, [1, 2, 3]>,

  /**
   * Can handle empty lists.
   */
  Test.Expect<$<List.Unique, []>, []>,

  /**
   * Can handle non-list inputs.
   */
  Test.Expect<$<List.Unique, number[]>, number[]>,

  /**
   * Can handle non-unique elements.
   */
  Test.Expect<$<List.Unique, [1, 2, 3, 2, 1, 1]>, [1, 2, 3]>
]

it('should remove duplicate elements from a list', () => {
  expect(List.unique([1, 2, 3, 2, 1])).toEqual([1, 2, 3])
})

it('should return an empty list for an empty list', () => {
  expect(List.unique([])).toEqual([])
})

it('should be able to handle lists of objects', () => {
  expect(
    List.unique([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 2 }, { a: 1 }])
  ).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }])
})
