import { Type, Kind } from "..";

export type _$string<Input, S> = Input extends S ? Input : never;

declare abstract class String_T<S extends string> extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string>) => _$string<typeof x, S>;
}

export declare abstract class String extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string>) => String_T<typeof x>;
}
