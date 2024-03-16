import { Type, Kind } from '..'

export type _$pair<
  T extends unknown[],
  O extends unknown[][] = []
> = T extends [infer X1, infer X2, ...infer Rest]
  ? _$pair<[X2, ...Rest], [...O, [X1, X2]]>
  : number extends T['length']
    ? [T[number], T[number]][]
    : O

export interface Pair extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$pair<typeof x>
}
