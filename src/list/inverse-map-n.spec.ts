import { $, Conditional, Function, List, Test } from '..'

type InverseMapN_Spec = [
  Test.Expect<
    $<
      $<
        List.InverseMapN,
        [
          $<Conditional.If, $<Conditional.Extends, string>>,
          $<Conditional.If, $<Conditional.Extends, number>>
        ]
      >,
      [$<Function.Constant, true>, $<Function.Constant, false>, 'hello world']
    >,
    [true, false]
  >,

  Test.Expect<
    $<
      $<List.InverseMapN, $<$<List.Map, List.Splice>, [0, 1, 2]>>,
      [1, ['x'], ['a', 'b', 'c']]
    >,
    [['x', 'b', 'c'], ['a', 'x', 'c'], ['a', 'b', 'x']]
  >,

  /**
   * Empty function list input corresponds to empty output.
   */
  Test.Expect<$<$<List.InverseMapN, []>, [number]>, []>,

  /**
   * Empty argument list emits error
   */
  // @ts-expect-error
  Test.Expect<$<$<List.InverseMapN, [Function.Identity]>, []>, []>,

  /**
   * Non-tuple input emits a compiler error
   */
  // @ts-expect-error
  $<$<List.InverseMapN, Function.Identity>, []>,
  // @ts-expect-error
  $<$<List.InverseMapN, []>, number>
]
