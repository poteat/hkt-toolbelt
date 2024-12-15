import { $, List, Test } from '..'

type SubtractBy_Spec = [
  /**
   * Can find the elements in the second list that are not in the first list.
   */
  Test.Expect<$<$<List.SubtractBy, [2]>, [1, 2, 2, 3]>, [1, 3]>,

  /**
   * Can find the elements in the second list that are not in the first list.
   */
  Test.Expect<$<$<List.SubtractBy, [2, 3]>, [1, 2, 2, 3]>, [1]>,

  /**
   * Can find the elements in the second list that are not in the first list.
   */
  Test.Expect<$<$<List.SubtractBy, [2]>, [2]>, []>
]

it('should return the elements in the second list that are not in the first list', () => {
  expect(List.subtractBy([2])([1, 2, 2, 3])).toEqual([1, 3])
})

it('should return the elements in the second list that are not in the first list', () => {
  expect(List.subtractBy([2, 3])([1, 2, 2, 3])).toEqual([1])
})

it('should return an empty list if the lists are disjoint', () => {
  expect(List.subtractBy([2])([1, 1, 2, 3])).toEqual([1, 1, 3])
})

it('can handle deep equality', () => {
  expect(List.subtractBy([{ a: 1 }])([{ a: 1 }])).toEqual([])
})
