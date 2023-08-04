import {
  $,
  Kind,
  Function,
  Conditional,
  Number,
  NaturalNumber,
  List,
  Test,
} from ".."

type Add2 = $<NaturalNumber.Add, 2>
type ReduceAdd = $<List.Reduce, NaturalNumber.Add>
type ReduceAdd0 = $<ReduceAdd, 0>

type Unapply_Spec = [
  Test.Expect<
    $<Kind.InputOf, Add2>,
    Number.Number
  >,

  Test.Expect<
    $<Kind.InputOf, ReduceAdd>, 
    unknown
  >,

  Test.Expect<
    $<Kind.InputOf, ReduceAdd0>, 
    unknown[]
  >,
]