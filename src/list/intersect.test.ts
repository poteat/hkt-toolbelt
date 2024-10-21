import { $, List, Test } from '..'

type Intersect_Spec = [
  /**
   * Can find the common elements in two lists.
   */
  Test.Expect<$<$<List.Intersect, [1, 2, 3]>, [1, 2, 3, 4, 5]>, [1, 2, 3]>,

  /**
   * Can find the common elements in two lists, even if the lists are empty.
   */
  Test.Expect<$<$<List.Intersect, []>, []>, []>,

  /**
   * Can find the common elements in two lists, even if the lists are the same.
   */
  Test.Expect<$<$<List.Intersect, [1, 2, 3]>, [1, 2, 3]>, [1, 2, 3]>,

  /**
   * Can result in an empty list if the lists are disjoint.
   */
  Test.Expect<$<$<List.Intersect, [1, 2, 3]>, [4, 5, 6]>, []>
]

it('should return the common elements of two lists', () => {
  expect(List.intersect([1, 2, 3])([1, 2, 3, 4, 5])).toEqual([1, 2, 3])
})

it('should return an empty list if the lists are disjoint', () => {
  expect(List.intersect([1, 2, 3])([4, 5, 6])).toEqual([])
})

it('can handle deep equality', () => {
  expect(List.intersect([{ a: 1 }])([{ a: 1 }])).toEqual([{ a: 1 }])
})
