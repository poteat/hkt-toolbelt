import { Kind, Type } from '..';

export type _$returnType<T> = T extends (...args: never[]) => infer R
  ? R
  : never;

export interface ReturnType extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], (...args: never[]) => unknown>
  ): _$returnType<typeof x>;
}
