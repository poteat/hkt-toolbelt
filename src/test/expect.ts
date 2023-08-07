import { Conditional, Type } from '..';

export abstract class _ {
  abstract readonly _: symbol;
}

export type Expect<
  X extends Conditional._$equals<X, V> extends true ? V : V & _,
  V = true
> = Type._$isNever<V> extends true
  ? X
  : Type._$isNever<X> extends true
  ? Expect<X, V>
  : X;
