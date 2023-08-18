import { Type, List, Kind } from '..'

/**
 * `_$composable` checks whether a sequence of kinds can be composed without
 * errors.
 *
 * It takes a tuple of kinds `FX` and evaluates whether each adjacent pair in
 * `FX` is composable,
 * when applied in a right-to-left order.
 *
 * Two kinds `A` and `B` are composable if `A`'s output type is a subtype of
 * `B`'s input type.
 *
 * This can be thought of as checking that a "chain" of kinds passes type
 * information properly from each link to the next.
 *
 * If any pair fails, the chain breaks and `_$composable` returns `false`.
 * Only if all pairs succeed will it return `true`.
 *
 * Mathematically, this corresponds to checking if:
 *
 * `output(FX[n-1]) <: input(FX[n]) &&
 *  output(FX[n-2]) <: input(FX[n-1]) &&
 *  ...
 *  output(FX[1]) <: input(FX[2]) &&
 *  output(FX[0]) <: input(FX[1])`
 *
 * Where `<:` represents the "is subtype of" relationship.
 *
 * @param FX - The tuple of kinds to check
 * @returns Whether the kinds can be composed
 *
 * @example
 *
 * ```ts
 * // true - number => number => string is a valid right-to-left chain
 * _$composable<[NaturalNumber.Decrement, NaturalNumber.Increment, String.Length]>
 *
 * // false - the chain breaks
 * _$composable<[List.Map, String.ToUpper, List.Reverse]>
 * ```
 *
 * @see {@link Kind.InputOf} and {@link Kind.OutputOf} can inspect kinds
 * @see {@link Kind.Compose} and {@link Kind.Pipe} use this for validation
 */
export type _$composable<FX extends Kind.Kind[]> = List._$every<
  Kind.ComposablePair,
  List._$pair<FX>
>

/**
 * `Composable` checks whether a sequence of kinds can be composed without
 * errors.
 *
 * It should be invoked via `$` by passing a tuple of kinds:
 *
 * ```ts
 * $<Composable, [A, B, C]>
 * ```
 *
 * This will evaluate to a boolean literal type indicating whether the kinds in the tuple are composable:
 *
 * - `true` if each adjacent pair is composable.
 * - `false` otherwise.
 *
 * Two kinds `X` and `Y` are composable if `X`'s output type is a subtype of `Y`'s input type.
 *
 * @param K - The tuple of kinds to check
 * @returns Whether the kinds are composable
 *
 * @example
 *
 * ```ts
 * // true - number => number => string is a valid chain
 * $<Composable, [NaturalNumber.Decrement, NaturalNumber.Increment, String.Length]>
 *
 * // false - the chain breaks
 * $<Composable, [List.Map, String.ToUpper, List.Reverse]>
 * ```
 *
 * @see {@link _$composable}
 * `Composable` is the public interface for `_$composable` which performs the
 * checks.
 */
export interface Composable extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind[]>): _$composable<typeof x>
}
