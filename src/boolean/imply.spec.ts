import { $, Boolean, Test } from "hkt-toolbelt";

type Imply_Spec = [
  /**
   * True → True = True
   */
  Test.Expect<$<$<Boolean.Imply, true>, true>>,

  /**
   * True → False = False
   */
  Test.ExpectNot<$<$<Boolean.Imply, true>, false>>,

  /**
   * False → True = True
   */
  Test.Expect<$<$<Boolean.Imply, false>, true>>,

  /**
   * False → False = True
   */
  Test.Expect<$<$<Boolean.Imply, false>, false>>,

  /**
   * Running 'Imply' on a non-boolean type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<Boolean.Imply<true>, number>>
];
