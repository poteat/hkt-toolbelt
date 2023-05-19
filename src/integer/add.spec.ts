import { $, Test, Integer } from ".."

export type Add_Spec = [
  /**
   * Can add two zeros.
   */
  Test.Expect<$<$<Integer.Add, 0>, 0>, 0>,
  Test.Expect<$<$<Integer.Add, 0>, -0>, 0>,

  /**
   * Can add two positive numbers.
   */
  Test.Expect<$<$<Integer.Add, 5>, 5>, 10>,

  /**
   * Can add two negative numbers.
   */
  Test.Expect<$<$<Integer.Add, -1>, -1>, -2>,
  Test.Expect<$<$<Integer.Add, -7>, -4>, -11>,

  /**
   * Can add a positive number to a negative number.
   */
  Test.Expect<$<$<Integer.Add, -1>, 0>, -1>,
  Test.Expect<$<$<Integer.Add, -1>, 1>, 0>,
  Test.Expect<$<$<Integer.Add, -100>, 1>, -99>,

  /**
   * Can add large numbers.
   */
  Test.Expect<$<$<Integer.Add, 123456789>, 123456789>, 246913578>,
  Test.Expect<$<$<Integer.Add, -123456789>, -123456789>, -246913578>,

  /**
   * Can add numbers as strings.
   */
  Test.Expect<$<$<Integer.Add, "-123456789">, "-123456789">, -246913578>,
  Test.Expect<$<$<Integer.Add, "-123456789">, "123456789">, 0>
]
