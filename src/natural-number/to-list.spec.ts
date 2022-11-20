import { $, Test, NaturalNumber } from "..";

type ToList_Spec = [
  /**
   * Can convert a number to a list of digits.
   */
  Test.Expect<$<NaturalNumber.ToList, 42>, ["4", "2"]>,

  /**
   * Zero is converted to a list of one digit.
   */
  Test.Expect<$<NaturalNumber.ToList, 0>, ["0"]>,

  /**
   * Can convert string-encoded numbers to a list of digits.
   */
  Test.Expect<$<NaturalNumber.ToList, "42">, ["4", "2"]>,

  /**
   * Can convert bigint literals to a list of digits.
   */
  Test.Expect<$<NaturalNumber.ToList, 42n>, ["4", "2"]>,

  /**
   * Converting the 'number' type results in 'never'.
   */
  Test.Expect<$<NaturalNumber.ToList, number>, never>,

  /**
   * Converting the 'string' type results in 'never'.
   */
  Test.Expect<$<NaturalNumber.ToList, string>, never>,

  /**
   * Converting non-natural numbers results in 'never'.
   */
  Test.Expect<$<NaturalNumber.ToList, 42.42>, never>,

  /**
   * Converting negative numbers results in 'never'.
   */
  Test.Expect<$<NaturalNumber.ToList, -42>, never>,

  /**
   * Can convert large numbers to a list of digits.
   */
  Test.Expect<
    $<NaturalNumber.ToList, 1234567890>,
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
  >
];
