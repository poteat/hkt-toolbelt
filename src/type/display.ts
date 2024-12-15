import { Kind } from '..'

/**
 * `_$display` is a type-level function that forces the compiler to resolve
 * types such that IDEs can display them on hover.
 *
 * @template T - The type to be displayed.
 *
 * @example
 * type T0 = _$display<'foo'> // 'foo'
 */
export type _$display<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends abstract new (...args: never[]) => unknown
    ? T
    : {
        [key in keyof T]: T[key]
      }

/**
 * `Display` is a type-level function that forces the compiler to resolve
 * types such that IDEs can display them on hover.
 *
 * @template T - The type to be displayed.
 *
 * @example
 * type T0 = $<Display, 'foo'> // 'foo'
 */
export interface Display extends Kind.Kind {
  f(x: this[Kind._]): _$display<this[Kind._]>
}

/**
 * Given a value, return the value unchanged, while performing type inference
 * on the type to fully display it.
 *
 * Acts as an identity function.
 *
 * @param {unknown} x - The value to display.
 *
 * @example
 * ```ts
 * import { Type } from "hkt-toolbelt";
 *
 * const result = Type.display('foo') // 'foo'
 * ```
 */
export const display = ((x: unknown) => x) as Kind._$reify<Display>
