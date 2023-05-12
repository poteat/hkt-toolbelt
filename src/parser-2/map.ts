import { $, Kind, Parser2, Type } from '..'

export type _$map<
  STATE extends Parser2._$state,
  P extends Parser2.Parser,
  K extends Kind.Kind,
  NEW_STATE extends Parser2._$state = $<
    P,
    Type._$cast<STATE, Kind._$inputOf<P>>
  >
> = NEW_STATE extends never
  ? never
  : {
      input: NEW_STATE['input']
      result: $<K, Type._$cast<NEW_STATE['result'], Kind._$inputOf<K>>>
    }

interface Map_T2<P extends Parser2.Parser, K extends Kind.Kind>
  extends Parser2.Parser {
  f(x: Type._$cast<this[Kind._], Parser2._$state>): _$map<typeof x, P, K>
}

interface Map_T<K extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser2.Parser>): Map_T2<typeof x, K>
}

export interface Map extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): Map_T<typeof x>
}
