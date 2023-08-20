import { Kind, Type } from '..'

/**
 * `Number.FromString` is a type-level function that converts a string to a number.
 * 
 * @template T - The string to convert to a number.
 * 
 * @example
 * type T0 = Number._$fromString<'123'> // 123
 * type T1 = Number._$fromString<'abc'> // never
 */
export type _$fromString<T extends string> = T extends `${infer T extends
  | number
  | bigint}`
  ? T
  : never

/**
 * `Number.FromString` is a type-level function that converts a string to a number.
 * 
 * @template T - The string to convert to a number.
 * 
 * @example
 * type T0 = $<Number.FromString, '123'> // 123
 * type T1 = $<Number.FromString, 'abc'> // never
 */
export interface FromString extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$fromString<typeof x>
}
