import { $, Test, NaturalNumber } from '..'

type ToList_Spec = [
  /**
   * Can convert large numbers to a list of digits.
   */
  Test.Expect<
    $<NaturalNumber.ToList, 1234567890>,
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  >
]
