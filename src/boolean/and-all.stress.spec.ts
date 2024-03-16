import { $, Boolean, Test, Stress } from '..'
type AndAll_Spec = [
  /**
   * An array of 2000 trues should resolves to true
   */
  Test.Expect<
    $<Boolean.AndAll, [...Stress.ThousandTrueList, ...Stress.ThousandTrueList]>,
    true
  >,
  /**
   * An array of 2000 false should resolves to false
   */
  Test.Expect<
    $<
      Boolean.AndAll,
      [...Stress.ThousandFalseList, ...Stress.ThousandFalseList]
    >,
    false
  >,
  /**
   * An array of 2000 mixed boolean should resolves to false
   */
  Test.Expect<
    $<
      Boolean.AndAll,
      [...Stress.ThousandBooleanList, ...Stress.ThousandBooleanList]
    >,
    false
  >
]
