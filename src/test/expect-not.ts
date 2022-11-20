import { Conditional, Test, Type } from "..";

export type ExpectNot<
  X extends Conditional._$equals<X, V> extends true ? V : V & Test._,
  V = false
> = Type._$isNever<V> extends true
  ? X
  : Type._$isNever<X> extends true
  ? ExpectNot<X, V>
  : X;
