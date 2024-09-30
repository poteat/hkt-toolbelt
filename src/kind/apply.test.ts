import { $, $N, Kind, Function, Conditional, List, String, Test } from '..'

type Apply_Spec = [
  /**
   * Can apply kinds to types.
   */
  Test.Expect<$<$<Kind.Apply, number>, Function.Identity>, number>,

  /**
   * Can apply never
   */
  Test.Expect<$<$<Kind.Apply, never>, Function.Identity>, never>,
  Test.Expect<
    $<
      $<Kind.Apply, never>,
      $N<
        Conditional.If,
        [
          $<Conditional.Extends, never>,
          $<Function.Constant, true>,
          $<Function.Constant, false>
        ]
      >
    >,
    true
  >,

  /**
   * Can be used in its partially applied form.
   */
  Test.Expect<
    $N<
      List.Map,
      [
        $<
          $<Kind.Apply, $<Function.Constant, null>>,
          $N<Conditional.If, [$<Conditional.Equals, 1>, Function.Identity]>
        >,
        $<List.Times, 3>
      ]
    >,
    [null, 1, null]
  >,

  /**
   * Can loop through a list of kinds and apply them to an input.
   */
  Test.Expect<
    $<
      $<List.Map, $<Kind.Apply, 'qux'>>,
      [$<String.Prepend, 'foo'>, $<String.Append, 'bar'>, String.ToUpper]
    >,
    ['fooqux', 'quxbar', 'QUX']
  >,

  /**
   * $ enforces kind inputs.
   */
  // @ts-expect-error
  $<$<Kind.Apply, number>, String.StartsWith<'foo'>>,

  /**
   * $ will emit an error on non-kinds.
   */
  // @ts-expect-error
  $<$<Kind.Apply, number>, number>
]

it('should apply a kind to a value', () => {
  expect(Kind.apply('foo')(String.toUpper)).toBe('FOO')
})
