import { $, Boolean, Test, Stress } from '..'
type NorAll_Spec = [
  /**
   * Array of 2000 trues
   */
  Test.Expect<
    $<Boolean.NorAll, [...Stress.ThousandTrueList, ...Stress.ThousandTrueList]>,
    false
  >,
  /**
   * Array of 2000 falses
   */
  Test.Expect<
    $<
      Boolean.NorAll,
      [...Stress.ThousandFalseList, ...Stress.ThousandFalseList]
    >,
    true
  >,
  /**
   * Array of 2000 mixed booleans
   */
  Test.Expect<
    $<
      Boolean.NorAll,
      [...Stress.ThousandBooleanList, ...Stress.ThousandBooleanList]
    >,
    false
  >
]
