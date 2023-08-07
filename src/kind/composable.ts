import { Type, List, Kind } from '..';

export type _$composable<FX extends Kind.Kind[]> = List._$every<
  Kind.ComposablePair,
  List._$pair<FX>
>;

export interface Composable extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind[]>): _$composable<typeof x>;
}
