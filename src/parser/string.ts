import { Type, Kind, Parser, String as _String, NaturalNumber } from "..";

export type _$string<
  STATE extends Parser._$state,
  TARGET extends string,
  SLICED_INPUT extends string = _String._$slice<STATE["input"], STATE["index"]>,
  MATCH_RESULT extends string = SLICED_INPUT extends `${TARGET}${string}`
    ? TARGET
    : never,
  NEW_INDEX extends number = NaturalNumber._$add<
    STATE["index"],
    _String._$length<MATCH_RESULT>
  >,
  NEW_STATE extends Parser._$state = MATCH_RESULT extends never
    ? never
    : {
        input: STATE["input"];
        index: NEW_INDEX;
        result: MATCH_RESULT;
      }
> = NEW_STATE;

interface String_T<S extends string> extends Parser.Parser {
  f(x: Type._$cast<this[Kind._], Parser._$state>): _$string<typeof x, S>;
}

export interface String extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): String_T<typeof x>;
}
