import { $, Test, String, Stress } from "..";

type ToList_Spec = [
  /**
   * Can split 10 elements.
   */
  Test.Expect<$<String.ToList, Stress.TenString>, Stress.TenTuple>,

  /**
   * Can split 100 elements.
   */
  Test.Expect<$<String.ToList, Stress.HundredString>, Stress.HundredTuple>,

  /**
   * Can split 1000 elements.
   */
  Test.Expect<$<String.ToList, Stress.ThousandString>, Stress.ThousandTuple>,

  /**
   * Can split 2000 elements.
   */
  Test.Expect<
    $<String.ToList, `${Stress.ThousandString}${Stress.ThousandString}`>,
    [...Stress.ThousandTuple, ...Stress.ThousandTuple]
  >,

  /**
   * Can split 3000 elements.
   */
  Test.Expect<
    $<
      String.ToList,
      `${Stress.ThousandString}${Stress.ThousandString}${Stress.ThousandString}`
    >,
    [...Stress.ThousandTuple, ...Stress.ThousandTuple, ...Stress.ThousandTuple]
  >,

  /**
   * Can split 4000 elements.
   */
  Test.Expect<
    $<
      String.ToList,
      `${Stress.ThousandString}${Stress.ThousandString}${Stress.ThousandString}${Stress.ThousandString}`
    >,
    [
      ...Stress.ThousandTuple,
      ...Stress.ThousandTuple,
      ...Stress.ThousandTuple,
      ...Stress.ThousandTuple
    ]
  >,

  /**
   * Can split 5000 elements.
   */
  Test.Expect<
    $<
      String.ToList,
      `${Stress.ThousandString}${Stress.ThousandString}${Stress.ThousandString}${Stress.ThousandString}${Stress.ThousandString}`
    >,
    [
      ...Stress.ThousandTuple,
      ...Stress.ThousandTuple,
      ...Stress.ThousandTuple,
      ...Stress.ThousandTuple,
      ...Stress.ThousandTuple
    ]
  >
];
