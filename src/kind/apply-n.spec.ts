import {
  $,
  $N,
  Kind,
  Function,
  Conditional,
  List,
  String,
  Test
} from 'hkt-toolbelt'

type ApplyN_Spec = [
  /**
   * Can apply kinds to types.
   */
  Test.Expect<
    $<$<Kind.ApplyN, [Function.Identity, [number]]>, List.Map>,
    [number]
  >,

  /**
   * Can apply never
   */
  Test.Expect<$<$<Kind.ApplyN, [never]>, Function.Identity>, never>,
  Test.Expect<
    $<
      $<Kind.ApplyN, [never]>,
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
          $<Kind.ApplyN, [$<Function.Constant, null>]>,
          $N<Conditional.If, [$<Conditional.Equals, 1>, Function.Identity]>
        >,
        $<List.Times, 3>
      ]
    >,
    [null, 1, null]
  >,

  /**
   * Can loop through a list of kinds and apply them to an input.
   */
  Test.Expect<
    $<
      $<List.Map, $<Kind.ApplyN, ['qux']>>,
      [$<String.Prepend, 'foo'>, $<String.Append, 'bar'>, String.ToUpper]
    >,
    ['fooqux', 'quxbar', 'QUX']
  >,

  Test.Expect<
    $N<
      List.Map,
      [
        $<Kind.Apply, number | symbol>,
        $N<
          List.Map,
          [
            $<
              Kind.ApplyN,
              [$<Function.Constant, true>, $<Function.Constant, false>]
            >,
            [
              $<Conditional.If, $<Conditional.Extends, never>>,
              $<Conditional.If, $<Conditional.Extends, string>>,
              $<Conditional.If, $<Conditional.Extends, number | symbol>>
            ]
          ]
        >
      ]
    >,
    [false, false, true]
  >,

  Test.Expect<
    $N<
      List.Map,
      [
        $<$<Kind.ApplyN, [0, 1, ['new']]>, List.Splice>,
        [['old', 1, 2], ['old', 3, 4]]
      ]
    >,
    [['new', 1, 2], ['new', 3, 4]]
  >,

  /**
   * $ enforces list inputs.
   */
  // @ts-expect-error
  $<$<Kind.Apply, number>, String.StartsWith<'foo'>>,

  /**
   * $ will emit an error on non-kinds.
   */
  // @ts-expect-error
  $<$<Kind.Apply, [number]>, number>
]
