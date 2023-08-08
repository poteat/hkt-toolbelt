import { Type, Kind, String } from '..'

export type _$length<S extends string> = String._$isTemplate<S> extends true
  ? number
  : string extends S
  ? number
  : String._$toList<S>['length']

export interface Length extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$length<typeof x>
}
