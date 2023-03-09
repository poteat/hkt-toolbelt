import { $, Test, NaturalNumberTheory } from "hkt-toolbelt"

type FizzBuzz_Spec = [
  /**
   * 15 => FizzBuzz
   */
  Test.Expect<$<NaturalNumberTheory.FizzBuzz, 15>, "FizzBuzz">,

  /**
   * 3 => Fizz
   */
  Test.Expect<$<NaturalNumberTheory.FizzBuzz, 3>, "Fizz">,

  /**
   * 5 => Buzz
   */
  Test.Expect<$<NaturalNumberTheory.FizzBuzz, 5>, "Buzz">,

  /**
   * 1 => 1
   */
  Test.Expect<$<NaturalNumberTheory.FizzBuzz, 1>, 1>,

  /**
   * 2 => 2
   */
  Test.Expect<$<NaturalNumberTheory.FizzBuzz, 2>, 2>,

  /**
   * 4 => 4
   */
  Test.Expect<$<NaturalNumberTheory.FizzBuzz, 4>, 4>
]

type FizzBuzzSequence_Spec = [
  /**
   * FizzBuzz sequence up to 15
   */
  Test.Expect<
    $<NaturalNumberTheory.FizzBuzzSequence, 15>,
    [
      1,
      2,
      "Fizz",
      4,
      "Buzz",
      "Fizz",
      7,
      8,
      "Fizz",
      "Buzz",
      11,
      "Fizz",
      13,
      14,
      "FizzBuzz"
    ]
  >,

  /**
   * Sequence of zero elements
   */
  Test.Expect<$<NaturalNumberTheory.FizzBuzzSequence, 0>, []>,

  /**
   * Non-integral input emits never
   */
  Test.Expect<$<NaturalNumberTheory.FizzBuzzSequence, 1.5>, never>
]
