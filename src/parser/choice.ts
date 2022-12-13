import { $, Kind, Type, Parser, List, Conditional } from "..";

type _$choice<PX extends Parser.Parser[], I extends string> = $<
  Kind.Pipe<[List.Map<Kind.Apply<I>>, List.Find<Conditional.NotEquals<never>>]>,
  PX
>;

declare abstract class Choice_T<PX extends Parser.Parser[]> extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string>) => _$choice<PX, typeof x>;
}

export declare abstract class Choice extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Parser.Parser[]>
  ) => Choice_T<typeof x>;
}
