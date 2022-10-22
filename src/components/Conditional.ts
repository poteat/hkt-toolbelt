import { Kind } from "./Kind";

export declare namespace Conditional {
  export type _$equal<T, U> = [T, U] extends [U, T] ? true : false;

  export abstract class $equal<T> extends Kind {
    abstract f: (x: this[Kind._]) => _$equal<T, typeof x>;
  }

  export type _$subtype<Super, X> = X extends Super ? true : false;

  export abstract class $subtype<Super> extends Kind {
    abstract f: (x: this[Kind._]) => _$subtype<Super, typeof x>;
  }
}
