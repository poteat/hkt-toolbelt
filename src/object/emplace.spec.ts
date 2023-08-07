import { $, Test, Object } from '..';

type Emplace_Spec = [
  /**
   * Can emplace a '1' into key 'a'.
   */
  Test.Expect<$<$<Object.Emplace, 'a'>, 1>, { a: 1 }>,

  /**
   * Can emplace onto unions.
   */
  Test.Expect<$<$<Object.Emplace, 'a' | 'b' | 'c'>, 1>, { a: 1; b: 1; c: 1 }>
];
