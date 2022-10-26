import $, { Function, Kind, List, String, Test } from "hkt-toolbelt";

type Composable_Spec = [
  /**
   * Simple list operations should be composable.
   */
  Test.Expect<$<Kind.Composable, [List.Push<"foo">, List.Unshift<"bar">]>>,

  /**
   * The empty tuple should be composable.
   */
  Test.Expect<$<Kind.Composable, []>>,

  /**
   * Any single kind should be composable.
   */
  Test.Expect<$<Kind.Composable, [List.Push<"foo">]>>,

  /**
   * List and string operations are usually not composable.
   */
  Test.ExpectNot<
    $<Kind.Composable, [String.StartsWith<"foo">, List.Push<"foo">]>
  >,

  /**
   * If a Constant type emits a value of a different type than the input type,
   * then it is not composable.
   */
  Test.ExpectNot<
    $<Kind.Composable, [List.Push<"foo">, Function.Constant<"bar">]>
  >
];

type Compose_Spec = [
  /**
   * Can compose simple operations.
   */
  Test.Expect<
    $<Kind.Compose<[List.Push<"bar">, List.Unshift<"foo">]>, [1, 2, 3]>,
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
  Test.Expect<Kind.Compose<[]>, Function.Identity>,

  /**
   * Composition occurs from right-to-left, consistent with standard math.
   */
  Test.Expect<
    $<Kind.Compose<[List.Push<"bar">, List.Push<"foo">]>, [1, 2, 3]>,
    [1, 2, 3, "foo", "bar"]
  >,

  /**
   * Passing in a data type which is not a valid parameter of the composition
   * results in a type error.
   */
  // @ts-expect-error
  $<Kind.Compose<[List.Push<"bar">]>, number>,

  /**
   * Incompatible kinds in the composition emit a type error. That is, the
   * output of kind $N$ must be a subtype of the input of kind $N-1$.
   */
  // @ts-expect-error
  $<Kind.Compose<[String.StartsWith<"foo">, List.Push<"bar">]>, []>,

  /**
   * String operations may be composed.
   */
  Test.Expect<
    $<Kind.Compose<[String.EndsWith<"bar">, String.Append<"bar">]>, "foobar">
  >
];

type Pipe_Spec = [
  /**
   * Can pipe simple operations.
   */
  Test.Expect<
    $<Kind.Pipe<[List.Push<"bar">, List.Unshift<"foo">]>, [1, 2, 3]>,
    ["foo", 1, 2, 3, "bar"]
  >,

  /**
   * Pipe of non-kinds emits an error.
   */
  // @ts-expect-error
  Kind.Pipe<[number, string]>,

  /**
   * Pipe of an empty tuple of kinds is equal to the identity function.
   */
  Test.Expect<Kind.Pipe<[]>, Function.Identity>,

  /**
   * Pipe occurs from left-to-right.
   */
  Test.Expect<
    $<Kind.Pipe<[List.Push<"bar">, List.Push<"foo">]>, [1, 2, 3]>,
    [1, 2, 3, "bar", "foo"]
  >,

  /**
   * Passing in a data type which is not a valid parameter of the pipe results
   * in a type error.
   */
  // @ts-expect-error
  $<Kind.Pipe<[List.Push<"bar">]>, number>,

  /**
   * Incompatible kinds in the pipe emit a type error. That is, the output of
   * kind $N$ must be a subtype of the input of kind $N+1$.
   */
  // @ts-expect-error
  $<Kind.Pipe<[List.Push<"bar">, String.StartsWith<"foo">]>, []>,

  /**
   * String operations may be piped.
   */
  Test.Expect<
    $<Kind.Pipe<[String.Append<"bar">, String.EndsWith<"bar">]>, "foobar">
  >,

  /**
   * Can pipe ten operations without hitting the depth limit.
   */
  Test.Expect<
    $<
      Kind.Pipe<
        [
          List.Push<1>,
          List.Push<2>,
          List.Push<3>,
          List.Push<4>,
          List.Push<5>,
          List.Push<6>,
          List.Push<7>,
          List.Push<8>,
          List.Push<9>,
          List.Push<10>
        ]
      >,
      []
    >,
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  >
];
