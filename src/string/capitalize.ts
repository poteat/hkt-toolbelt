import { Kind, Type } from '..'

export type _$capitalize<S extends string> = Capitalize<S>

interface _Capitalize extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$capitalize<typeof x>
}

export { _Capitalize as Capitalize }
