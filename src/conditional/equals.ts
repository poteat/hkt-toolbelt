import { Kind } from "..";

export type _$equals<T, U> = [T, U] extends [U, T] ? true : false;

export abstract class Equals<T> extends Kind.Kind {
  abstract f: (x: this[Kind._]) => _$equals<T, typeof x>;
}
