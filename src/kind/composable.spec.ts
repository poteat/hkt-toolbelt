import { $, Function, Kind, List, String, Test } from "hkt-toolbelt";

type Composable_Spec = [
  /**
   * Simple list operations should be composable.
   */
  Test.Expect<$<Kind.Composable, [$<List.Push, "foo">, $<List.Unshift, "bar">]>>,

  /**
   * The empty tuple should be composable.
   */
  Test.Expect<$<Kind.Composable, []>>,

  /**
   * Any single kind should be composable.
   */
  Test.Expect<$<Kind.Composable, [$<List.Push, "foo">]>>,

  /**
   * List and string operations are usually not composable.
   */
  Test.ExpectNot<
    $<Kind.Composable, [$<String.StartsWith, "foo">, $<List.Push, "foo">]>
  >,

  /**
   * If a Constant type emits a value of a different type than the input type,
   * then it is not composable.
   */
  Test.ExpectNot<
    $<Kind.Composable, [$<List.Push, "foo">, $<Function.Constant, "bar">]>
  >
];
