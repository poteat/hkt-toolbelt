import { $, Conditional, Function, List, String, Test } from '..'

type Every_Spec = [
  /**
   * Can determine if every element in a tuple satisfies a predicate.
   */
  Test.Expect<$<$<List.Every, $<Conditional.Extends, number>>, [1, 2, 3]>>,

  /**
   * Can determine if every element in a tuple does not satisfy a predicate.
   */
  Test.ExpectNot<
    $<$<List.Every, $<Conditional.Extends, number>>, [1, 2, 3, 'x']>
  >,

  /**
   * Emits an error if the predicate does not return a boolean.
   */
  // @ts-expect-error
  $<List.Every<$<Function.Constant, number>>, [1, 2, 3]>,

  /**
   * Emits an error if the predicate input type does not match the tuple type.
   */
  // @ts-expect-error
  $<List.Every<String.StartsWith<'foo'>>, [1, 2, 3]>,

  /**
   * Emits an error if the provided tuple elements do not match the predicate.
   */
  // @ts-expect-error
  $<List.Every<String.StartsWith<'foo'>>, [1, 2, 3]>
]

it('should check if all elements of the list satisfy the predicate', () => {
  expect(List.every(String.isString)(['foo', 'bar'])).toBe(true)
})
