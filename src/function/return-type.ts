import { Kind, Type } from '..'

/**
 * `_$returnType` is the internal implementation for the `ReturnType` utility.
 *
 * It takes a function type T as input, uses `infer` to extract the return
 * type R, and returns R. If R cannot be inferred, it returns `never`.
 *
 * This works because `infer` declares a new generic type variable that takes
 * on the return value of the function.
 *
 * @template T - A function type
 * @returns The inferred return type R of T, or `never`
 *
 * @example
 * ```ts
 * type Fn = (a: number) => string
 *
 * type R = _$returnType<Fn> // string
 * ```
 *
 * Using `infer` with `extends` allows extracting the return type at compile
 * time without needing to call the function. This enables inspecting function
 * types and using the return type in other types.
 */
export type _$returnType<T> = T extends (...args: never[]) => infer R
  ? R
  : never

/**
 * `ReturnType` extracts the return type of a function type.
 *
 * @template x - A function type
 * @returns The inferred return type of the function
 *
 * @example
 * ```ts
 * import { $ } from 'hkt-toolbelt'
 *
 * type Fn = (a: number) => string
 *
 * type R = $<ReturnType, Fn> // string
 * ```
 *
 * This utility can be useful for extracting the return type of a function without
 * having to call it.
 */
export interface ReturnType extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], (...args: never[]) => unknown>
  ): _$returnType<typeof x>
}
