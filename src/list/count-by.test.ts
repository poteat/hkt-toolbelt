import { $, Function, List, Test } from '..'

type CountBy_Spec = [
  /**
   * Can count by a predicate.
   */
  Test.Expect<
    $<$<List.CountBy, Function.Identity>, [1, 1, 1, 2, 3]>,
    {
      1: 3
      2: 1
      3: 1
    }
  >,

  /**
   * Can count by a predicate with a constant.
   */
  Test.Expect<
    $<$<List.CountBy, $<Function.Constant, 'foo'>>, ['foo', 'foo', 'bar']>,
    {
      foo: 3
    }
  >,

  /**
   * Can count by a 'length' predicate over lists.
   */
  Test.Expect<
    $<$<List.CountBy, List.Length>, [[1, 2, 3], [1, 2, 3, 4], [1, 2, 3]]>,
    {
      3: 2
      4: 1
    }
  >,

  /**
   * Can gracefully handle variadics. The only thing we can infer is that the
   * resultant value will be a map from strings to numbers.
   */
  Test.Expect<
    $<$<List.CountBy, Function.Identity>, string[]>,
    Record<string, number>
  >
]

it('should return the count of each unique element', () => {
  expect(List.countBy(Function.identity)(['foo', 'foo', 'bar'])).toEqual({
    foo: 2,
    bar: 1
  })
})
