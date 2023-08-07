import { $, Type, Conditional, Kind, List, String } from '..'

export type _$isTemplate<S extends string> = string extends S
  ? false
  : List._$some<$<Conditional.Equals, string>, String._$toList<S>>

export interface IsTemplate extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$isTemplate<typeof x>
}
