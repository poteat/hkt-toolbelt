import { Type, Kind } from '..'

/**
 * `_$composablePair` is the internal implementation for the `ComposablePair`
 * utility.
 *
 * It takes a pair of kinds [A, B] and returns true if B's output type is a
 * subtype of A's input type. This means that B can be piped into A.
 *
 * Equivalently, A can be composed with B. Regarding terminology, f(g(x)) is f
 * composed with g, and we say that 'g is piped into f'. In other words,
 * composition is a right-to-left description.
 *
 * @param F - A tuple containing two kinds to check
 *
 * @returns Whether the kinds are composable
 *
 * @example
 * ```ts
 * // Returns true - length results in a number, which can be incremented.
 * Kind._$composablePair<[NaturalNumber.Increment, String.Length]>
 *
 * // Returns false - reverse results in a list, which cannot be upper-cased.
 * Kind._$composablePair<[String.ToUpper, List.Reverse]>
 * ```
 */
export type _$composablePair<F extends [Kind.Kind, Kind.Kind]> =
  Kind._$outputOf<F[1]> extends Kind._$inputOf<F[0]> ? true : false

/**
 * `ComposablePair` checks if two kinds can be composed together.
 *
 * It takes a pair of kinds [A, B] and returns true if B's output type is a
 * subtype of A's input type. This means that B can be piped into A.
 *
 * Equivalently, A can be composed with B. Regarding terminology, f(g(x)) is f
 * composed with g, and we say that 'g is piped into f'. In other words,
 * composition is a right-to-left description.
 *
 * @param K - A tuple containing two kinds to check
 *
 * @returns Whether the kinds are composable
 *
 * @example
 * ```ts
 * // Returns true - length results in a number, which can be incremented.
 * $<ComposablePair, [NaturalNumber.Increment, String.Length]>
 *
 * // Returns false - reverse results in a list, which cannot be upper-cased.
 * $<ComposablePair, [String.ToUpper, List.Reverse]>
 * ```
 */
export interface ComposablePair extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], [Kind.Kind, Kind.Kind]>
  ): _$composablePair<typeof x>
}
