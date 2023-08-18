import { Type, Kind } from '..'

/**
 * Represents a type-level utility to infer the input type of a provided kind's function.
 * This is an internal utility used primarily within the `Kind.InputOf` interface.
 *
 * @template F The kind whose function's input type needs to be inferred.
 *
 * @returns The inferred input type of the provided kind's function. If the kind's function doesn't have a deducible input type, it will return `unknown`.
 *
 * @example
 * // Given a kind with a function that takes a number:
 * type ExampleKind = { f: (x: number) => string };
 * // You can use _$inputOf to deduce the input type of this kind's function:
 * type InputType = _$inputOf<ExampleKind>; // This will be inferred as number
 */
export type _$inputOf<F extends Kind.Kind> = F extends {
  f: (x: infer X) => unknown
}
  ? X
  : unknown

/**
 * Represents a type-level utility to deduce the input type of a provided kind.
 *
 * @template F The kind whose input type needs to be inferred.
 *
 * @returns The inferred input type of the provided kind. If the kind doesn't
 * have a deducible input type, it will return `unknown`.
 *
 * @example
 * // Given a kind that represents the addition of a natural number with 2:
 * type Add2 = $<NaturalNumber.Add, 2>;
 * // You can use Kind.InputOf to deduce the input type of this kind:
 * type InputType = $<Kind.InputOf, Add2>; // This will be inferred as Number.Number
 *
 * @example
 * // For more complex kinds:
 * type ReduceAdd = $<List.Reduce, NaturalNumber.Add>;
 * type InputType2 = $<Kind.InputOf, ReduceAdd>; // This will be inferred as unknown
 *
 * type ReduceAdd0 = $<ReduceAdd, 0>;
 * type InputType3 = $<Kind.InputOf, ReduceAdd0>; // This will be inferred as unknown[]
 */

export interface InputOf extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): _$inputOf<typeof x>
}
