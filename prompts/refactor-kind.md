I would like some help performing a refactor for my higher-order types library for Typescript. To explain, the library is called `hkt-toolbelt` and allows users to build very sophisticated 'type functions' is an expressive way. I'm performing a refactor that expresses my higher order types without generics.

I will structure this problem by providing example input, and then the refactor that I expect.

Here's an example of a 'kind' utility before refactoring:

```ts
import { Kind, Type } from "..";

export type _$and<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  true
]
  ? true
  : false;

interface class And<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$and<T, typeof x>;
}
```

Here is the same utility after refactoring:

```ts
import { Kind, Type } from "..";

export type _$and<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  true
]
  ? true
  : false;

interface And_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$and<T, typeof x>;
}

export interface And extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): And_T<typeof x>;
}
```

With all that in mind, I would like the following utility to be refactored:

```ts
<FILE_CONTENTS>
```
