import { $, Test, List, Stress, NaturalNumber } from '..'

type Reduce_Spec = [
  /**
   * Can handle large lists to add.
   */
  Test.Expect<
    $<
      $<$<List.Reduce, NaturalNumber.Add>, 0>,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    >,
    210
  >,

  /**
   * Can handle a list of 100 elements.
   */
  Test.Expect<
    $<$<$<List.Reduce, NaturalNumber.Add>, 0>, Stress.HundredNumberList>,
    550
  >,

  /**
   * Can handle a list of 500 elements.
   */
  Test.Expect<
    $<
      $<$<List.Reduce, NaturalNumber.Add>, 0>,
      [
        ...Stress.HundredNumberList,
        ...Stress.HundredNumberList,
        ...Stress.HundredNumberList,
        ...Stress.HundredNumberList,
        ...Stress.HundredNumberList
      ]
    >,
    2750
  >,

  /**
   * Can handle a list of 1000 elements.
   */
  Test.Expect<
    $<$<$<List.Reduce, NaturalNumber.Add>, 0>, Stress.ThousandNumberList>,
    5500
  >
]
