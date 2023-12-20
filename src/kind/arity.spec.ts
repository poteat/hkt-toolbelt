import { $, Kind, List, Test } from '..'

type Arity_Spec = [
  /**
   * Returns empty tuple for fully applied function
   */
  Test.Expect<$<Kind.Arity, $<$<$<List.Reduce, never>, never>, never>>, 0>,

  /**
   * Returns tuple of length one for partially applied function expecting one more argument.
   */
  Test.Expect<$<Kind.Arity, $<$<List.Reduce, never>, never>>, 1>,

  /**
   * Returns tuple of length two for partially applied function expecting two more arguments.
   */
  Test.Expect<$<Kind.Arity, $<List.Reduce, never>>, 2>,

  /**
   * Returns tuple of length three for 3-ary function.
   */
  Test.Expect<$<Kind.Arity, List.Reduce>, 3>,

  /**
   * Returns empty tuple for fully applied function
   */
  Test.Expect<
    $<Kind.Arity, $<$<$<$<List.Splice, never>, never>, never>, never>>,
    0
  >,

  /**
   * Returns tuple of length one for partially applied function expecting one more argument.
   */
  Test.Expect<$<Kind.Arity, $<$<$<List.Splice, never>, never>, never>>, 1>,

  /**
   * Returns tuple of length two for partially applied function expecting two more arguments.
   */
  Test.Expect<$<Kind.Arity, $<$<List.Splice, never>, never>>, 2>,

  /**
   * Returns tuple of length three for partially applied function expecting three more arguments.
   */
  Test.Expect<$<Kind.Arity, $<List.Splice, never>>, 3>,

  /**
   * Returns tuple of length four for 4-ary function.
   */
  Test.Expect<$<Kind.Arity, List.Splice>, 4>,

  /**
   * Emits error for non-kind input
   */
  // @ts-expect-error
  Test.Expect<$<Kind.Arity, number>, never>
]
