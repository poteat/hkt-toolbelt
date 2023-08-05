import { $, Conditional, Test, List, NaturalNumber } from "hkt-toolbelt"

type EqualsAll_Spec = [
  /**
   * An empty array or an array of one element always returns true.
   */
  Test.Expect<$<Conditional.EqualsAll, []>, true>,
  Test.Expect<$<Conditional.EqualsAll, [true]>, true>,
  Test.Expect<$<Conditional.EqualsAll, [false]>, true>,

  /**
   * A non-array is not a valid argument.
   */
  // @ts-expect-error
  Test.Expect<$<Conditional.EqualsAll, true>, true>,

  /**
   * An array whose elements are all identical always returns true.
   */
  Test.Expect<$<Conditional.EqualsAll, [never, never]>, true>,
  Test.Expect<$<Conditional.EqualsAll, [unknown, unknown]>, true>,
  Test.Expect<$<Conditional.EqualsAll, [true, true, true]>, true>,
  Test.Expect<$<Conditional.EqualsAll, [false, false, false]>, true>,
  Test.Expect<
    $<Conditional.EqualsAll, [number, number, number, number, number, number]>,
    true
  >,
  Test.Expect<
    $<
      Conditional.EqualsAll,
      [boolean, boolean, boolean, boolean, boolean, boolean]
    >,
    true
  >,

  /**
   * An array whose elements are all identical except for one element always returns false.
   */
  Test.Expect<$<Conditional.EqualsAll, [true, false]>, false>,
  Test.Expect<$<Conditional.EqualsAll, [unknown, never]>, false>,
  Test.Expect<
    $<Conditional.EqualsAll, [true, false, true, true, true, true, true]>,
    false
  >,

  /**
   * Can correctly evaluate the identity of complex type expressions.
   */
  Test.Expect<
    $<
      Conditional.EqualsAll,
      [PropertyKey, string | number | symbol, keyof any]
    >,
    true
  >,
  Test.Expect<
    $<Conditional.EqualsAll, [string | number, number | string]>,
    true
  >,
  Test.Expect<
    $<Conditional.EqualsAll, [string, string & { length: 3 }]>,
    false
  >,
  Test.Expect<
    $<
      Conditional.EqualsAll,
      [
        $<$<$<List.Reduce, NaturalNumber.Add>, 0>, [1, 2, 3, 4, 5]>,
        $<$<NaturalNumber.Subtract, 20>, 5>,
        15
      ]
    >,
    true
  >
]
