I would like some help performing a refactor for my higher-order types library for Typescript. To explain, the library is called `hkt-toolbelt` and allows users to build very sophisticated 'type functions' is an expressive way. I'm performing a refactor that expresses my higher order types without generics.

I will structure this problem by providing example input, and then the refactor that I expect.

This refactor is of unit tests for a particular kind utility. The input unit test example is as follows:

```ts
import { $, Boolean, Test } from "hkt-toolbelt";

type And_Spec = [
  /**
   * True && True = True
   */
  Test.Expect<$<Boolean.And<true>, true>>,

  /**
   * True && False = False
   */
  Test.ExpectNot<$<Boolean.And<true>, false>>,

  /**
   * False && True = False
   */
  Test.ExpectNot<$<Boolean.And<false>, true>>,

  /**
   * False && False = False
   */
  Test.ExpectNot<$<Boolean.And<false>, false>>,

  /**
   * Running 'And' on a non-boolean type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<Boolean.And<true>, number>>
];
```

Here is the same unit test after refactoring:

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

So the steps can be summarized as:

1. Replace all instances of MyKind<Input> with $<MyKind, Input>

The '$' is the 'application' operator for kinds. It is a function that takes a kind and an input and returns the output of the kind.

If the unit tests are already using the `$` operator, just output the same unit tests.

With all that in mind, I would like the following unit test to be refactored:

```ts
<FILE_CONTENTS>
```
