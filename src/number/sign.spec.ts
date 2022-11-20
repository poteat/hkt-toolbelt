import { $, Test, Number } from "..";

export type Sign_Spec = [
  /**
   * Can get the sign of a positive number.
   */
  Test.Expect<$<Number.Sign, 42>, "+">,

  /**
   * Can get the sign of a negative number.
   */
  Test.Expect<$<Number.Sign, -42>, "-">,

  /**
   * Can get the sign of zero.
   */
  Test.Expect<$<Number.Sign, 0>, "+">,

  /**
   * Can get the sign of a positive floating point number.
   */
  Test.Expect<$<Number.Sign, 42.42>, "+">,

  /**
   * Can get the sign of a negative floating point number.
   */
  Test.Expect<$<Number.Sign, -42.42>, "-">,

  /**
   * The sign of `number` is plus or minus.
   */
  Test.Expect<$<Number.Sign, number>, "+" | "-">
];
