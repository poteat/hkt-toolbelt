import { $, Boolean, Test, Stress } from '..'
type NorAll_Spec = [
  /**
   * Array of 2000 trues
   */
  Test.Expect<
    $<
      Boolean.XnorAll,
      [...Stress.ThousandTrueList, ...Stress.ThousandTrueList]
    >,
    false
  >,
  /**
   * An array of 2000 falses and 2 trues
   */
  Test.Expect<
    $<
      Boolean.XnorAll,
      [...Stress.ThousandFalseList, ...Stress.ThousandFalseList, true, true]
    >,
    false
  >,
  /**
   * Array of 2000 falses and 3 trues
   */
  Test.Expect<
    $<
      Boolean.XnorAll,
      [
        ...Stress.ThousandFalseList,
        ...Stress.ThousandFalseList,
        true,
        true,
        true
      ]
    >,
    true
  >,
  /**
   * Array of 2000 mixed booleans
   */
  Test.Expect<
    $<
      Boolean.XnorAll,
      [...Stress.ThousandBooleanList, ...Stress.ThousandBooleanList]
    >,
    false
  >
]
