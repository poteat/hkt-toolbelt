import { $, Test, Union } from '..'

type Length_Spec = [
  /**
   * Can get the length of a union.
   */
  Test.Expect<$<Union.Length, '1' | '2' | '3'>, 3>,

  /**
   * Can get the length of an empty union.
   */
  Test.Expect<$<Union.Length, never>, 0>,

  /**
   * Can get the length of a single element.
   */
  Test.Expect<$<Union.Length, '1'>, 1>,

  /**
   * Can get the length of a union with duplicates.
   */
  Test.Expect<$<Union.Length, '1' | '1' | '2'>, 2>
]
