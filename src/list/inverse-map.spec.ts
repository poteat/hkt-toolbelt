import { $, Conditional, Function, List, Test } from '..'

type InverseMap_Spec = [
  /**
   * InverseMap can execute conditionals over tuples.
   */
  Test.Expect<
    $<
      $<
        List.InverseMap,
        [$<Conditional.Equals, 'foo'>, $<Conditional.Equals, 'bar'>]
      >,
      'foo'
    >,
    [true, false]
  >,

  /**
   * Empty function list input corresponds to empty output.
   */
  Test.Expect<$<$<List.InverseMap, []>, null>, []>,

  /**
   * Non-tuple input emits a compiler error
   */
  // @ts-expect-error
  $<$<List.InverseMap, Function.Identity>, number>,

  /**
   * InverseMapping over identity results in the same tuple.
   */
  Test.Expect<
    $<$<List.InverseMap, [Function.Identity, Function.Identity]>, 'foo'>,
    ['foo', 'foo']
  >,

  /**
   * InverseMapping over constant results in a tuple solely composed of such elements.
   */
  Test.Expect<
    $<
      $<
        List.InverseMap,
        [$<Function.Constant, 'foo'>, $<Function.Constant, 'bar'>]
      >,
      null
    >,
    ['foo', 'bar']
  >
]
