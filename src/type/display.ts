import { Kind } from '..'

/**
 * `_$display` is a type-level function that forces the compiler to resolve
 * types such that IDEs can display them.
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
 * types such that IDEs can display them.
 * 
 * @template T - The type to be displayed.
 * 
 * @example
 * type T0 = $<Display, 'foo'> // 'foo'
 */
export interface Display extends Kind.Kind {
  f(x: this[Kind._]): _$display<this[Kind._]>
}
