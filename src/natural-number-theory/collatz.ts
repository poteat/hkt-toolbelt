import { $, Kind, Combinator, Conditional, Function, NaturalNumber } from "..";

export type Collatz = $<
  $<$<Conditional.If, NaturalNumber.IsEven>, $<NaturalNumber.DivideBy, 2>>,
  Kind.Pipe<[$<NaturalNumber.Multiply, 3>, NaturalNumber.Increment]>
>;

export type CollatzSequence = $<
  Combinator.FixSequence,
  $<
    $<$<Conditional.If, $<Conditional.Equals, 1>>, $<Function.Constant, 1>>,
    Collatz
  >
>;
