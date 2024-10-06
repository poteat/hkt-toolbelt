import { $, List, Test } from '..'

type Of_Spec = [
  /**
   * Can create a list containing a single value.
   */
  Test.Expect<$<List.Of, 42>, [42]>,

  /**
   * Can create a list containing a single value.
   */
  Test.Expect<$<List.Of, 42>, [42]>,

  /**
   * Can create a 1-tuple containg a list.
   */
  Test.Expect<$<List.Of, [1, 2, 3]>, [[1, 2, 3]]>
]

it('should create a list containing a single value', () => {
  expect(List.of(42)).toEqual([42])
})
