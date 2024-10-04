import { $, Conditional, Kind, List, Loop, NaturalNumber, Test } from '..'

type Until_Spec = [
  /**
   * Can loop until a number is greater than 10.
   */
  Test.Expect<
    $<
      $<
        $<Loop.Until, $<NaturalNumber.IsGreaterThan, 10>>,
        NaturalNumber.Increment
      >,
      0
    >,
    11
  >,

  /**
   * Can handle growing tuples.
   */
  Test.Expect<
    $<
      $<
        $<Loop.Until, $<Kind.Pipe, [List.Length, $<Conditional.Equals, 10>]>>,
        $<List.Push, 1>
      >,
      [1]
    >,
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  >
]

it('should loop until the stopping predicate is satisfied', () => {
  expect(
    Loop.until(NaturalNumber.isGreaterThan(10))(NaturalNumber.increment)(0)
  ).toBe(11)
})
