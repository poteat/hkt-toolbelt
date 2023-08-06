import { $, String, Test, Stress } from "..";

type Length_Spec = [
  /**
   * Can get the length of 1000 characters.
   */
  Test.Expect<$<String.Length, Stress.ThousandString>, 1000>
];
