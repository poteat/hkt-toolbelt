import { $, Conditional, Function, List, String, Test } from "hkt-toolbelt";

/**
 * Tests associated with `Conditional.If`, which encodes kind-level if-then-else
 * statements.
 */
type If_Spec = [
  /**
   * If-then-else statement with a true predicate.
   */
  Test.Expect<
    $<Conditional.If<Function.Constant<true>, Function.Constant<"foo">>, 0>,
    "foo"
  >,

  /**
   * If-then-else statement with a false predicate.
   */
  Test.Expect<
    $<Conditional.If<Function.Constant<false>, Function.Constant<"foo">>, 0>,
    never
  >,

  /**
   * If-then-else statement with a true predicate and a false alternative.
   */
  Test.Expect<
    $<
      Conditional.If<
        Function.Constant<true>,
        Function.Identity,
        Function.Constant<"bar">
      >,
      "foo"
    >,
    "foo"
  >,

  /**
   * Can be wrapped around other kinds, such as string kinds.
   */
  Test.Expect<
    $<
      List.Map<Conditional.If<String.IsString, String.StartsWith<"foo">>>,
      ["foo", "bar", 42, "foobar"]
    >,
    [true, false, never, true]
  >
];
