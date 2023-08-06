import {
  $,
  $$,
  $N,
  Kind,
  Function,
  Conditional,
  List,
  String,
  Test
} from "hkt-toolbelt";

type Apply_Spec = [
  /**
   * Can apply kinds to types.
   */
  Test.Expect<$<$<Kind.Apply, number>, Function.Identity>, number>,

  /**
   * Can apply never
   */
  Test.Expect<$<$<Kind.Apply, never>, Function.Identity>, never>,
  Test.Expect<
    $<
      $<Kind.Apply, never>,
      $N<
        Conditional.If,
        [
          $<Conditional.Extends, never>,
          $<Function.Constant, true>,
          $<Function.Constant, false>
        ]
      >
    >,
    true
  >,

  /**
   * Can be used in its partially applied form.
   */
  Test.Expect<
    $N<
      List.Map,
      [
        $<
          $<Kind.Apply, $<Function.Constant, null>>,
          $N<Conditional.If, [$<Conditional.Equals, 1>, Function.Identity]>
        >,
        $<List.Times, 3>
      ]
    >,
    [null, 1, null]
  >,

  /**
   * $ enforces kind inputs.
   */
  // @ts-expect-error
  $<$<Kind.Apply, number>, String.StartsWith<"foo">>,

  /**
   * $ will emit an error on non-kinds.
   */
  // @ts-expect-error
  $<$<Kind.Apply, number>, number>
];
