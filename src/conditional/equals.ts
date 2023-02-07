import { Kind } from "..";

export type _$equals<T, U> = [T, U] extends [U, T] ? true : false;

interface Equals_T<T> extends Kind.Kind {
  f(x: this[Kind._]): _$equals<T, typeof x>;
}

export interface Equals extends Kind.Kind {
  f(x: this[Kind._]): Equals_T<typeof x>;
}
