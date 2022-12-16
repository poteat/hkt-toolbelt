import { $, Test, String } from "..";

type FromList_Spec = [
  /**
   * [a, b, c] => abc
   */
  Test.Expect<$<String.FromList, ["a", "b", "c"]>, "abc">,

  /**
   * [] => ""
   */
  Test.Expect<$<String.FromList, []>, "">,

  /**
   * "foo", "bar" => foobar
   */
  Test.Expect<$<String.FromList, ["foo", "bar"]>, "foobar">
];
