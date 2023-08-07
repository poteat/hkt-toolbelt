import { $, Test, List, Stress } from '..'

type PopN_Spec = [
  /**
   * Can execute zero pop against 10 elements.
   */
  Test.Expect<$<$<List.PopN, 0>, Stress.TenTuple>, Stress.TenTuple>,

  /**
   * Can execute zero pop against 100 elements.
   */
  Test.Expect<$<$<List.PopN, 0>, Stress.HundredTuple>, Stress.HundredTuple>,

  /**
   * Can execute zero pop against 1000 elements.
   */
  Test.Expect<$<$<List.PopN, 0>, Stress.ThousandTuple>, Stress.ThousandTuple>,

  /**
   * Can execute zero pop against 2000 elements.
   */
  Test.Expect<
    $<$<List.PopN, 0>, [...Stress.ThousandTuple, ...Stress.ThousandTuple]>,
    [...Stress.ThousandTuple, ...Stress.ThousandTuple]
  >,

  /**
   * Can execute zero pop against 3000 elements.
   */
  Test.Expect<
    $<
      $<List.PopN, 0>,
      [
        ...Stress.ThousandTuple,
        ...Stress.ThousandTuple,
        ...Stress.ThousandTuple
      ]
    >,
    [...Stress.ThousandTuple, ...Stress.ThousandTuple, ...Stress.ThousandTuple]
  >,

  /**
   * Can execute zero pop against 4000 elements.
   */
  Test.Expect<
    $<
      $<List.PopN, 0>,
      [
        ...Stress.ThousandTuple,
        ...Stress.ThousandTuple,
        ...Stress.ThousandTuple,
        ...Stress.ThousandTuple
      ]
    >,
    [
      ...Stress.ThousandTuple,
      ...Stress.ThousandTuple,
      ...Stress.ThousandTuple,
      ...Stress.ThousandTuple
    ]
  >,

  /**
   * Can execute zero pop against 5000 elements.
   */
  Test.Expect<
    $<
      $<List.PopN, 0>,
      [
        ...Stress.ThousandTuple,
        ...Stress.ThousandTuple,
        ...Stress.ThousandTuple,
        ...Stress.ThousandTuple,
        ...Stress.ThousandTuple
      ]
    >,
    [
      ...Stress.ThousandTuple,
      ...Stress.ThousandTuple,
      ...Stress.ThousandTuple,
      ...Stress.ThousandTuple,
      ...Stress.ThousandTuple
    ]
  >,

  /**
   * Can execute 90 pop against 100 elements.
   */
  Test.Expect<$<$<List.PopN, 90>, Stress.HundredTuple>, Stress.TenTuple>,

  /**
   * Can execute 990 pop against 1000 elements.
   */
  Test.Expect<$<$<List.PopN, 990>, Stress.ThousandTuple>, Stress.TenTuple>,

  /**
   * Can execute a 1990 pop against 2000 elements.
   */
  Test.Expect<
    $<$<List.PopN, 1990>, [...Stress.ThousandTuple, ...Stress.ThousandTuple]>,
    Stress.TenTuple
  >
]
