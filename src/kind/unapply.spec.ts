import { $, Kind, NaturalNumber, List, Test } from '..'

type Add2 = $<NaturalNumber.Add, 2>
type ReduceAdd = $<List.Reduce, NaturalNumber.Add>
type ReduceAdd0 = $<ReduceAdd, 0>

type Unapply_Spec = [
  Test.Expect<$<$<Kind.Unapply, NaturalNumber.Add>, Add2>, 2>,

  Test.Expect<$<$<Kind.Unapply, List.Reduce>, ReduceAdd>, NaturalNumber.Add>,

  Test.Expect<$<$<Kind.Unapply, ReduceAdd>, ReduceAdd0>, 0>
]
