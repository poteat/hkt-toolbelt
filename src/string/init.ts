import { Type, Kind } from "..";

type _$init2<
  S extends string,
  O extends string = ""
> = S extends `${infer Head}${infer Tail}`
  ? Tail extends ""
    ? O
    : _$init2<Tail, `${O}${Head}`>
  : O;

export type _$init<S extends string> = string extends S ? string : _$init2<S>;

export abstract class Init extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string>) => _$init<typeof x>;
}
