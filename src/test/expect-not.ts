import { Conditional, Test } from "..";

export type ExpectNot<
  X extends Conditional._$equals<X, V> extends true ? V : V & Test._,
  V = false
> = Test._$isNever<V> extends true
  ? X
  : Test._$isNever<X> extends true
  ? ExpectNot<X, V>
  : X;
