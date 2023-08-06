import { $, Test, List, Stress } from "..";

type ShiftN_Spec = [
  /**
   * Can execute zero shift against 10 elements.
   */
  Test.Expect<$<$<List.ShiftN, 0>, Stress.TenTuple>, Stress.TenTuple>,

  /**
   * Can execute zero shift against 100 elements.
   */
  Test.Expect<$<$<List.ShiftN, 0>, Stress.HundredTuple>, Stress.HundredTuple>,

  /**
   * Can execute zero shift against 1000 elements.
   */
  Test.Expect<$<$<List.ShiftN, 0>, Stress.ThousandTuple>, Stress.ThousandTuple>,

  /**
   * Can execute zero shift against 2000 elements.
   */
  Test.Expect<
    $<$<List.ShiftN, 0>, [...Stress.ThousandTuple, ...Stress.ThousandTuple]>,
    [...Stress.ThousandTuple, ...Stress.ThousandTuple]
  >,

  /**
   * Can execute zero shift against 3000 elements.
   */
  Test.Expect<
    $<
      $<List.ShiftN, 0>,
      [
        ...Stress.ThousandTuple,
        ...Stress.ThousandTuple,
        ...Stress.ThousandTuple
      ]
    >,
    [...Stress.ThousandTuple, ...Stress.ThousandTuple, ...Stress.ThousandTuple]
  >,

  /**
   * Can execute zero shift against 4000 elements.
   */
  Test.Expect<
    $<
      $<List.ShiftN, 0>,
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
   * Can execute zero shift against 5000 elements.
   */
  Test.Expect<
    $<
      $<List.ShiftN, 0>,
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
   * Can execute 90 shift against 100 elements.
   */
  Test.Expect<$<$<List.ShiftN, 90>, Stress.HundredTuple>, Stress.TenTuple>,

  /**
   * Can execute 990 shift against 1000 elements.
   */
  Test.Expect<$<$<List.ShiftN, 990>, Stress.ThousandTuple>, Stress.TenTuple>,

  /**
   * Can execute a 1990 shift against 2000 elements.
   */
  Test.Expect<
    $<$<List.ShiftN, 1990>, [...Stress.ThousandTuple, ...Stress.ThousandTuple]>,
    Stress.TenTuple
  >
];
