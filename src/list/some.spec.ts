import { $, Conditional, Function, List, String, Test } from '..'

type Some_Spec = [
  /**
   * Can determine if some element in a tuple satisfies a predicate.
   */
  Test.Expect<$<$<List.Some, $<Conditional.Extends, number>>, [1, 2, 3, 'x']>>,

  /**
   * Can determine if some element in a tuple does not satisfy a predicate.
   */
  Test.ExpectNot<
    $<$<List.Some, $<Conditional.Extends, number>>, ['x', 'y', 'z']>
  >,

  /**
   * Always returns false for an empty tuple.
   */
  Test.ExpectNot<$<$<List.Some, $<Conditional.Extends, number>>, []>>,

  /**
   * Emits an error if the predicate does not return a boolean.
   */
  // @ts-expect-error
  $<List.Some<$<Function.Constant, number>>, [1, 2, 3]>,

  /**
   * For all predicates, an empty tuple is false.
   */
  Test.ExpectNot<$<$<List.Some, $<Conditional.Extends, number>>, []>>,

  /**
   * Emits an error if the predicate input type does not match the tuple type.
   */
  // @ts-expect-error
  $<List.Some<String.StartsWith<'foo'>>, [1, 2, 3]>,

  /**
   * Emits an error if the provided tuple elements do not match the predicate.
   */
  // @ts-expect-error
  $<List.Some<String.StartsWith<'foo'>>, [1, 2, 3]>
]
