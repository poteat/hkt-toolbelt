import { Type, List, Kind } from '..';

export type _$pipe<FX extends Kind.Kind[], X> = Kind._$compose<
  List._$reverse<FX>,
  X
>;

interface Pipe_T<FX extends Kind.Kind[]> extends Kind.Kind {
  f(
    x: Type._$cast<
      this[Kind._],
      FX extends [] ? unknown : Kind._$inputOf<List._$first<FX>>
    >
  ): _$pipe<FX, typeof x>;
}

export interface Pipe extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind[]>
  ): Kind._$composable<List._$reverse<typeof x>> extends true
    ? Pipe_T<typeof x>
    : never;
}
