import { $, Test, Integer } from '..'

type RemainderBy_Spec = [
  /**
   * Can perform complicated remainder.
   */
  Test.Expect<
    $<
      $<Integer.RemainderBy, -5>,
      -123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789n
    >,
    4
  >
]
