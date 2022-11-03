import { Kind } from ".";

export type _$toIntersection2<T> = (
  T extends unknown ? (x: T) => unknown : never
) extends (x: infer X) => void
  ? X
  : never;

export type _$toIntersection<T> = boolean extends T
  ? boolean & _$toIntersection2<Exclude<T, boolean>>
  : _$toIntersection2<T>;

export declare abstract class ToIntersection extends Kind {
  abstract f: (x: this[Kind._]) => _$toIntersection<this[Kind._]>;
}

export type _$toTuple<T, O extends unknown[] = []> = _$toIntersection<
  T extends unknown ? (t: T) => T : never
> extends (x: never) => infer X
  ? _$toTuple<Exclude<T, X>, [X, ...O]>
  : O;

export declare abstract class ToTuple extends Kind {
  abstract f: (x: this[Kind._]) => _$toTuple<this[Kind._]>;
}

export * as Union from "./union";
