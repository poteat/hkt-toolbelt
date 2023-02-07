import { $, Function, Kind, List, String, Test } from "hkt-toolbelt";

type Compose_Spec = [
  /**
   * Can compose simple operations.
   */
  Test.Expect<
    $<$<Kind.Compose, [$<List.Push, "bar">, List.Unshift<"foo">]>, [1, 2, 3]>,
    ["foo", 1, 2, 3, "bar"]
  >,

  /**
   * Composition of non-kinds emits an error.
   */
  // @ts-expect-error
  Kind.Compose<[number, string]>,

  /**
   * Composition of an empty tuple of kinds is equal to the identity function.
   */
  Test.Expect<$<Kind.Compose, []>, Function.Identity>,

  /**
   * Composition occurs from right-to-left, consistent with standard math.
   */
  Test.Expect<
    $<$<Kind.Compose, [$<List.Push, "bar">, $<List.Push, "foo">]>, [1, 2, 3]>,
    [1, 2, 3, "foo", "bar"]
  >,

  /**
   * Passing in a data type which is not a valid parameter of the composition
   * results in a type error.
   */
  // @ts-expect-error
  $<Kind.Compose<[$<List.Push, "bar">]>, number>,

  /**
   * Incompatible kinds in the composition emit a type error. That is, the
   * output of kind $N$ must be a subtype of the input of kind $N-1$.
   */
  // @ts-expect-error
  $<Kind.Compose<[String.StartsWith<"foo">, $<List.Push, "bar">]>, []>,

  /**
   * String operations may be composed.
   */
  Test.Expect<
    $<
      $<Kind.Compose, [$<String.EndsWith, "bar">, $<String.Append, "bar">]>,
      "foobar"
    >
  >
];
