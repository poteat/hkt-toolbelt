import { $, Kind, NaturalNumber, Test } from '..'

type JuxtN_Spec = [
  /**
   * Apply a list of n-arity kinds to a value.
   */
  Test.Expect<
    $<$<$<Kind.JuxtN, [NaturalNumber.Increment, NaturalNumber.Add]>, 1>, 5>,
    [2, 6]
  >
]

it('should apply a list of n-arity kinds to a value', () => {
  expect(
    Kind.juxtN([NaturalNumber.increment, NaturalNumber.add])(1)(5)
  ).toEqual([2, 6])
})
