import { $, Conditional, Function, List, Test } from '..'

type Map_Spec = [
  /**
   * MapN can execute apply conditional to list of tuples with length 4.
   */
  Test.Expect<
    $<
      $<List.MapN, Conditional.If>,
      [
        [
          $<Conditional.Extends, string>,
          $<Function.Constant, true>,
          $<Function.Constant, false>,
          'hello'
        ],
        [
          $<Conditional.Extends, boolean>,
          $<Function.Constant, true>,
          $<Function.Constant, false>,
          'world'
        ]
      ]
    >,
    [true, false]
  >
]
