import { $, Test, Integer } from '..'

type Remainder_Spec = [
  /**
   * Can perform complicated remainder.
   */
  Test.Expect<
    $<
      $<
        Integer.Remainder,
        -123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789n
      >,
      -5
    >,
    4
  >
]
