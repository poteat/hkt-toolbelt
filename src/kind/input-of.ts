import { Type, Kind } from '..'

export type _$inputOf<F extends Kind.Kind> = F extends {
  f: (x: infer X) => unknown
}
  ? X
  : unknown

export interface InputOf extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): _$inputOf<typeof x>
}
