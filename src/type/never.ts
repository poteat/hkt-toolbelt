/**
 * `Never` is a type-level alias for the `never` type.
 *
 * @example
 * ```ts
 * import { Type } from "hkt-toolbelt";
 *
 * type T0 = Type.Never // never
 * ```
 */
export type Never = never

/**
 * Given a value, return the `never` type.
 *
 * @param {unknown} x - The value to return.
 *
 * @example
 * ```ts
 * import { Type } from "hkt-toolbelt";
 *
 * const result = Type.never('ignored')
 * //    ^? never
 * ```
 */
export const never = undefined as never
