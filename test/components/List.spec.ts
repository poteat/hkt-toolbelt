import $, {
  List,
  Conditional,
  Test,
  Function,
  Kind,
  String,
} from "hkt-toolbelt";

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

type Includes_Spec = [
  /**
   * Can determine existence of elements in a tuple
   */
  Test.Expect<$<List.Includes<Conditional.Equals<3>>, [1, 2, 3]>>,

  /**
   * Can determine non-existence of elements in a tuple
   */
  Test.ExpectNot<$<List.Includes<Conditional.Equals<4>>, [1, 2, 3]>>,

  /**
   * Empty tuples always result in false on search.
   */
  Test.ExpectNot<$<List.Includes<Function.Constant<true>>, []>>,

  /**
   * Setting a constant inclusion function results in true for non-empty tuples.
   */
  Test.Expect<$<List.Includes<Function.Constant<true>>, [1, 2, 3]>>,

  /**
   * Setting a constant-false inclusion function results in false.
   */
  Test.ExpectNot<$<List.Includes<Function.Constant<false>>, [1, 2, 3]>>,

  /**
   * Can perform complex multidimensional filtering. In this example, select
   * only tuples that contain at least one string.
   */
  Test.Expect<
    Conditional._$equals<
      $<
        List.Filter<List.Includes<Conditional.SubtypeOf<string>>>,
        [[1, 2, 3], [1, 2, 3, "f"], ["a", "b", "c"]]
      >,
      [[1, 2, 3, "f"], ["a", "b", "c"]]
    >
  >,

  /**
   * Non-boolean inclusion check emit an error.
   */
  // @ts-expect-error
  List.Includes<Function.Constant<number>>,

  /**
   * Applying includes to a non-tuple results in an error.
   */
  // @ts-expect-error
  $<List.Includes<Function.Constant<true>>, number>
];

type Append_Spec = [
  /**
   * Can append items.
   */
  Test.Expect<Conditional._$equals<$<List.Push<4>, [1, 2, 3]>, [1, 2, 3, 4]>>,

  /**
   * Will emit an error if applied to a non-tuple.
   */
  // @ts-expect-error
  $<List.Push<4>, number>
];

type Unshift_Spec = [
  /**
   * Can prepend items.
   */
  Test.Expect<
    Conditional._$equals<$<List.Unshift<1>, [2, 3, 4]>, [1, 2, 3, 4]>
  >,

  /**
   * Will emit an error if applied to a non-tuple.
   */
  // @ts-expect-error
  $<List.Unshift<4>, number>
];

type Last_Spec = [
  /**
   * Can extract the last element of a tuple.
   */
  Test.Expect<Conditional._$equals<$<List.Last, [1, 2, 3]>, 3>>,

  /**
   * The last element of an empty tuple is never.
   */
  Test.Expect<Conditional._$equals<$<List.Last, []>, never>>,

  /**
   * The last element of a tuple of indeterminate length is the underlying type.
   */
  Test.Expect<Conditional._$equals<$<List.Last, number[]>, number>>,

  /**
   * When the last element of a tuple is variadic, the last element found is the
   * underlying type under the variadic.
   */
  Test.Expect<
    Conditional._$equals<$<List.Last, [string, ...number[]]>, number>
  >,

  /**
   * When there are elements after a variadic type, the last such element is
   * selected as the last element.
   */
  Test.Expect<
    Conditional._$equals<$<List.Last, [string, ...number[], "foo"]>, "foo">
  >,

  /**
   * The last element of a one-tuple is the one element.
   */
  Test.Expect<Conditional._$equals<$<List.Last, [string]>, string>>
];

type Pair_Spec = [
  /**
   * Can generate a tuple of pairs from a tuple, where each element is paired
   * with the next element.
   */
  Test.Expect<
    Conditional._$equals<$<List.Pair, [1, 2, 3, 4]>, [[1, 2], [2, 3], [3, 4]]>
  >,

  /**
   * The pair of an empty tuple is an empty tuple.
   */
  Test.Expect<Conditional._$equals<$<List.Pair, []>, []>>,

  /**
   * The pair of a one-tuple is an empty tuple.
   */
  Test.Expect<Conditional._$equals<$<List.Pair, [1]>, []>>,

  /**
   * The pair of a two-tuple is a one-tuple.
   */
  Test.Expect<Conditional._$equals<$<List.Pair, [1, 2]>, [[1, 2]]>>,

  /**
   * The pair of a tuple of indeterminate length is a tuple of pairs of
   * indeterminate length.
   */
  Test.Expect<Conditional._$equals<$<List.Pair, number[]>, [number, number][]>>,

  /**
   * When a variadic is introduced in a pair, it fuzzes the type of the pair.
   */
  Test.Expect<
    Conditional._$equals<
      $<List.Pair, [string, ...number[]]>,
      [string | number, string | number][]
    >
  >
];

type Every_Spec = [
  /**
   * Can determine if every element in a tuple satisfies a predicate.
   */
  Test.Expect<$<List.Every<Conditional.SubtypeOf<number>>, [1, 2, 3]>>,

  /**
   * Can determine if every element in a tuple does not satisfy a predicate.
   */
  Test.ExpectNot<$<List.Every<Conditional.SubtypeOf<number>>, [1, 2, 3, "x"]>>,

  /**
   * Emits an error if the predicate does not return a boolean.
   */
  // @ts-expect-error
  $<List.Every<Function.Constant<number>>, [1, 2, 3]>,

  /**
   * Emits an error if the provided tuple elements do not match the predicate.
   */
  // @ts-expect-error
  $<List.Every<String.StartsWith<"foo">>, [1, 2, 3]>
];
