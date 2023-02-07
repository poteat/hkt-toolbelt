import { $, Kind, Type, Parser, List } from "..";

type _$takeSequence<
  STATE extends Parser._$state,
  PX extends ([Parser.Parser] | Parser.Parser)[],
  RESULT = never,
  ACTIVE_PX extends [Parser.Parser] | Parser.Parser = List._$first<PX>,
  NEXT_PX extends ([Parser.Parser] | Parser.Parser)[] = Type._$cast<
    List._$shift<PX>,
    ([Parser.Parser] | Parser.Parser)[]
  >,
  NEXT_STATE extends Parser._$state = ACTIVE_PX extends [Parser.Parser]
    ? $<ACTIVE_PX[0], Type._$cast<STATE, Kind._$inputOf<ACTIVE_PX[0]>>>
    : ACTIVE_PX extends Parser.Parser
    ? $<ACTIVE_PX, Type._$cast<STATE, Kind._$inputOf<ACTIVE_PX>>>
    : never,
  NEXT_RESULT extends unknown = ACTIVE_PX extends [Parser.Parser]
    ? NEXT_STATE["result"]
    : RESULT,
  IS_DONE extends boolean = NEXT_PX extends []
    ? true
    : NEXT_STATE extends never
    ? false
    : false
> = IS_DONE extends true
  ? NEXT_STATE extends never
    ? never
    : {
        input: STATE["input"];
        index: NEXT_STATE["index"];
        result: NEXT_RESULT;
      }
  : _$takeSequence<NEXT_STATE, NEXT_PX, NEXT_RESULT>;

interface TakeSequence_T<PX extends ([Parser.Parser] | Parser.Parser)[]>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser._$state>): _$takeSequence<typeof x, PX>;
}

export interface TakeSequence extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], ([Parser.Parser] | Parser.Parser)[]>
  ): TakeSequence_T<typeof x>;
}
