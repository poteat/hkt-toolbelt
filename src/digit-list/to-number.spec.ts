import { $, Test, DigitList } from 'hkt-toolbelt'

type ToNumber_Spec = [
  /**
   * Can convert a digit list to a number.
   */
  Test.Expect<$<DigitList.ToNumber, ['1', '2', '3']>, 123>,
  Test.Expect<$<DigitList.ToNumber, ['4', '5', '6']>, 456>,
  Test.Expect<$<DigitList.ToNumber, ['7', '8', '9']>, 789>,

  /**
   * Can convert a single digit list to a number.
   */
  Test.Expect<$<DigitList.ToNumber, ['5']>, 5>,

  /**
   * Converting a non-digit list is an error.
   */
  // @ts-expect-error
  $<DigitList.ToNumber, ['1', '2', '3', 'a']>
]
