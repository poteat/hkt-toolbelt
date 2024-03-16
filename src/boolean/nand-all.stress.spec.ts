import { $, Boolean, Test, Stress } from '..'

type NAndAll_Spec = [
  /**
   * Array of 2000 trues
   */
  Test.Expect<
    $<
      Boolean.NandAll,
      [...Stress.ThousandTrueList, ...Stress.ThousandTrueList]
    >,
    false
  >,
  /**
   * Array of 2000 falses
   */
  Test.Expect<
    $<
      Boolean.NandAll,
      [...Stress.ThousandFalseList, ...Stress.ThousandFalseList]
    >,
    true
  >,
  /**
   * Array of 2000 mixed booleans
   */
  Test.Expect<
    $<
      Boolean.NandAll,
      [...Stress.ThousandBooleanList, ...Stress.ThousandBooleanList]
    >,
    true
  >
]
