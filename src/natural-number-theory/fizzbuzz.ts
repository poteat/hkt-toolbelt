import { $, $N, Kind, NaturalNumber, Conditional, List, Function } from "..";

/**
 * Check whether a natural number `N` is divisible by another number `M`.
 *
 * i.e. determine whether `N % M === 0`.
 *
 * @param M The number to divide by.
 * @param N The number to check divisibility for.
 *
 * This function 'lifts' the modulo parameters (M and N) out of the pipe via
 * the curry and uncurry operators.
 *
 * For optimal performance, this should be implemented as a 'native' type-level
 * function - however this example is pedagogically valuable for demonstrating
 * the lifting technique.
 */
type DivisibleBy = $N<
  Kind.Curry,
  [
    2,
    $<
      Kind.Pipe,
      [$<Kind.Uncurry, NaturalNumber.ModuloBy>, $<Conditional.Equals, 0>]
    >
  ]
>;

/**
 * A type-level function that returns "FizzBuzz" if the input is divisible by
 * both 3 and 5, "Fizz" if the input is divisible by 3, "Buzz" if the input is
 * divisible by 5, and the input otherwise.
 *
 * This function uses the `Conditional.If` type-level function to encode an
 * if-then-else statement.
 *
 * @param N The number to compute the FizzBuzz result for.
 *
 * @example
 * ```ts
 * import { $, NaturalNumberTheory } from "hkt-toolbelt"
 *
 * type R15 = $<NaturalNumberTheory.FizzBuzz, 15> // "FizzBuzz"
 * type R4 = $<NaturalNumberTheory.FizzBuzz, 4> // 4
 * ```
 */
export type FizzBuzz = $N<
  Conditional.If,
  [
    $<DivisibleBy, 15>,
    $<Function.Constant, "FizzBuzz">,
    $N<
      Conditional.If,
      [
        $<DivisibleBy, 3>,
        $<Function.Constant, "Fizz">,
        $N<
          Conditional.If,
          [$<DivisibleBy, 5>, $<Function.Constant, "Buzz">, Function.Identity]
        >
      ]
    >
  ]
>;

/**
 * A type-level function that returns a list of the FizzBuzz results for the
 * first `N` natural numbers, from 1 to `N` inclusive.
 *
 * @param N The number of FizzBuzz results to compute.
 *
 * @example
 * ```ts
 * import { $, NaturalNumberTheory } from "hkt-toolbelt"
 *
 * // ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz"]
 * type R10 = $<NaturalNumberTheory.FizzBuzzSequence, 10>
 * ```
 */
export type FizzBuzzSequence = $<
  Kind.Pipe,
  [List.Times, $<List.Map, $<Kind.Pipe, [NaturalNumber.Increment, FizzBuzz]>>]
>;
