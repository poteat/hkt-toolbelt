import { $, Parser, Type, Kind, Conditional } from '..';

export type _$optional<
  STATE extends Parser._$state,
  P extends Parser.Parser,
  RESULT = never,
  NEXT_STATE extends Parser._$state = $<
    P,
    Type._$cast<STATE, Kind._$inputOf<P>>
  >
> = Conditional._$equals<NEXT_STATE, never> extends true
  ? {
      input: STATE['input'];
      index: STATE['index'];
      result: RESULT;
    }
  : {
      input: STATE['input'];
      index: NEXT_STATE['index'];
      result: NEXT_STATE['result'];
    };

interface Optional_T<P extends Parser.Parser> extends Parser.Parser {
  f(x: Type._$cast<this[Kind._], Parser._$state>): _$optional<typeof x, P>;
}

export interface Optional extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser.Parser>): Optional_T<typeof x>;
}
