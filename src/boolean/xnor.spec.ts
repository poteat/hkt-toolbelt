import { $, Boolean, Test } from "..";

type Xnor_Spec = [
  /**
   * !(True ^ True) = True
   */
  Test.Expect<$<$<Boolean.Xnor, true>, true>>,

  /**
   * !(True ^ False) = False
   */
  Test.ExpectNot<$<$<Boolean.Xnor, true>, false>>,

  /**
   * !(False ^ True) = False
   */
  Test.ExpectNot<$<$<Boolean.Xnor, false>, true>>,

  /**
   * !(False ^ False) = True
   */
  Test.Expect<$<$<Boolean.Xnor, false>, false>>
];
