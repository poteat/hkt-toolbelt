import { $, Boolean, Test } from "..";

type Or_Spec = [
  /**
   * True || True = True
   */
  Test.Expect<$<$<Boolean.Or, true>, true>>,

  /**
   * True || False = True
   */
  Test.Expect<$<$<Boolean.Or, true>, false>>,

  /**
   * False || True = True
   */
  Test.Expect<$<$<Boolean.Or, false>, true>>,

  /**
   * False || False = False
   */
  Test.ExpectNot<$<$<Boolean.Or, false>, false>>
];
