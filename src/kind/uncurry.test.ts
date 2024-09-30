import { $, Kind, Function, NaturalNumber, Conditional, Test, String } from '..'

type UncurriedIf = $<Kind.Uncurry, Conditional.If>

type IsLessThan5 = $<
  UncurriedIf,
  [
    $<NaturalNumber.IsLessThan, 5>,
    $<Function.Constant, 'yes'>,
    $<Function.Constant, 'no'>
  ]
>

type $N_Spec = [
  /**
   * 4 less than 5 => yes
   */
  Test.Expect<$<IsLessThan5, 4>, 'yes'>,

  /**
   * Can be applied to string kinds.
   */
  Test.Expect<$<$<Kind.Uncurry, String.Append>, ['foo', 'bar']>, 'barfoo'>
]

it('should return the result of applying the kind to each argument', () => {
  expect(Kind.uncurry(String.append)(['foo', 'bar'])).toBe('barfoo')
})
