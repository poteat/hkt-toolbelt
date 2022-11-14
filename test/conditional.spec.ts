import { $, Conditional, Function, List, String, Test } from "hkt-toolbelt";

type Equals_Spec = [
  /**
   * A type equals itself.
   */
  Test.Expect<$<Conditional.Equals<true>, true>>,

  /**
   * A type does not equal a different type.
   */
  Test.ExpectNot<$<Conditional.Equals<true>, false>>,

  /**
   * A type does not equal a supertype.
   */
  Test.ExpectNot<$<Conditional.Equals<true>, boolean>>,

  /**
   * True does not equal never.
   */
  Test.ExpectNot<$<Conditional.Equals<true>, never>>,

  /**
   * Never does not equal true.
   */
  Test.ExpectNot<$<Conditional.Equals<never>, true>>
];

type Extends_Spec = [
  /**
   * A type extends itself.
   */
  Test.Expect<$<Conditional.Extends<true>, true>>,

  /**
   * A type extends a subtype.
   */
  Test.Expect<$<Conditional.Extends<boolean>, true>>,

  /**
   * A type does not extend a supertype.
   */
  Test.ExpectNot<$<Conditional.Extends<true>, boolean>>,

  /**
   * A type does not extend a different type.
   */
  Test.ExpectNot<$<Conditional.Extends<string>, number>>
];

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
