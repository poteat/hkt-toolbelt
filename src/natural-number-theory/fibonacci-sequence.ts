import { $, Conditional, Kind, List, Loop, NaturalNumber } from '..'

type GetLastTwo = $<Kind.Juxt, [$<Kind.Pipe, [List.Pop, List.Last]>, List.Last]>

type SumLastTwo = $<Kind.Pipe, [GetLastTwo, $<Kind.Uncurry, NaturalNumber.Add>]>

type AppendNewSum = $<
  Kind.Pipe,
  [$<Kind.Juxt, [SumLastTwo, List.PushValue]>, $<Kind.Uncurry, Kind.Apply>]
>

type LengthIsX = $<
  Kind.PipeWeak,
  [Conditional.Equals, $<List.PushValue, [List.Length]>, Kind.Pipe]
>

/**
 * `FibonacciSequence` is a type-level function that generates a sequence of
 * Fibonacci numbers, given a desired resultant length, and an initial sequence.
 *
 * @example
 * ```ts
 * import { $, NaturalNumberTheory } from "hkt-toolbelt";
 *
 * type Result = $<
 *   $<NaturalNumberTheory.FibonacciSequence, 5>,
 *   [0, 1]
 * >; // [0, 1, 1, 2, 3]
 * ```
 */
export type FibnonacciSequence = $<
  Kind.PipeWeak,
  [LengthIsX, Loop.Until, $<Kind.Apply, AppendNewSum>]
>
