import { Kind, Type, Object } from '..'
import { KeyOrPath } from './key-or-path';

/**
 * `_atPathN` is a type-level function that get the nested values in object O at the paths and keys specified in P.
 *
 * @template P - The path to the property or properties.
 * @template O - The type of the object to retrieve values from.
 * @template Acc - Accumulator type to store intermediate results.
 * @template Output - The resulting type after retrieving values.
 */
export type _$atPathN<
  P extends KeyOrPath[],
  O extends Record<PropertyKey, unknown>,
  Acc extends unknown[] = [],
  Output = P extends [
    infer Head extends KeyOrPath,
    ...infer Tail extends KeyOrPath[]
  ]
    ? _$atPathN<
        Tail,
        O,
        [
          ...Acc,
          Head extends PropertyKey[]
            ? Object._$atPath<Head, O>
            : O[Type._$cast<Head, keyof O>]
        ]
      >
    : Acc[number]
> = Output

interface AtPathN_T<Path extends KeyOrPath[]> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$atPathN<Path, typeof x>
}

/**
 * `AtPathN` is a type-level function that retrieves values from nested properties of an object based on a path.
 */
export interface AtPathN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], KeyOrPath[]>): AtPathN_T<typeof x>
}
