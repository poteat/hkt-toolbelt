import { $, Kind, Type, Parser, List } from '..'

export type _$sequence<
  STATE extends Parser._$state,
  PX extends Parser.Parser[],
  RESULTS extends unknown[] = [],
  ACTIVE_PX extends Parser.Parser = List._$first<PX>,
  NEXT_PX extends Parser.Parser[] = Type._$cast<
    List._$shift<PX>,
    Parser.Parser[]
  >,
  NEXT_STATE extends Parser._$state = $<
    ACTIVE_PX,
    Type._$cast<STATE, Kind._$inputOf<ACTIVE_PX>>
  >,
  NEXT_RESULTS extends unknown[] = [...RESULTS, NEXT_STATE['result']],
  IS_DONE extends boolean = NEXT_PX extends []
    ? true
    : NEXT_STATE extends never
      ? false
      : false
> = IS_DONE extends true
  ? NEXT_STATE extends never
    ? never
    : {
        input: STATE['input']
        index: NEXT_STATE['index']
        result: NEXT_RESULTS
      }
  : _$sequence<NEXT_STATE, NEXT_PX, NEXT_RESULTS>

interface Sequence_T<PX extends Parser.Parser[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser._$state>): _$sequence<typeof x, PX>
}

export interface Sequence extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser.Parser[]>): Sequence_T<typeof x>
}
