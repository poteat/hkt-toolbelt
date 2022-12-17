import { $, Kind, Parser, Type } from "..";

export type _$map<
  STATE extends Parser._$state,
  P extends Parser.Parser,
  K extends Kind.Kind,
  NEW_STATE extends Parser._$state = $<P, Type._$cast<STATE, Kind._$inputOf<P>>>
> = NEW_STATE extends never
  ? never
  : {
      input: NEW_STATE["input"];
      index: NEW_STATE["index"];
      result: $<K, Type._$cast<NEW_STATE["result"], Kind._$inputOf<K>>>;
    };

declare abstract class Map_T2<
  P extends Parser.Parser,
  K extends Kind.Kind
> extends Parser.Parser {
  abstract f: (
    x: Type._$cast<this[Kind._], Parser._$state>
  ) => _$map<typeof x, P, K>;
}

declare abstract class Map_T<K extends Kind.Kind> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Parser.Parser>
  ) => Map_T2<typeof x, K>;
}

export declare abstract class Map extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], Kind.Kind>) => Map_T<typeof x>;
}
