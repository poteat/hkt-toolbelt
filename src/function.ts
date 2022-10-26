import { Kind } from ".";

export abstract class Constant<X> extends Kind {
  abstract f: (x: this[Kind._]) => X;
}

export abstract class Identity extends Kind {
  abstract f: (x: this[Kind._]) => typeof x;
}

export type Function = (...x: never[]) => unknown;

export * as Function from "./function";
