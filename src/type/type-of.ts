import { Kind, Type } from '..'

/**
 * `_$typeOf` is a helper type that returns the runtime-like `typeof` result as a string literal.
 *
 * @template X - The input type.
 * @returns A string literal representing the runtime `typeof` X.
 *
 * Note: This is a best-effort approximation at the type level. For example, `null` at runtime has `typeof null === 'object'`,
 * and we mimic that here.
 */
export type _$typeOf<X> = X extends undefined
  ? 'undefined'
  : X extends null
    ? 'object'
    : X extends string
      ? 'string'
      : X extends number
        ? 'number'
        : X extends boolean
          ? 'boolean'
          : X extends symbol
            ? 'symbol'
            : X extends bigint
              ? 'bigint'
              : X extends (...args: any[]) => any
                ? 'function'
                : X extends object
                  ? 'object'
                  : 'undefined'

/**
 * `TypeOf` is a 1-ary kind that takes a value type `X` and returns the
 * string literal type of what `typeof X` would produce at runtime.
 *
 * @example
 * ```ts
 * import { $, Type } from 'hkt-toolbelt'
 *
 * type Result = $<Type.TypeOf, "foo"> // "string"
 * ```
 */
export interface TypeOf extends Kind.Kind {
  f(x: this[Kind._]): _$typeOf<typeof x>
}

/**
 * `typeOf` is the runtime counterpart to `Type.TypeOf`.
 * It simply calls `typeof` on the given value.
 *
 * @param x - The value to determine the type of.
 * @returns A string representing the runtime type of `x`.
 *
 * @example
 * ```ts
 * import { Type } from 'hkt-toolbelt'
 *
 * console.log(typeOf("hello")) // "string"
 * console.log(typeOf(123))     // "number"
 * console.log(typeOf(null))    // "object"
 * console.log(typeOf(undefined)) // "undefined"
 * ```
 */
export const typeOf = ((x: unknown) => typeof x) as Kind._$reify<TypeOf>
