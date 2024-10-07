import { $, Combinator, Kind, Test } from '..'

type Collapse_Spec = [
  /**
   * Can collapse a kind.
   */
  Test.Expect<$<$<Kind.Collapse, $<Combinator.Collate, 2>>, 1>, [1, 1]>
]

it('should collapse a kind', () => {
  expect(Kind.collapse(Combinator.collate(2))(1)).toEqual([1, 1])
})
