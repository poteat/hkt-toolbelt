import { $, $N, List, Kind, String, Test } from "hkt-toolbelt"

type Apply_Spec = [
  /**
   * "foo" --> [3, "FOO"]
   */
  Test.Expect<
    $N<List.Map, [$<Kind.Apply, "foo">, [String.Length, String.ToUpper]]>,
    [3, "FOO"]
  >
]
