import { Kind, Type, Function } from '..'

type _$inferred =
  | string
  | number
  | boolean
  | undefined
  | null
  | Function.Function
  | Kind.Kind
  | _$inferredTuple
  | {
      [key: string]: _$inferred
    }

type _$inferredTuple = _$inferred[] | ReadonlyArray<_$inferred>

/**
 * `_$infer` is a type-level function that infers the most specific type of a value.
 *
 * @template X - The value to infer the type of.
 *
 * @example
 * type T0 = _$infer<'foo'> // 'foo'
 */
export type _$infer<
  X,
  Narrow = Type._$cast<X, _$inferred> | [...Type._$cast<X, _$inferredTuple>]
> = Narrow extends unknown[] ? { [key in keyof X]: _$infer<X[key]> } : Narrow

/**
 * `Infer` is a type-level function that infers the most specific type of a value.
 *
 * @template X - The value to infer the type of.
 *
 * @example
 * type T0 = $<Infer, 'foo'> // 'foo'
 *
 * @example
 * // Demonstrating usage of Infer for const parameters in functions
 * function inferType<T>(x: $<Type.Infer, T>): typeof x {
 *   return x
 * }
 *
 * const x = inferType(['foo', { x: ['x'] }, 'bar', ['foo']])
 * // x is inferred as ['foo', { x: ['x'] }, 'bar', ['foo']]
 */
export interface Infer extends Kind.Kind {
  f(x: this[Kind._]): _$infer<typeof x>
}
