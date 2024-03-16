import { $, Parser, Kind, Type, Conditional } from '..'

export type _$many1<
  STATE extends Parser._$state,
  P extends Parser.Parser,
  RESULTS extends unknown[] = [],
  NEXT_STATE extends Parser._$state = $<
    P,
    Type._$cast<STATE, Kind._$inputOf<P>>
  >,
  NEXT_RESULTS extends unknown[] = [...RESULTS, NEXT_STATE['result']]
> = 0 extends 1
  ? never
  : Conditional._$equals<NEXT_STATE, never> extends true
    ? RESULTS extends []
      ? never
      : {
          input: STATE['input']
          index: STATE['index']
          result: RESULTS
        }
    : _$many1<NEXT_STATE, P, NEXT_RESULTS>

interface Many1_T<P extends Parser.Parser> extends Parser.Parser {
  f(x: Type._$cast<this[Kind._], Parser._$state>): _$many1<typeof x, P>
}

export interface Many1 extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser.Parser>): Many1_T<typeof x>
}
