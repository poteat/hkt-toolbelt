import { $, Kind, List, NaturalNumber, Number, String, Test } from '..'

type Add2 = $<NaturalNumber.Add, 2>
type ReduceAdd = $<List.Reduce, NaturalNumber.Add>
type ReduceAdd0 = $<ReduceAdd, 0>

type InputOf_Spec = [
  Test.Expect<$<Kind.InputOf, Add2>, Number.Number>,

  Test.Expect<$<Kind.InputOf, ReduceAdd>, unknown>,

  Test.Expect<$<Kind.InputOf, ReduceAdd0>, unknown[]>,

  /**
   * Commutative with respect to unions.
   */
  Test.Expect<$<Kind.InputOf, Add2 | String.Length>, Number.Number | string>
]
