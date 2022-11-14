import { $, $$, Function, Kind, List, String, Test } from "hkt-toolbelt";

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

type $$_Spec = [
  /**
   * Can pipe simple operations.
   */
  Test.Expect<
    $$<[List.Push<"bar">, List.Unshift<"foo">], [1, 2, 3]>,
    ["foo", 1, 2, 3, "bar"]
  >,

  /**
   * Pipe of non-kinds emits an error.
   */
  // @ts-expect-error
  $$<[number, string]>,

  /**
   * Pipe of an empty tuple of kinds is equal to the identity function.
   */
  Test.Expect<$$<[], "foo">, "foo">,

  /**
   * Pipe occurs from left-to-right.
   */
  Test.Expect<
    $$<[List.Push<"bar">, List.Push<"foo">], [1, 2, 3]>,
    [1, 2, 3, "bar", "foo"]
  >,

  /**
   * Passing in a data type which is not a valid parameter of the pipe results
   * in a type error.
   */
  // @ts-expect-error
  $$<[List.Push<"bar">], number>,

  /**
   * Incompatible kinds in the pipe emit a type error. That is, the output of
   * kind $N$ must be a subtype of the input of kind $N+1$.
   */
  // @ts-expect-error
  $$<[String.StartsWith<"foo">, List.Push<"bar">], []>,

  /**
   * String operations may be piped.
   */
  Test.Expect<
    $<Kind.Pipe<[String.Append<"bar">, String.EndsWith<"bar">]>, "foobar">
  >
];
