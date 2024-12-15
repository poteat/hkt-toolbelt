import { $, List, Test } from '..'

type Subtract_Spec = [
  /**
   * Can find the elements in the first list that are not in the second list.
   */
  Test.Expect<$<$<List.Subtract, [1, 2, 2, 3]>, [2]>, [1, 3]>,

  /**
   * Can find the elements in the first list that are not in the second list.
   */
  Test.Expect<$<$<List.Subtract, [1, 2, 2, 3]>, [2, 3]>, [1]>,

  /**
   * Can find the elements in the first list that are not in the second list.
   */
  Test.Expect<$<$<List.Subtract, [1, 1, 2, 3]>, [1, 2, 3]>, []>
]

it('should return the elements in the first list that are not in the second list', () => {
  expect(List.subtract([1, 2, 2, 3])([2])).toEqual([1, 3])
})

it('should return the elements in the first list that are not in the second list', () => {
  expect(List.subtract([1, 2, 2, 3])([2, 3])).toEqual([1])
})

it('should return an empty list if the lists are disjoint', () => {
  expect(List.subtract([1, 1, 2, 3])([1, 2, 3])).toEqual([])
})

it('can handle deep equality', () => {
  expect(List.subtract([{ a: 1 }])([{ a: 1 }])).toEqual([])
})
