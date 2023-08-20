import { Conditional, Kind } from '..'

/**
 * `_$isNever` is a type-level function that checks if a type is `never`.
 * 
 * @template X - The type to check.
 * 
 * @example
 * type T0 = _$isNever<'1'> // false
 * type T1 = _$isNever<never> // true
 * type T2 = _$isNever<unknown> // false
 * type T3 = _$isNever<any> // false
 */
export type _$isNever<X> = Conditional._$equals<X, never>

/**
 * `IsNever` is a type-level function that checks if a type is `never`.
 * 
 * @template X - The type to check.
 * 
 * @example
 * type T0 = $<IsNever, '1'> // false
 * type T1 = $<IsNever, never> // true
 * type T2 = $<IsNever, unknown> // false
 * type T3 = $<IsNever, any> // false
 */
export interface IsNever extends Kind.Kind {
  f(x: this[Kind._]): _$isNever<typeof x>
}
