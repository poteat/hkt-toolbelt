import { Parser, $, Type, Kind } from "..";

export type _$run<P extends Parser.Parser, X extends string> = $<
  P,
  Type._$cast<{ input: X; index: 0; result: never }, Kind._$inputOf<P>>
>["result"];

declare abstract class Run_T<P extends Parser.Parser> extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string>) => _$run<P, typeof x>;
}

export declare abstract class Run extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], Parser.Parser>) => Run_T<typeof x>;
}
