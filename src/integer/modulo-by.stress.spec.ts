import { $, Test, Integer } from '..'

type ModuloBy_Spec = [
  /**
   * Can perform complicated modulo.
   */
  Test.Expect<
    $<
      $<Integer.ModuloBy, -5>,
      -123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789n
    >,
    -4
  >
]
