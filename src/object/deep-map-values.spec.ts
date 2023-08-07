import { $, Test, Object, String, Function, Conditional } from '..';

/**
 * Tests for `Object.DeepMap` type, which maps over nested values in an object.
 */
type DeepMapValues_Spec = [
  /**
   * Can map over an object.
   */
  Test.Expect<
    $<
      $<Object.DeepMapValues, $<String.StartsWith, 'foo'>>,
      { a: 'foobar'; b: 'foo'; c: 'bar' }
    >,
    { a: true; b: true; c: false }
  >,

  /**
   * Can map over a nested object.
   */
  Test.Expect<
    $<
      $<Object.DeepMapValues, $<String.StartsWith, 'foo'>>,
      { a: { b: 'foobar'; c: 'foo' }; d: 'bar' }
    >,
    { a: { b: true; c: true }; d: false }
  >,

  /**
   * Emits an error if applied to a non-object.
   */
  // @ts-expect-error
  $<Object.DeepMap<$<String.StartsWith, 'foo'>>, number>,

  /**
   * Emits an error if the specified mapper cannot be applied to the object's
   * values.
   */
  // @ts-expect-error
  $<Object.DeepMapValues<$<String.StartsWith, 'foo'>>, { a: 1; b: 2; c: 3 }>,

  /**
   * Can be applied conditionally using `If`.
   */
  Test.Expect<
    $<
      $<
        Object.DeepMapValues,
        $<
          $<$<Conditional.If, String.IsString>, $<String.StartsWith, 'foo'>>,
          Function.Identity
        >
      >,
      {
        name: {
          first: 'foo';
          last: 'bar';
        };
        age: 42;
      }
    >,
    {
      name: {
        first: true;
        last: false;
      };
      age: 42;
    }
  >
];
