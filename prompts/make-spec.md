I would like some help writing some unit tests for my higher-order types library for Typescript. To explain, the library is called `hkt-toolbelt` and allows users to build very sophisticated 'type functions' is an expressive way.

Here's an example of some code I would like to test:

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

Here is an example of some corresponding tests:

```ts
import { $, Boolean, Test } from "hkt-toolbelt";

type And_Spec = [
  /**
   * True && True = True
   */
  Test.Expect<$<$<Boolean.And, true>, true>>,

  /**
   * True && False = False
   */
  Test.ExpectNot<$<$<Boolean.And, true>, false>>,

  /**
   * False && True = False
   */
  Test.ExpectNot<$<$<Boolean.And, false>, true>>,

  /**
   * False && False = False
   */
  Test.ExpectNot<$<$<Boolean.And, false>, false>>,

  /**
   * Running 'And' on a non-boolean type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<Boolean.And<true>, number>>
];
```

With all that in mind, I would like some tests to be written for the following utility:

```ts
<FILE_CONTENTS>
```
