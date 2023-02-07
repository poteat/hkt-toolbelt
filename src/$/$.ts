import { Kind, Function } from "..";

export type $<
  F extends Kind.Kind,
  X extends Kind._$inputOf<F>
> = Function._$returnType<
  (F & {
    readonly [Kind._]: X;
  })["f"]
>;
