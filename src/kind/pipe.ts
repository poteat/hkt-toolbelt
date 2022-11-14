import { Type, List, Kind } from "..";

export type _$pipe<FX extends Kind.Kind[], X> = Kind._$compose<
  List._$reverse<FX>,
  X
>;

export abstract class Pipe<
  FX extends Kind._$composable<List._$reverse<FX>> extends true
    ? Kind.Kind[]
    : never
> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<
      this[Kind._],
      FX extends [] ? unknown : Kind._$inputOf<List._$first<FX>>
    >
  ) => _$pipe<FX, typeof x>;
}
