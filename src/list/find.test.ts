import { $, Conditional, Function, List, Test, Type } from '..'

type Find_Spec = [
  /**
   * Can find a number present in a tuple.
   */
  Test.Expect<$<$<List.Find, $<Conditional.Equals, 3>>, [1, 2, 3]>, 3>,

  /**
   * Searching for a non-existent element returns `never`.
   */
  Test.Expect<$<$<List.Find, $<Conditional.Equals, 4>>, [1, 2, 3]>, never>,

  /**
   * Can find elements according to dynamic conditions.
   */
  Test.Expect<
    $<$<List.Find, $<Conditional.Extends, string>>, [1, 2, 3, 'foo', 'bar']>,
    'foo'
  >,

  /**
   * Non-boolean returning find functions emit an error.
   */
  // @ts-expect-error
  List.Find<Function.Identity>
]

it('should return the first element in the list that satisfies the predicate', () => {
  expect(List.find(Function.constant(true))([1, 2, 3])).toBe(1)
})

it('should return never if no element in the list satisfies the predicate', () => {
  expect(List.find(Function.constant(false))([1, 2, 3])).toBe(Type.never)
})
