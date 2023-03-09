import {
  $,
  Kind,
  Function,
  NaturalNumber,
  Conditional,
  Test,
} from "hkt-toolbelt"

type UncurriedIf = $<Kind.Uncurry, Conditional.If>

type IsLessThan5 = $<
  UncurriedIf,
  [
    $<NaturalNumber.IsLessThan, 5>,
    $<Function.Constant, "yes">,
    $<Function.Constant, "no">
  ]
>

type $N_Spec = [
  /**
   * 4 less than 5 => yes
   */
  Test.Expect<$<IsLessThan5, 4>, "yes">
]
