import { $, $N, Conditional, Function, NaturalNumber, Test } from '..'

type IsLessThan5 = $N<
  Conditional.If,
  [
    $<NaturalNumber.IsLessThan, 5>,
    $<Function.Constant, 'yes'>,
    $<Function.Constant, 'no'>
  ]
>

type $N_Spec = [
  /**
   * 4 less than 5 => yes
   */
  Test.Expect<$<IsLessThan5, 4>, 'yes'>,

  /**
   * Type errors for wrong input types
   */
  $N<
    Conditional.If,
    [$<NaturalNumber.IsLessThan, 5>, 'yes', $<Function.Constant, 'no'>]
  >
]
