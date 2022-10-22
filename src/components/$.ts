import { Kind } from "hkt-toolbelt";

export type $<F extends Kind, X> = ReturnType<
  (F & {
    readonly [Kind._]: X;
  })["f"]
>;

export default $;
