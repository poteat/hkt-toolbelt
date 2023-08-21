import { $, Kind, List, Number, Test } from '..'

type Parameters_Spec = [
  /**
   * Returns empty tuple for fully applied function
   */
  Test.Expect<
    $<Kind.Parameters, $<$<$<List.Reduce, never>, never>, never>>,
    []
  >,

  /**
   * Returns tuple of length one for partially applied function expecting one more argument.
   */
  Test.Expect<$<Kind.Parameters, $<$<List.Reduce, never>, never>>, [List.List]>,

  /**
   * Returns tuple of length two for partially applied function expecting two more arguments.
   */
  Test.Expect<$<Kind.Parameters, $<List.Reduce, never>>, [unknown, List.List]>,

  /**
   * Returns tuple of length three for 3-ary function.
   */
  Test.Expect<
    $<Kind.Parameters, List.Reduce>,
    [Kind.Kind<(x: never) => Kind.Kind>, unknown, List.List]
  >,

  /**
   * Returns empty tuple for fully applied function
   */
  Test.Expect<
    $<Kind.Parameters, $<$<$<$<List.Splice, never>, never>, never>, never>>,
    []
  >,

  /**
   * Returns tuple of length one for partially applied function expecting one more argument.
   */
  Test.Expect<
    $<Kind.Parameters, $<$<$<List.Splice, never>, never>, never>>,
    [List.List]
  >,

  /**
   * Returns tuple of length two for partially applied function expecting two more arguments.
   */
  Test.Expect<
    $<Kind.Parameters, $<$<List.Splice, never>, never>>,
    [List.List, List.List]
  >,

  /**
   * Returns tuple of length three for partially applied function expecting three more arguments.
   */
  Test.Expect<
    $<Kind.Parameters, $<List.Splice, never>>,
    [Number.Number, List.List, List.List]
  >,

  /**
   * Returns tuple of length four for 4-ary function.
   */
  Test.Expect<
    $<Kind.Parameters, List.Splice>,
    [Number.Number, Number.Number, List.List, List.List]
  >,

  /**
   * Emits error for non-kind input
   */
  // @ts-expect-error
  Test.Expect<$<Kind.Parameters, number>, never>
]
