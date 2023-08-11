import { $, Test, Integer } from '..'

type Modulo_Spec = [
  /**
   * Can perform complicated modulo.
   */
  Test.Expect<
    $<
      $<
        Integer.Modulo,
        -123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789n
      >,
      -5
    >,
    -1
  >
]
