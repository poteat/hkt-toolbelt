import { $, Kind, Type, String } from '..'

export type _$mapKeys<
  T extends Record<string, unknown>,
  F extends Kind.Kind<(x: string) => string | number | symbol>
> = {
  [key in keyof T as $<F, Type._$cast<key, Kind._$inputOf<F>>>]: T[key]
}

interface MapKeys_T<
  F extends Kind.Kind<(x: string) => string | number | symbol>
> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<string, unknown>>
  ): _$mapKeys<typeof x, F>
}

export interface MapKeys extends Kind.Kind {
  f(
    x: Type._$cast<
      this[Kind._],
      Kind.Kind<(x: string) => string | number | symbol>
    >
  ): MapKeys_T<typeof x>
}

declare const mapKeys: Kind._$reify<MapKeys>

declare const prepend: Kind._$reify<String.Prepend>

const result = mapKeys(prepend('on_'))({ a: 1, b: 2, c: 3 })

type result = typeof result
