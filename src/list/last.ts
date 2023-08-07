import { Type, Kind } from '..'

export type _$last<T extends readonly unknown[]> = T extends [infer X]
  ? X
  : T extends [unknown, ...infer Tail]
  ? _$last<Tail>
  : T extends [...unknown[], infer X]
  ? X
  : T[number]

export interface Last extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], readonly unknown[]>): _$last<typeof x>
}
