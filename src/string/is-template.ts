import { $, Type, Conditional, Kind, List, String } from '..'

/**
 * `String._$isTemplate` is a type-level function that checks if a string is a template literal string.
 * 
 * @template S - The string to check.
 * 
 * @example
 * type T0 = String._$isTemplate<`foo${string}`> // true
 * type T1 = String._$isTemplate<string> // false
 * type T2 = String._$isTemplate<'foo'> // false
 * type T3 = String._$isTemplate<''> // false
 * type T4 = String._$isTemplate<`${string}foo`> // true
 * type T5 = String._$isTemplate<`${string}`> // false
 */
export type _$isTemplate<S extends string> = string extends S
  ? false
  : List._$some<$<Conditional.Equals, string>, String._$toList<S>>

/**
 * `String.IsTemplate` is a type-level function that checks if a string is a template literal string.
 * 
 * @template S - The string to check.
 * 
 * @example
 * type T0 = $<String.IsTemplate, `foo${string}`> // true
 * type T1 = $<String.IsTemplate, string> // false
 * type T2 = $<String.IsTemplate, 'foo'> // false
 * type T3 = $<String.IsTemplate, ''> // false
 * type T4 = $<String.IsTemplate, `${string}foo`> // true
 * type T5 = $<String.IsTemplate, `${string}`> // false
 */
export interface IsTemplate extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$isTemplate<typeof x>
}
