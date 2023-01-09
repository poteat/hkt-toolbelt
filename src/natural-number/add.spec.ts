import { $, Test, NaturalNumber } from ".."

export type Add_Spec = [
  /**
   * Can add two numbers.
   */
  Test.Expect<$<$<NaturalNumber.Add, 0>, 0>, 0>,

  /**
   * Can add two numbers.
   */
  Test.Expect<$<$<NaturalNumber.Add, 5>, 5>, 10>,

  /**
   * Can add two numbers.
   */
  Test.Expect<$<$<NaturalNumber.Add, 7>, 4>, 11>,

  /**
   * Adding a non-natural number emits never.
   */
  Test.Expect<$<NaturalNumber.Add, -1>, never>,

  /**
   * Can add large numbers.
   */
  Test.Expect<$<$<NaturalNumber.Add, 123456789>, 123456789>, 246913578>,

  /**
   * Can add numbers as strings.
   */
  Test.Expect<$<$<NaturalNumber.Add, "123456789">, "123456789">, 246913578>
]
