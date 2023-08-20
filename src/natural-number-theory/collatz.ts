import { $, Kind, Conditional, Function, NaturalNumber } from '..'

/**
 * `Collatz` is a type-level function that represents the Collatz function.
 * If the input number is even, it is divided by 2.
 * If the input number is odd, it is multiplied by 3 and then incremented by 1.
 *
 * @template T - The input number.
 *
 * @example
 * type T0 = $<Collatz, 6> // 3
 * type T1 = $<Collatz, 5> // 16
 */
export type Collatz = $<
  $<$<Conditional.If, NaturalNumber.IsEven>, $<NaturalNumber.DivideBy, 2>>,
  $<Kind.Pipe, [$<NaturalNumber.Multiply, 3>, NaturalNumber.Increment]>
>
