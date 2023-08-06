import { Type, Kind, List } from "..";

/**
 * `_$concat` is a type-level function that concatenates two tuples.
 *
 * It takes in two arguments:
 * `T`, the tuple to concatenate onto, and `U`, the tuple to concatenate.
 *
 * ## Parameters
 *
 * @param T A tuple type.
 * @param U A tuple type, or an unknown.
 * If `U` is not a tuple type, it will be pushed into `T` as its new last element.
 *
 * ## Basic Usage
 *
 * @example
 *
 * ```ts
 * import { $, List } from 'hkt-toolbelt';
 *
 * type Result = List._$concat<[0, 1], [2, 3]>; // [0, 1, 2, 3]
 * ```
 *
 * ## Advanced Usage
 *
 * @example
 *
 * Concatenating to a tuple with a rest parameter results in a tuple that contains the concatenated tuple.
 *
 * ```ts
 * import { $, List } from 'hkt-toolbelt';
 *
 * List._$concat<[1, 2, ...string[]], ["foo"]>; // [1, 2, ...string[], "foo"]
 * ```
 *
 */
export type _$concat<
  U extends unknown,
  T extends unknown[]
> = U extends unknown[] ? [...T, ...U] : List._$push<U, T>;

interface Concat_T<U extends unknown> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$concat<U, typeof x>;
}

/**
 * `Concat` is a type-level function that concatenates two tuples.
 *
 * It takes in two arguments:
 * `T`, the tuple to concatenate onto, and `U`, the tuple to concatenate.
 *
 * ## Parameters
 *
 * @param T A tuple type.
 * @param U A tuple type, or an unknown.
 * If `U` is not a tuple type, it will be pushed into `T` as its new last element.
 *
 * ## Basic Usage
 *
 * @example
 *
 * ```ts
 * import { $, List } from 'hkt-toolbelt';
 *
 * type Result = $<$<List.Concat [2, 3]>, [1, 2]>; // [0, 1, 2, 3]
 * ```
 *
 * ## Advanced Usage
 *
 * @example
 *
 * Concatenating to a tuple with a rest parameter results in a tuple that contains the concatenated tuple.
 *
 * ```ts
 * import { $, List } from 'hkt-toolbelt';
 *
 * $<$<List.Concat, ["foo"]>, [1, 2, ...string[]]>; // [1, 2, ...string[], "foo"]
 * ```
 *
 */
export interface Concat extends Kind.Kind {
  f(x: this[Kind._]): Concat_T<typeof x>;
}
