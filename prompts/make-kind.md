I would like some help performing a task for my higher-order types library for Typescript. To explain, the library is called `hkt-toolbelt` and allows users to build very sophisticated 'type functions' is an expressive way.

I will structure this problem by providing example input, and then the result I expect.

The task is to write 'kind' interfaces for the underlying base type. If the base type takes in N generics, there will be N corresponding kind interfaces, in a curry fashion. If the base type only takes in one generic, only one kind interface will be written. In general, instead of using `any`, use `unknown`.

Here's an example of a 'kind' utility before the task. This takes in two generics.

```ts
export type _$and<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  true
]
  ? true
  : false;
```

Here is the same utility after the task has been completed:

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

Here is a second example of an input:

```ts
export type _$not<T extends boolean> = T extends true ? false : true;
```

And the corresponding output:

```ts
import { Type, Kind } from "..";

export type _$not<T extends boolean> = T extends true ? false : true;

export interface Not extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$not<typeof x>;
}
```

With all that in mind, I would like the task to be performed on the following utility:

```ts
<FILE_CONTENTS>
```
