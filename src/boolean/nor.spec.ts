import { $, Boolean, Test } from "..";

type Nor_Spec = [
  /**
   * !(True || True) = False
   */
  Test.ExpectNot<$<$<Boolean.Nor, true>, true>>,

  /**
   * !(True || False) = False
   */
  Test.ExpectNot<$<$<Boolean.Nor, true>, false>>,

  /**
   * !(False || True) = False
   */
  Test.ExpectNot<$<$<Boolean.Nor, false>, true>>,

  /**
   * !(False || False) = True
   */
  Test.Expect<$<$<Boolean.Nor, false>, false>>
];
