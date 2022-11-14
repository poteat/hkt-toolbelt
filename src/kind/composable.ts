import { Type, List, Kind } from "..";

export type _$composable<FX extends Kind.Kind[]> = List._$every<
  Kind.ComposablePair,
  List._$pair<FX>
>;

export abstract class Composable extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Kind.Kind[]>
  ) => _$composable<typeof x>;
}
