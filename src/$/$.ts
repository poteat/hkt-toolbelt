import { Kind } from "..";

export type $<F extends Kind.Kind, X extends Kind._$inputOf<F>> = ReturnType<
  (F & {
    readonly [Kind._]: X;
  })["f"]
>;
