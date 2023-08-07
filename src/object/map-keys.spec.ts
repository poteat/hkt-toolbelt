import { $, Test, Object, String } from '..'

type MapKeys_Spec = [
  /**
   * Can map the keys of an object.
   */
  Test.Expect<
    $<$<Object.MapKeys, String.ToUpper>, { a: 1; b: 2; c: 3 }>,
    { A: 1; B: 2; C: 3 }
  >,

  /**
   * MapKeys does not apply recursively.
   */
  Test.Expect<
    $<$<Object.MapKeys, String.ToUpper>, { a: 1; b: { c: 2; d: 3 } }>,
    { A: 1; B: { c: 2; d: 3 } }
  >,

  /**
   * Requires the function to return a string.
   */
  // @ts-expect-error
  $<$<Object.MapKeys, String.EndsWith<'foo'>>, { a: 1; b: 2; c: 3 }>,

  /**
   * Will emit an error if applied to a non-object.
   */
  // @ts-expect-error
  $<$<Object.MapKeys, String.ToUpper>, number>
]
