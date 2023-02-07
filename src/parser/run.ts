import { Parser, $, Type, Kind } from "..";

export type _$run<P extends Parser.Parser, X extends string> = $<
  P,
  Type._$cast<{ input: X; index: 0; result: never }, Kind._$inputOf<P>>
>["result"];

interface Run_T<P extends Parser.Parser> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$run<P, typeof x>;
}

export interface Run extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser.Parser>): Run_T<typeof x>;
}
