import Kind from "./Kind";

export declare namespace Function {
  export abstract class Constant<X> extends Kind {
    abstract f: (x: this[Kind._]) => X;
  }

  export abstract class Identity extends Kind {
    abstract f: (x: this[Kind._]) => typeof x;
  }
}

export type Function = (...x: never[]) => unknown;

export default Function;
