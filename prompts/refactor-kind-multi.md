I would like some help performing a refactor for my higher-order types library for Typescript. To explain, the library is called `hkt-toolbelt` and allows users to build very sophisticated 'type functions' is an expressive way. I'm performing a refactor that expresses my higher order types without generics, whereby we are 'currying' the type parameters.

I will structure this problem by providing example input, and then the refactor that I expect.

Here's an example of a 'kind' utility before refactoring:

```ts
import { $, Type, Function, Kind } from "..";

export type _$if<
  Predicate extends Kind.Kind<(x: never) => boolean>,
  Then extends Kind.Kind,
  Else extends Kind.Kind,
  X extends Kind._$inputOf<Predicate>
> = $<Predicate, X> extends true
  ? $<Then, Type._$cast<X, Kind._$inputOf<Then>>>
  : $<Else, Type._$cast<X, Kind._$inputOf<Else>>>;

export abstract class If<
  Predicate extends Kind.Kind<(x: never) => boolean>,
  Then extends Kind.Kind,
  Else extends Kind.Kind = Function.Constant<never>
> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Kind._$inputOf<Predicate>>
  ) => _$if<Predicate, Then, Else, typeof x>;
}
```

Here is the same utility after refactoring:

```ts
import { $, Type, Function, Kind } from "..";

export type _$if<
  Predicate extends Kind.Kind<(x: never) => boolean>,
  Then extends Kind.Kind,
  Else extends Kind.Kind,
  X extends Kind._$inputOf<Predicate>
> = $<Predicate, X> extends true
  ? $<Then, Type._$cast<X, Kind._$inputOf<Then>>>
  : $<Else, Type._$cast<X, Kind._$inputOf<Else>>>;

export interface If_T3<
  Predicate extends Kind.Kind<(x: never) => boolean>,
  Then extends Kind.Kind,
  Else extends Kind.Kind = Function.Constant<never>
> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind._$inputOf<Predicate>>
  ): _$if<Predicate, Then, Else, typeof x>;
}

export interface If_T2<
  Predicate extends Kind.Kind<(x: never) => boolean>,
  Then extends Kind.Kind
> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): If_T3<Predicate, Then, typeof x>;
}

export interface If_T1<Predicate extends Kind.Kind<(x: never) => boolean>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): If_T2<Predicate, typeof x>;
}

export interface If extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => boolean>>
  ): If_T1<typeof x>;
}
```

So the steps can be summarized as:

1. Change all classes to interfaces
2. Curry each interface by adding T_N successively

With all that in mind, I would like the following utility to be refactored:

```ts
<FILE_CONTENTS>
```
