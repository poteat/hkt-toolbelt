import { $, Kind, Function, Test } from '..'

type ApplyKind_Spec = [
  /**
   * Can apply a kind to a value.
   */
  Test.Expect<$<$<Kind.ApplyKind, Function.Identity>, [1, 2, 3]>, [1, 2, 3]>
]

it('should apply a kind to a value', () => {
  expect(Kind.applyKind(Function.identity)([1, 2, 3])).toEqual([1, 2, 3])
})
