import Kind from "./Kind";
import List from "./List";

export type $<F extends Kind, X extends Kind.InputOf<F>> = ReturnType<
  (F & {
    readonly [Kind._]: X;
  })["f"]
>;

export type $$<
  FX extends Kind[],
  X extends FX extends [] ? unknown : Kind.InputOf<List._$first<FX>>
> = Kind._$pipe<FX, X>;

export default $;
