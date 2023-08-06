import { $, $N, Conditional, Function, List, String, Test } from "..";

/**
 * Tests associated with `Conditional.If`, which encodes kind-level if-then-else
 * statements.
 */
type If_Spec = [
  /**
   * If-then-else statement with a true predicate.
   */
  Test.Expect<
    $N<
      Conditional.If,
      [
        $<Function.Constant, true>,
        $<Function.Constant, "foo">,
        $<Function.Constant, "bar">,
        0
      ]
    >,
    "foo"
  >,

  /**
   * If-then-else statement with a false predicate.
   */
  Test.Expect<
    $N<
      Conditional.If,
      [
        $<Function.Constant, false>,
        $<Function.Constant, "foo">,
        $<Function.Constant, "bar">,
        0
      ]
    >,
    "bar"
  >,

  /**
   * If-then-else statement with a true predicate and a false alternative.
   */
  Test.Expect<
    $N<
      Conditional.If,
      [
        $<Function.Constant, true>,
        Function.Identity,
        $<Function.Constant, never>,
        "foo"
      ]
    >,
    "foo"
  >,

  /**
   * Works with other boolean utilities.
   */
  Test.Expect<
    $N<
      Conditional.If,
      [
        String.IsString,
        $<String.StartsWith, "foo">,
        $<Function.Constant, never>,
        42
      ]
    >,
    never
  >,

  /**
   * Can be wrapped around other kinds, such as string kinds.
   */
  Test.Expect<
    $N<
      List.Map,
      [
        $N<
          Conditional.If,
          [
            String.IsString,
            $<String.StartsWith, "foo">,
            $<Function.Constant, never>
          ]
        >,
        ["foo", "bar", 42, "foobar"]
      ]
    >,
    [true, false, never, true]
  >
];
