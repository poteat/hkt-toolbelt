import { $, Test, NaturalNumber } from ".."

type Modulo_Spec = [
  /**
   * Can perform complicated modulo.
   */
  Test.Expect<
    $<
      $<
        NaturalNumber.Modulo,
        123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789n
      >,
      5
    >,
    4
  >
]
