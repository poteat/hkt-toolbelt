import { Type, Kind } from '..'

/**
 * `RecursiveKind` is a higher-order type-level function that serves as a
 * subtype. It is used to express the fact that some other higher-order kind
 * takes in itself as a type argument.
 *
 * This type-level function doesn't do much on its own, but it is useful in
 * combination with other type-level functions.
 */
export interface RecursiveKind extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], RecursiveKind>): unknown
}
