import { Kind } from "./Kind";

export type $<F extends Kind, X> = ReturnType<
  (F & {
    readonly x: X;
  })["f"]
>;
