import { Type, Kind } from "..";

export type _$outputOf<F extends Kind.Kind> = F extends {
  f: (x: never) => infer X;
}
  ? X
  : unknown;

export abstract class OutputOf extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], Kind.Kind>) => _$outputOf<typeof x>;
}
