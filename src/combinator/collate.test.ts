import { $, $N, Test, Combinator } from '..'

type Collate_Spec = [
  /**
   * Collate "foo", "bar" into a tuple via repeated application.
   */
  Test.Expect<$N<$<Combinator.Collate, 2>, ['foo', 'bar']>, ['foo', 'bar']>,

  /**
   * Collate of 0 merely returns an empty tuple.
   */
  Test.Expect<$<Combinator.Collate, 0>, []>
]

it('should take in N curried elements and return a list of N length', () => {
  expect(Combinator.collate(2)('foo')('bar')).toEqual(['foo', 'bar'])
})
