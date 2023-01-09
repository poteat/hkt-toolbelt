import { $, Test, List, Stress } from ".."

type Slice_Spec = [
  /**
   * Can execute zero slice against 10 elements.
   */
  Test.Expect<$<$<List.Slice, 0>, Stress.TenTuple>, Stress.TenTuple>,

  /**
   * Can execute zero slice against 100 elements.
   */
  Test.Expect<$<$<List.Slice, 0>, Stress.HundredTuple>, Stress.HundredTuple>,

  /**
   * Can execute zero slice against 1000 elements.
   */
  Test.Expect<$<$<List.Slice, 0>, Stress.ThousandTuple>, Stress.ThousandTuple>,

  /**
   * Can execute zero slice against 2000 elements.
   */
  Test.Expect<
    $<$<List.Slice, 0>, [...Stress.ThousandTuple, ...Stress.ThousandTuple]>,
    [...Stress.ThousandTuple, ...Stress.ThousandTuple]
  >,

  /**
   * Can execute zero slice against 3000 elements.
   */
  Test.Expect<
    $<
      $<List.Slice, 0>,
      [
        ...Stress.ThousandTuple,
        ...Stress.ThousandTuple,
        ...Stress.ThousandTuple
      ]
    >,
    [...Stress.ThousandTuple, ...Stress.ThousandTuple, ...Stress.ThousandTuple]
  >,

  /**
   * Can execute zero slice against 4000 elements.
   */
  Test.Expect<
    $<
      $<List.Slice, 0>,
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
   * Can execute zero slice against 5000 elements.
   */
  Test.Expect<
    $<
      $<List.Slice, 0>,
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
   * Can execute 90 slice against 100 elements.
   */
  Test.Expect<$<$<List.Slice, 90>, Stress.HundredTuple>, Stress.TenTuple>,

  /**
   * Can execute 990 slice against 1000 elements.
   */
  Test.Expect<$<$<List.Slice, 990>, Stress.ThousandTuple>, Stress.TenTuple>,

  /**
   * Can execute a 1990 slice against 2000 elements.
   */
  Test.Expect<
    $<$<List.Slice, 1990>, [...Stress.ThousandTuple, ...Stress.ThousandTuple]>,
    Stress.TenTuple
  >
]
