import { Kind, List, Type } from '..'

/**
 * `_$includesValue` is a type-level function that takes in a list `T` and a
 * value `X`, and returns a boolean indicating whether `T` contains `X`.
 *
 * This has opposite arguments with respect to `List.Contains`.
 *
 * @template T - The list to check.
 * @template X - The value to check.
 *
 * @returns A boolean indicating whether `T` contains `X`.
 *
 * @example
 * For example, we can use `_$includesValue` to check if a value is present in a list:
 *
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type Result = List._$includesValue<[1, 2, 3], 2>; // true
 * ```
 */
export type _$includesValue<T extends unknown[], X> = List._$includes<X, T>

interface IncludesValue_T<T extends unknown[]> extends Kind.Kind {
  f(x: this[Kind._]): _$includesValue<T, typeof x>
}

/**
 * `IncludesValue` is a type-level function that takes in a list `T` and a value
 * `X`, and returns a boolean indicating whether `T` contains `X`.
 *
 * This has opposite arguments with respect to `Contains`.
 *
 * @template T - The list to check.
 * @template X - The value to check.
 *
 * @returns A boolean indicating whether `T` contains `X`.
 *
 * @example
 * For example, we can use `IncludesValue` to check if a value is present in a list:
 *
 * ```ts
 * import { $, List } from "hkt-toolbelt";
 *
 * type Result = $<$<List.IncludesValue, [1, 2, 3]>, 2>; // true
 * ```
 */
export interface IncludesValue extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): IncludesValue_T<typeof x>
}
