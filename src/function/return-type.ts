import { Kind, Type } from ".."

/**
 * `_$returnType` is a type-level function that takes in a function type `T`
 * and returns the return type of the function `T`. If `T` is not a function
 * type, `_$returnType` returns `never`.
 *
 * ## Parameters
 *
 * @param T A function type.
 *
 * ## Example
 *
 * @example
 *
 * For example, we can use `_$returnType` to extract the return type of a
 * function. In this example, `() => number` is passed as a type argument
 * to the type-level function:
 *
 * ```ts
 * import { Function } from "hkt-toolbelt";
 *
 * type Result = Function._$returnType<() => number>; // number
 * ```
 */
export type _$returnType<T> = T extends (...args: never[]) => infer R
  ? R
  : never

/**
 * `ReturnType` is a type-level function that takes in a function type `T` and
 * returns the return type of the function `T`.
 *
 * @param T A function type.
 *
 * @example
 *
 * For example, we can use `ReturnType` to extract the return type of a
 * function. In this example, `() => number` is passed as a type argument
 * to the type-level function:
 *
 * We apply `ReturnType` to `() => number` using the `$` type-level
 * applicator:
 *
 * ```ts
 * import { $, Function } from "hkt-toolbelt";
 *
 * type Result = $<Function.ReturnType, () => number>; // number
 * ```
 */
export interface ReturnType extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], (...args: never[]) => unknown>
  ): _$returnType<typeof x>
}
