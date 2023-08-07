import { $, Test, NaturalNumber } from '..'

type Decrement_Spec = [
  /**
   * Can decrement a natural number of zero.
   */
  Test.Expect<$<NaturalNumber.Decrement, 0>, 0>,

  /**
   * Can decrement a natural number of one.
   */
  Test.Expect<$<NaturalNumber.Decrement, 1>, 0>,

  /**
   * Can decrement a natural number of 10.
   */
  Test.Expect<$<NaturalNumber.Decrement, 10>, 9>,

  /**
   * Can decrement a natural number of 9999.
   */
  Test.Expect<$<NaturalNumber.Decrement, 9999>, 9998>,

  /**
   * We emit 'never' if the input is not a natural number.
   */
  Test.Expect<$<NaturalNumber.Decrement, -1>, never>,

  /**
   * Can decrement bigint literals.
   */
  Test.Expect<
    $<NaturalNumber.Decrement, 999999999999999999999n>,
    999999999999999999998n
  >
]
