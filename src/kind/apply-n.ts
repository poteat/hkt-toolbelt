import { Kind, Type } from '..'

interface ApplyN_T<X extends unknown[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): Kind._$uncurry<typeof x, X>
}

/**
 * `ApplyN` is a type-level function that applies a kind to a type.
 *
 * It takes a list of arguments X and kind K, and applies
 * K to X using the `$N` operator.
 *
 * @see {@link Kind.Uncurry}
 *
 * `ApplyN` is `Kind.Uncurry` with the argument positions reversed.
 * Here, we first take in the values, and then a kind to apply to those values.
 *
 * This makes `ApplyN` particularly useful for more complicated chains
 * of type-level logic.
 *
 * @template X - The list of arguments to apply the kind to
 * @template K - The kind to apply
 *
 * @returns The result of applying K to X
 */
export interface ApplyN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): ApplyN_T<typeof x>
}
