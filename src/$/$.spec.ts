import { $, $$, Function, String, Test } from "..";

type $_Spec = [
  /**
   * $ can apply kinds to types.
   */
  Test.Expect<$<Function.Identity, number>, number>,

  /**
   * $ enforces kind inputs.
   */
  // @ts-expect-error
  $<String.StartsWith<"foo">, number>,

  /**
   * $ will emit an error on non-kinds.
   */
  // @ts-expect-error
  $<number, number>
];
