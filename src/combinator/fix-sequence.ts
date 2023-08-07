import { $, Type, Kind } from '..'

/**
 * _$fixSequence is a type-level function that generates a fixed-point sequence
 * for a given kind `KIND`. A fixed-point sequence is a sequence of values where
 * the next value in the sequence is the result of applying `KIND` to the
 * previous value, and so on, until the value reaches a fixed point.
 *
 * A fixed point is reached when applying `KIND` to a value returns that same
 * value. Notably, this means that an infinite loop is possible if we do not
 * converge to a fixed point.
 *
 * There are two scenarios where we do not reach convergence:
 * - If we diverge (generate larger and larger values).
 * - If we oscillate (generate values that infinitely cycle between values).
 *
 * If convergence is not reached, the 'infinite type instantiation' error will
 * be emitted by the TypeScript compiler.
 *
 * ## Type Parameters
 *
 * - `KIND`: The kind for which the fixed-point sequence is generated.
 * - `VALUE`: The starting value of the fixed-point sequence.
 * - `STATE`: An array type that keeps track of the intermediate values in the
 * fixed-point sequence. This is optional and defaults to an array containing
 * the initial `VALUE`.
 *
 * ### Term Rewriting
 *
 * Here we show a simple example of a convergent fixed-point sequence. Term
 * rewriting is a concept in computer science that is used to transform a
 * string into another string.
 *
 * We define a term rule "xyz --> x", which replaces the string "xyz" with the
 * string "x". We then create a fixed-point sequence for this term rule.
 *
 * A term sequence may be terminal or non-terminal. A terminal term sequence is
 * one where we reach a state where no more term rules can be applied.
 *
 * ```ts
 * import { $, Function, String, Combinator } from "hkt-toolbelt";
 *
 * // ["zyxyzyzyz", "zyxyzyz", "zyxyz", "zyx"]
 * type Rewrite = Combinator._$fixSequence<
 *   $<$<String.Replace, "xyz">, "x">,
 *   "zyxyzyzyz"
 * >
 * ```
 *
 * In the above example, we started with a given string and applied successive
 * term rules until we reached a terminal state.
 *
 * ### Divergent Case
 *
 * Here we show a simple example of a divergent fixed-point sequence. We define
 * the (+1) type-level function, which takes a number and returns that number
 * plus 1. We then create a fixed-point sequence for (+1), starting from the
 * value `0`.
 *
 * ```ts
 * import { $, Combinator, NaturalNumber } from "hkt-toolbelt";
 *
 * // Error: Type instantiation is excessively deep and possibly infinite.
 * type Result = Combinator._$fixSequence<
 *   $<NaturalNumber.Add, 1>>,
 *   0
 * >;
 * ```
 */
export type _$fixSequence<
  /**
   * The kind for which the fixed-point sequence is generated.
   */
  KIND extends Kind.Kind,
  /**
   * The starting value of the fixed-point sequence.
   */
  VALUE extends Kind._$inputOf<KIND>,
  /**
   * An array type that keeps track of the intermediate values in the
   * fixed-point sequence. This is optional and defaults to an array containing
   * the initial `VALUE`.
   */
  STATE extends unknown[] = [VALUE],
  /**
   * The next value in the fixed-point sequence.
   */
  NEXT_VALUE = $<KIND, VALUE>,
  /**
   * The next state in the fixed-point sequence, created by appending the
   * previous state with the next value.
   */
  NEXT_STATE extends unknown[] = [...STATE, NEXT_VALUE],
  /**
   * A boolean that indicates whether or not we are done generating the
   * fixed-point sequence.
   *
   * If `NEXT_VALUE` is equal to `VALUE`, then we have reached a fixed point and
   * we are done generating the fixed-point sequence.
   *
   * Notably, this means that an infinite loop is possible if we do not
   * converge to a fixed point.
   */
  DONE extends boolean = NEXT_VALUE extends VALUE ? true : false
> = DONE extends true
  ? STATE
  : _$fixSequence<
      DONE extends false ? KIND : never,
      Type._$cast<NEXT_VALUE, Kind._$inputOf<KIND>>,
      NEXT_STATE
    >

interface FixSequence_T<KIND extends Kind.Kind> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind._$inputOf<KIND>>
  ): _$fixSequence<KIND, typeof x>
}

/**
 * The `FixSequence` type-level function generates a fixed-point sequence for a
 * given kind `KIND`. A fixed-point sequence is a sequence of values where the
 * next value in the sequence is the result of applying `KIND` to the previous
 * value, and so on, until the value reaches a fixed point.
 *
 * A fixed point is reached when applying `KIND` to a value returns that same
 * value. Notably, this means that an infinite loop is possible if we do not
 * converge to a fixed point.
 *
 * There are two scenarios where we do not reach convergence:
 * - If we diverge (generate larger and larger values).
 * - If we oscillate (generate values that infinitely cycle between values).
 *
 * If convergence is not reached, the 'infinite type instantiation' error will
 * be emitted by the TypeScript compiler.
 *
 * ### Term Rewriting
 *
 * Here we show a simple example of a convergent fixed-point sequence. Term
 * rewriting is a concept in computer science that is used to transform a
 * string into another string.
 *
 * We define a term rule "xyz --> x", which replaces the string "xyz" with the
 * string "x". We then create a fixed-point sequence for this term rule.
 *
 * A term sequence may be terminal or non-terminal. A terminal term sequence is
 * one where we reach a state where no more term rules can be applied.
 *
 * ```ts
 * import { $, Function, String, Combinator } from "hkt-toolbelt";
 *
 * type Rewrite = $<Combinator.FixSequence, $<$<String.Replace, "xyz">, "x">>
 *
 * // ["zyxyzyzyz", "zyxyzyz", "zyxyz", "zyx"]
 * type Result = $<Rewrite, "zyxyzyzyz">
 * ```
 *
 * In the above example, we started with a given string and applied successive
 * term rules until we reached a terminal state.
 *
 * ### Divergent Case
 *
 * Here we show a simple example of a divergent fixed-point sequence. We define
 * the (+1) type-level function, which takes a number and returns that number
 * plus 1. We then create a fixed-point sequence for (+1), starting from the
 * value `0`.
 *
 * ```ts
 * import { $, Combinator, NaturalNumber } from "hkt-toolbelt";
 *
 * // Error: Type instantiation is excessively deep and possibly infinite.
 * type Result = $<$<Combinator.FixSequence, $<NaturalNumber.Add, 1>>, 0>;
 * ```
 *
 * In the above example, we started with the value `0` and applied the (+1)
 * function to it. The result of applying (+1) to `0` is `1`. We then apply (+1)
 * to `1`, which results in `2`. We continue this process until we reach the
 * maximum number of iterations allowed by the TypeScript compiler.
 */
export interface FixSequence extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind>
  ): FixSequence_T<Type._$cast<this[Kind._], Kind.Kind>>
}
