import { $, Iso, NaturalNumber, Test } from '../..'

type Decrement_Spec = [
  /**
   * Can wrap a kind i.e. f(n - 1) + 1, for f(x) = x * 2
   */
  Test.Expect<
    $<$<Iso.NaturalNumber.Decrement, $<NaturalNumber.Multiply, 2>>, 10>,
    19
  >
]

it('should wrap a kind i.e. f(n - 1) + 1, for f(x) = x * 2', () => {
  expect(Iso.NaturalNumber.decrement(NaturalNumber.multiply(2))(10)).toBe(19)
})
