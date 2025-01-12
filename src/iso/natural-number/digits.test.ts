import { $, Iso, NaturalNumber, Test, List } from '../..'

type Digits_Spec = [
  /**
   * Can convert a natural number to a list of digits.
   */
  Test.Expect<
    $<
      $<Iso.NaturalNumber.Digits, $<List.Map, $<NaturalNumber.Multiply, 2>>>,
      99
    >,
    1818
  >
]

it('should convert a natural number to a list of digits', () => {
  const result = Iso.NaturalNumber.digits(List.map(NaturalNumber.multiply(2)))(
    99
  )

  expect(result).toBe(1818)
})
