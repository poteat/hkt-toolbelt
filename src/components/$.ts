import { Kind } from "hkt-toolbelt";

export type $<F extends Kind, X extends Kind.Input<F>> = ReturnType<
  (F & {
    readonly [Kind._]: X;
  })["f"]
>;

export default $;
