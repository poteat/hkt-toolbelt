import { Kind } from "..";

export type _$notEquals<T, U> = [T, U] extends [U, T] ? false : true;

interface NotEquals_T<T> extends Kind.Kind {
  f(x: this[Kind._]): _$notEquals<T, typeof x>;
}

export interface NotEquals extends Kind.Kind {
  f(x: this[Kind._]): NotEquals_T<typeof x>;
}
