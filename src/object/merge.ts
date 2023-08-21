import { Kind, Type } from '..'

/**
 * `Object._$merge` is a type-level function that merges two objects.
 * 
 * @template A - The first object to merge.
 * @template B - The second object to merge.
 * 
 * @example
 * type T0 = Object._$merge<{ a: 1; b: 2 }, { c: 3; d: 4 }> // { a: 1; b: 2; c: 3; d: 4 }
 * type T1 = Object._$merge<{}, { a: 1; b: 2 }> // { a: 1; b: 2 }
 * type T2 = Object._$merge<{ a: 1 }, { a: 2 }> // { a: 2 }
 */
export type _$merge<
  A extends Record<string, unknown>,
  B extends Record<string, unknown>
> = Type._$display<{
  [K in keyof A | keyof B]: K extends keyof B
    ? B[K]
    : K extends keyof A
    ? A[K]
    : never
}>

/**
 * `Object.Merge_T` is an intermediate interface for currying.
 * 
 * @template A - The first object to merge.
 */
interface Merge_T<A extends Record<string, unknown>> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Record<string, unknown>>): _$merge<A, typeof x>
}

/**
 * `Object.Merge` is a type-level function that merges two objects.
 * 
 * @template A - The first object to merge.
 * @template B - The second object to merge.
 * 
 * @example
 * type T0 = $<$<Object.Merge, { a: 1; b: 2 }>, { c: 3; d: 4 }> // { a: 1; b: 2; c: 3; d: 4 }
 * type T1 = $<$<Object.Merge, {}>, { a: 1; b: 2 }> // { a: 1; b: 2 }
 * type T2 = $<$<Object.Merge, { a: 1 }>, { a: 2 }> // { a: 2 }
 */
export interface Merge extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Record<string, unknown>>): Merge_T<typeof x>
}
