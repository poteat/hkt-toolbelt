import { $, String, Test } from "hkt-toolbelt";

type IsTemplate_Spec = [
  /**
   * A template literal string is a template literal string.
   */
  Test.Expect<$<String.IsTemplate, `foo${string}`>, true>,

  /**
   * A string is not a template literal string.
   */
  Test.Expect<$<String.IsTemplate, string>, false>,

  /**
   * A literal string is not a template literal string.
   */
  Test.Expect<$<String.IsTemplate, "foo">, false>,

  /**
   * An empty string is not a template literal string.
   */
  Test.Expect<$<String.IsTemplate, "">, false>,

  /**
   * A template literal string can begin with `string`.
   */
  Test.Expect<$<String.IsTemplate, `${string}foo`>, true>,

  /**
   * An error is thrown if the input is not a string.
   */
  // @ts-expect-error
  Test.Expect<$<String.IsTemplate, number>, true>,

  /**
   * `${string}` is equal to `string` and therefore is not a template literal
   * string.
   */
  Test.Expect<$<String.IsTemplate, `${string}`>, false>
];
