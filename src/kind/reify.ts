import { $, Kind, Type } from '..'

/**
 * Represents a type-level utility that "reifies" a kind, turning it into a function signature.
 * This utility allows type-level kinds to be used as if they were functions, with type inference capabilities.
 *
 * @template K - The kind to be "reified" or transformed into a function signature.
 *
 * @returns A function signature derived from the provided kind, allowing it to accept and return appropriate types.
 *
 * @example
 * // Given the `List.Map` kind, using _$reify you can "convert" it into a function-like signature:
 * type ReifiedMap = _$reify<List.Map>;
 * // This ReifiedMap can now be used as if it were a function, with type inference capabilities.
 */
export type _$reify<K extends Kind.Kind> = K & {
  <X extends Kind._$inputOf<K>>(
    x: Type._$infer<X>
  ): $<K, X> extends infer Result
    ? Result extends Kind.Kind
      ? _$reify<Result>
      : $<K, X>
    : never
}

/**
 * Represents a type-level utility to reify a kind into a function signature.
 * The `Reify` interface is a more structured way to use the reification process, and is built upon the `_$reify` type.
 *
 * @template F - The kind to be reified.
 *
 * @returns A function signature derived from the provided kind.
 *
 * @example
 * // Using the `String.ToUpper` kind, you can use Reify to get a function-like signature:
 * declare const toUpper: $<Kind.Reify, String.ToUpper>;
 * // This function can be used as a 'reified kind', with type inference.
 * const x = toUpper('hello'); // 'HELLO'
 */
export interface Reify extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): _$reify<typeof x>
}
