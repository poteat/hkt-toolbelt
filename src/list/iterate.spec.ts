import { $, Boolean, Number, NaturalNumberTheory, Function, List, Test } from "hkt-toolbelt";

type Iterate_Spec = [
  /**
   * Can iterate over identity function.
   */
  Test.Expect<
    $<$<$<List.Iterate, Function.Identity>, 5>, "a">,
    ["a", "a", "a", "a", "a"]
  >,

  /**
   * Can iterate Xor bit flips
   */
  Test.Expect<
    $<$<$<List.Iterate, $<Boolean.Xor, true>>, 5>, true>,
    [true, false, true, false, true]
  >,

  Test.Expect<
    $<$<$<List.Iterate, $<Boolean.Xor, true>>, 5>, false>,
    [false, true, false, true, false]
  >,

  /**
   * Can iterate over Negate
   */
  Test.Expect<
    $<$<$<List.Iterate, Number.Negate>, 5>, 1>,
    [1, -1, 1, -1, 1]
  >,

  Test.Expect<
    $<$<$<List.Iterate, Number.Negate>, 5>, -1>,
    [-1, 1, -1, 1, -1]
  >,

  /**
   * Can iterate over Factorial
   */
  Test.Expect<
    $<$<$<List.Iterate, NaturalNumberTheory.Factorial>, 4>, -1>,
    [-1, 0, 1, 1]
  >,

  Test.Expect<
    $<$<$<List.Iterate, NaturalNumberTheory.Factorial>, 2>, 4>,
    [4, 24]
  >
];
