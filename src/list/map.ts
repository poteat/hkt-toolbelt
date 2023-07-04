import { $, Type, Kind, String } from '..'

export type _$map<T extends Kind.Kind, X extends unknown[]> = {
  [key in keyof X]: $<T, Type._$cast<X[key], Kind._$inputOf<T>>>
}

interface Map_T<T extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$map<T, typeof x>
}

export interface Map extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): Map_T<typeof x>
}

export declare const map: Kind._$reify<Map>
