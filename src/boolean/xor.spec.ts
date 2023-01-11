import { $, Boolean, Test } from "hkt-toolbelt";

type Xor_Spec = [
  /**
   * True ^ True = False
   */
  Test.ExpectNot<$<Boolean.Xor<true>, true>>,

  /**
   * True ^ False = True
   */
  Test.Expect<$<Boolean.Xor<true>, false>>,

  /**
   * False ^ True = True
   */
  Test.Expect<$<Boolean.Xor<false>, true>>,

  /**
   * False ^ False = False
   */
  Test.ExpectNot<$<Boolean.Xor<false>, false>>
];
