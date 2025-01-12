import { $, Iso, NaturalNumber, Test } from '../..'

type Increment_Spec = [
  /**
   * Can wrap a kind i.e. f(n + 1) - 1, for f(x) = x * 2
   */
  Test.Expect<
    $<$<Iso.NaturalNumber.Increment, $<NaturalNumber.Multiply, 2>>, 10>,
    21
  >
]

it('should wrap a kind i.e. f(n + 1) - 1, for f(x) = x * 2', () => {
  expect(Iso.NaturalNumber.increment(NaturalNumber.multiply(2))(10)).toBe(21)
})
