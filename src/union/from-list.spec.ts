import { $, Test, Union } from '..'

/**
 * Test `Union.ToTuple`, which converts a union type to a tuple composed of the
 * elements in the union.
 */
type ToList_Spec = [
  /**
   * Can convert a simple tuple to a union.
   */
  Test.Expect<$<Union.FromList, [1, 2, 3]>, 1 | 2 | 3>,

  /**
   * Length of the union is the number of elements in the union.
   */
  Test.Expect<$<Union.Length, $<Union.FromList, [1, 2, 3]>>, 3>,

  /**
   * Duplicate elements in tuple are not repeated in emitted union.
   */
  Test.Expect<$<Union.FromList, [1, 1, 2]>, 1 | 2>,
  Test.Expect<$<Union.Length, $<Union.FromList, [number, number, string]>>, 2>,

  /**
   * Converting [true, false] results in boolean.
   */
  Test.Expect<$<Union.FromList, [true, false]>, boolean>,
  /**
   * Length of true | false still resolves as 2.
   */
  Test.Expect<$<Union.Length, $<Union.FromList, [true, false]>>, 2>,

  /**
   * Can convert boolean union with other types.
   */
  Test.Expect<$<Union.FromList, [string, boolean]>, string | boolean>,

  /**
   * Converting boolean with other types results in both true and false being
   * present separately.
   */
  Test.Expect<$<Union.Length, $<Union.FromList, [string, boolean]>>, 3>,

  /**
   * Can handle unions of strings.
   */
  Test.Expect<$<Union.FromList, ['foo', 'bar', string]>, string>,

  /**
   * Generates a list of the correct length.
   */
  Test.Expect<$<Union.Length, $<Union.FromList, ['foo', 'bar', 'qux']>>, 3>,

  /**
   * When an empty tuple is provided, the empty union `never` is emitted.
   */
  Test.Expect<$<Union.FromList, []>, never>,

  /**
   * When `never` is an element in the input tuple, it is excluded from the emitted union.
   */
  Test.Expect<$<Union.FromList, [never]>, never>,
  Test.Expect<$<Union.FromList, [never, unknown]>, unknown>,

  /**
   * Can convert a tuple of tuples into a union of tuples.
   */
  Test.Expect<$<Union.FromList, [['foo'], ['bar']]>, ['foo'] | ['bar']>,

  /**
   * Non-list input results in error.
   */
  // @ts-expect-error
  Test.Expect<$<Union.FromList, unknown>, unknown>
]
