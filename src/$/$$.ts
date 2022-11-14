import { Kind, List } from "..";

export type $$<
  FX extends Kind.Kind[],
  X extends FX extends [] ? unknown : Kind._$inputOf<List._$first<FX>>
> = Kind._$pipe<FX, X>;
