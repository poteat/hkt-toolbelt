import { $, Boolean, Test } from "hkt-toolbelt";

type Nimply_Spec = [
  /**
   * True ↛ True = False
   */
  Test.ExpectNot<$<$<Boolean.Nimply, true>, true>>,

  /**
   * True ↛ False = True
   */
  Test.Expect<$<$<Boolean.Nimply, true>, false>>,

  /**
   * False ↛ True = False
   */
  Test.ExpectNot<$<$<Boolean.Nimply, false>, true>>,

  /**
   * False ↛ False = False
   */
  Test.ExpectNot<$<$<Boolean.Nimply, false>, false>>,

  /**
   * Running 'Nimply' on a non-boolean type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<Boolean.Nimply, true>, number>>
];
