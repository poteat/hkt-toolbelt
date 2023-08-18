import { Kind, Type } from '..'

/**
 * Represents a type-level utility to infer the output type of a provided kind's function.
 * This is an internal utility used primarily within the `Kind.OutputOf` interface.
 *
 * @template F The kind whose function's output type needs to be inferred.
 *
 * @returns The inferred output type of the provided kind's function. If the kind's function doesn't have a deducible output type, it will return `unknown`.
 *
 * @example
 * // Given the `String.ToUpper` kind which converts a string to uppercase:
 * // You can use _$outputOf to deduce the output type of this kind's function:
 * type OutputType = _$outputOf<String.ToUpper>; // This will be inferred as string
 */
export type _$outputOf<F extends Kind.Kind> = F extends {
  f: (x: never) => infer X
}
  ? X
  : unknown

/**
 * Represents a type-level utility to deduce the output type of a provided kind.
 *
 * @template F The kind whose output type needs to be inferred.
 *
 * @returns The inferred output type of the provided kind. If the kind doesn't have a deducible output type, it will return `unknown`.
 *
 * @example
 * // Using the `String.ToUpper` kind which converts a string to uppercase:
 * // You can use Kind.OutputOf to deduce the output type of this kind:
 * type OutputType = $<Kind.OutputOf, String.ToUpper>; // This will be inferred as string
 */
export interface OutputOf extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): _$outputOf<typeof x>
}
