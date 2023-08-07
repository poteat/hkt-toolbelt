import { $, Kind, Type, Parser, List, Object } from '..';

export type _$objectSequence<
  STATE extends Parser._$state,
  PX extends ([string, Parser.Parser] | Parser.Parser)[],
  RESULTS extends Record<string, unknown> = {},
  ACTIVE_PX extends [string, Parser.Parser] | Parser.Parser = List._$first<PX>,
  NEXT_PX extends ([string, Parser.Parser] | Parser.Parser)[] = Type._$cast<
    List._$shift<PX>,
    ([string, Parser.Parser] | Parser.Parser)[]
  >,
  NEXT_STATE extends Parser._$state = ACTIVE_PX extends [string, Parser.Parser]
    ? $<ACTIVE_PX[1], Type._$cast<STATE, Kind._$inputOf<ACTIVE_PX[1]>>>
    : ACTIVE_PX extends Parser.Parser
    ? $<ACTIVE_PX, Type._$cast<STATE, Kind._$inputOf<ACTIVE_PX>>>
    : never,
  NEXT_RESULTS extends Record<string, unknown> = ACTIVE_PX extends [
    string,
    Parser.Parser
  ]
    ? Object._$merge<RESULTS, { [K in ACTIVE_PX[0]]: NEXT_STATE['result'] }>
    : RESULTS,
  IS_DONE extends boolean = NEXT_PX extends []
    ? true
    : NEXT_STATE extends never
    ? false
    : false
> = IS_DONE extends true
  ? NEXT_STATE extends never
    ? never
    : {
        input: STATE['input'];
        index: NEXT_STATE['index'];
        result: NEXT_RESULTS;
      }
  : _$objectSequence<NEXT_STATE, NEXT_PX, NEXT_RESULTS>;

interface ObjectSequence_T<
  PX extends ([string, Parser.Parser] | Parser.Parser)[]
> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Parser._$state>
  ): _$objectSequence<typeof x, PX>;
}

export interface ObjectSequence extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], ([string, Parser.Parser] | Parser.Parser)[]>
  ): ObjectSequence_T<typeof x>;
}
