I would like some help performing a refactor for my higher-order types library for Typescript. To explain, the library is called `hkt-toolbelt` and allows users to build very sophisticated 'type functions' is an expressive way. I'm performing a refactor that changes the class representation to an interface representation.

I will structure this problem by providing example input, and then the refactor that I expect.

Here's an example of a 'kind' utility before refactoring:

```ts
import { $, Type, Kind, Combinator } from "..";

export abstract class ApplySelf extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Combinator.RecursiveKind>
  ) => $<typeof x, Type._$cast<typeof x, Kind._$inputOf<typeof x>>>;
}
```

Here is the same utility after refactoring:

```ts
import { $, Type, Kind, Combinator } from "..";

export interface ApplySelf extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Combinator.RecursiveKind>
  ): $<typeof x, Type._$cast<typeof x, Kind._$inputOf<typeof x>>>;
}
```

With all that in mind, I would like the following utility to be refactored:

```ts
<FILE_CONTENTS>
```
