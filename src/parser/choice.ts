import { $, Kind, Type, Parser, List, Conditional } from "..";

export type _$choice<
  PX extends Parser.Parser[],
  STATE extends Parser._$state,
  MATCH_RESULT extends Parser._$state = Type._$cast<
    $<
      Kind.Pipe<
        [List.Map<Kind.Apply<STATE>>, List.Find<Conditional.NotEquals<never>>]
      >,
      PX
    >,
    Parser._$state
  >,
  NEW_STATE extends Parser._$state = MATCH_RESULT extends never
    ? never
    : {
        input: STATE["input"];
        index: MATCH_RESULT["index"];
        result: MATCH_RESULT["result"];
      }
> = NEW_STATE;

declare abstract class Choice_T<
  PX extends Parser.Parser[]
> extends Parser.Parser {
  abstract f: (
    x: Type._$cast<this[Kind._], Parser._$state>
  ) => _$choice<PX, typeof x>;
}

export declare abstract class Choice extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Parser.Parser[]>
  ) => Choice_T<typeof x>;
}
