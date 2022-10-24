import { Kind } from "./Kind";

export declare namespace Conditional {
  export type _$equals<T, U> = [T, U] extends [U, T] ? true : false;

  export abstract class Equals<T> extends Kind {
    abstract f: (x: this[Kind._]) => _$equals<T, typeof x>;
  }

  export type _$subtype<Super, X> = X extends Super ? true : false;

  export abstract class SubtypeOf<Super> extends Kind {
    abstract f: (x: this[Kind._]) => _$subtype<Super, typeof x>;
  }
}

export default Conditional;
