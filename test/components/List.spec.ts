import $, { List, Conditional, Test, Function, Kind } from "hkt-toolbelt";

type Map_Spec = [
  /**
   * Map can execute conditionals over tuples.
   */
  Test.Expect<
    Conditional._$equals<
      $<List.Map<Conditional.Equals<"foo">>, ["foo", "bar"]>,
      [true, false]
    >
  >,

  /**
   * Empty input corresponds to empty output.
   */
  Test.Expect<
    Conditional._$equals<$<List.Map<Conditional.Equals<"foo">>, []>, []>
  >,

  /**
   * Non-tuple input emits a compiler error
   */
  // @ts-expect-error
  $<List.Map<Function.Identity>, number>,

  /**
   * Mapping over identity results in the same tuple.
   */
  Test.Expect<
    Conditional._$equals<
      $<List.Map<Function.Identity>, ["foo", "bar"]>,
      ["foo", "bar"]
    >
  >,

  /**
   * Mapping over constant results in a tuple solely composed of such elements.
   */
  Test.Expect<
    Conditional._$equals<
      $<List.Map<Function.Constant<"foo">>, ["foo", "bar"]>,
      ["foo", "foo"]
    >
  >
];

type Find_Spec = [
  /**
   * Can find a number present in a tuple.
   */
  Test.Expect<
    Conditional._$equals<$<List.Find<Conditional.Equals<3>>, [1, 2, 3]>, 3>
  >,

  /**
   * Searching for a non-existent element returns `never`.
   */
  Test.Expect<
    Conditional._$equals<$<List.Find<Conditional.Equals<4>>, [1, 2, 3]>, never>
  >,

  /**
   * Can find elements according to dynamic conditions.
   */
  Test.Expect<
    Conditional._$equals<
      $<List.Find<Conditional.SubtypeOf<string>>, [1, 2, 3, "foo", "bar"]>,
      "foo"
    >
  >,

  /**
   * Non-boolean returning find functions emit an error.
   */
  // @ts-expect-error
  List.Find<Function.Identity>
];

type Filter_Spec = [
  /**
   * Can filter specific elements in a tuple.
   */
  Test.Expect<
    Conditional._$equals<
      $<List.Filter<Conditional.Equals<3>>, [1, 2, 3, 3]>,
      [3, 3]
    >
  >,

  /**
   * Can perform dynamic subtype checks.
   */
  Test.Expect<
    Conditional._$equals<
      $<List.Filter<Conditional.SubtypeOf<string>>, [1, "f", 2, "g", 3]>,
      ["f", "g"]
    >
  >,

  /**
   * Filtering an empty tuple results in an empty tuple.
   */
  Test.Expect<
    Conditional._$equals<$<List.Filter<Function.Constant<true>>, []>, []>
  >,

  /**
   * Filtering with a constant true condition results in the same tuple.
   */
  Test.Expect<
    Conditional._$equals<
      $<List.Filter<Function.Constant<true>>, [1, 2, 3]>,
      [1, 2, 3]
    >
  >,

  /**
   * Filtering with a constant false condition results in the empty tuple.
   */
  Test.Expect<
    Conditional._$equals<
      $<List.Filter<Function.Constant<false>>, [1, 2, 3]>,
      []
    >
  >,

  /**
   * Non-boolean returning filter functions emit an error.
   */
  // @ts-expect-error
  List.Filter<Function.Constant<number>>,

  /**
   * Non-kind filter parameters result in a compilation error.
   */
  // @ts-expect-error
  List.Filter<number>,

  /**
   * Values can be applied to a filter function using Apply.
   */
  Test.Expect<
    Conditional._$equals<
      $<
        Kind.Apply<[1, "foo", 2, 3]>,
        List.Filter<Conditional.SubtypeOf<number>>
      >,
      [1, 2, 3]
    >
  >
];
