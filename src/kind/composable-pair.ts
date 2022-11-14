import { Type, Kind } from "..";

type _$composablePair<F extends [Kind.Kind, Kind.Kind]> = Kind._$outputOf<
  F[1]
> extends Kind._$inputOf<F[0]>
  ? true
  : false;

export abstract class ComposablePair extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], [Kind.Kind, Kind.Kind]>
  ) => _$composablePair<typeof x>;
}
