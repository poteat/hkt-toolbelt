import { $, Test, List, Stress, Number, NaturalNumber } from '..'

type Accumulate_Stress_Spec = [
  /**
   * Accumulating one thousand elements, i.e. 1 + 2 + ... + 10 repeating should
   * equal 55 * 100 = 5500.
   */
  Test.Expect<
    $<
      $<$<List.Accumulate, NaturalNumber.Add>, 0>,
      Stress.ThousandNumberList
    >[999],
    5500
  >,

  /**
   * Accumulating 2000 elements should be 5500 * 2 = 11000.
   */
  Test.Expect<
    $<
      $<$<List.Accumulate, NaturalNumber.Add>, 0>,
      [...Stress.ThousandNumberList, ...Stress.ThousandNumberList]
    >[1999],
    11000
  >,

  /**
   * Can perform a max operation on a list of numbers.
   */
  Test.Expect<
    $<
      $<$<List.Accumulate, Number.Max>, Number.MIN_SAFE_INTEGER>,
      [...Stress.ThousandNumberList, ...Stress.ThousandNumberList]
    >[1999],
    10
  >
]
