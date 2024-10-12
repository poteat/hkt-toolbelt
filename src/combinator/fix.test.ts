import { $, Combinator, Test, NaturalNumber, String } from '..'

type Rewrite = $<Combinator.Fix, $<$<String.Replace, 'xyz'>, 'x'>>

const rewrite = Combinator.fix(String.replace('xyz')('x'))

type Fix_Spec = [
  /**
   * Can find a fixed point.
   */
  Test.Expect<$<$<Combinator.Fix, NaturalNumber.Decrement>, 100>, 0>,

  /**
   * Can execute a term rewriting system.
   */
  Test.Expect<$<Rewrite, 'zyxyzyzyz'>, 'zyx'>
]

it('should find a fixed point', () => {
  expect(Combinator.fix(NaturalNumber.decrement)(100)).toBe(0)
})

it('can execute a term rewriting system', () => {
  expect(Combinator.fix(rewrite)('zyxyzyzyz')).toBe('zyx')
})
