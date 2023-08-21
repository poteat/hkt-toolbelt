import { $, Kind, Type } from '..'

/**
 * `Object._$mapKeys` is a type-level function that maps the keys of an object.
 * 
 * @template T - The object to map the keys of.
 * @template F - The function to apply to each key.
 * 
 * @example
 * type T0 = Object._$mapKeys<{ a: 1; b: 2; c: 3 }, String.ToUpper> // { A: 1; B: 2; C: 3 }
 */
export type _$mapKeys<
  T extends Record<string, unknown>,
  F extends Kind.Kind<(x: string) => string | number | symbol>
> = {
  [key in keyof T as $<F, Type._$cast<key, Kind._$inputOf<F>>>]: T[key]
}

/**
 * `Object.MapKeys_T` is an intermediate interface for currying.
 * 
 * @template F - The function to apply to each key.
 */
interface MapKeys_T<
  F extends Kind.Kind<(x: string) => string | number | symbol>
> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<string, unknown>>
  ): _$mapKeys<typeof x, F>
}

/**
 * `Object.MapKeys` is a type-level function that maps the keys of an object.
 * 
 * @template F - The function to apply to each key.
 * 
 * @example
 * type T0 = $<$<Object.MapKeys, String.ToUpper>, { a: 1; b: 2; c: 3 }> // { A: 1; B: 2; C: 3 }
 */
export interface MapKeys extends Kind.Kind {
  f(
    x: Type._$cast<
      this[Kind._],
      Kind.Kind<(x: string) => string | number | symbol>
    >
  ): MapKeys_T<typeof x>
}
