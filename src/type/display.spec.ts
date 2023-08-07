import { $, Test, Type } from '..';

/**
 * Tests associated with `Type.Display`, which forces the compiler to resolve
 * types such that Intellisense may parse them.
 */
type Display_Spec = [
  /**
   * Acts as an identity function.
   */
  Test.Expect<$<Type.Display, 'foo'>, 'foo'>
];
