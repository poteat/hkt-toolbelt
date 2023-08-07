import { $, Boolean, Test } from '..';

type Nand_Spec = [
  /**
   * !(True && True) = False
   */
  Test.ExpectNot<$<$<Boolean.Nand, true>, true>>,

  /**
   * !(True && False) = True
   */
  Test.Expect<$<$<Boolean.Nand, true>, false>>,

  /**
   * !(False && True) = True
   */
  Test.Expect<$<$<Boolean.Nand, false>, true>>,

  /**
   * !(False && False) = True
   */
  Test.Expect<$<$<Boolean.Nand, false>, false>>,

  /**
   * Running 'Nand' on a non-boolean type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<Boolean.Nand<true>, number>>
];
