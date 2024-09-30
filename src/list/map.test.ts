import { $, $N, Conditional, Function, List, NaturalNumber, Test } from '..'

type Map_Spec = [
  /**
   * Map can execute conditionals over tuples.
   */
  Test.Expect<
    $<$<List.Map, $<Conditional.Equals, 'foo'>>, ['foo', 'bar']>,
    [true, false]
  >,

  /**
   * Empty input corresponds to empty output.
   */
  Test.Expect<$<$<List.Map, $<Conditional.Equals, 'foo'>>, []>, []>,

  /**
   * Non-tuple input emits a compiler error
   */
  // @ts-expect-error
  $<List.Map<Function.Identity>, number>,

  /**
   * Mapping over identity results in the same tuple.
   */
  Test.Expect<
    $<$<List.Map, Function.Identity>, ['foo', 'bar']>,
    ['foo', 'bar']
  >,

  /**
   * Mapping over constant results in a tuple solely composed of such elements.
   */
  Test.Expect<
    $<$<List.Map, $<Function.Constant, 'foo'>>, ['foo', 'bar']>,
    ['foo', 'foo']
  >,

  /**
   * Can be used in its partially applied form as an input for a higher-order map operation over nested tuples.
   */
  Test.Expect<
    $N<
      List.Map,
      [
        $<
          List.Map,
          $N<
            Conditional.If,
            [
              $<Conditional.Equals, 1>,
              Function.Identity,
              $<Function.Constant, null>
            ]
          >
        >,
        $<$<List.Repeat, $<List.Times, 3>>, 2>
      ]
    >,
    [[null, 1, null], [null, 1, null]]
  >
]

it('should map a kind over a list', () => {
  expect(List.map(Function.constant('foo'))(['foo', 'bar'])).toEqual([
    'foo',
    'foo'
  ])
})

it('should map a modifying kind over a list', () => {
  expect(List.map(NaturalNumber.increment)([1, 2, 3])).toEqual([2, 3, 4])
})
