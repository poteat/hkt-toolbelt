import { $, Test, Object, String, Function, Conditional } from "hkt-toolbelt";

type MapValues_Spec = [
  /**
   * Can map the values of an object.
   */
  Test.Expect<
    $<Object.MapValues<String.ToUpper>, { a: "foo"; b: "bar"; c: "baz" }>,
    { a: "FOO"; b: "BAR"; c: "BAZ" }
  >,

  /**
   * Checks that the value is the input type.
   */
  // @ts-expect-error
  $<Object.MapValues<String.ToUpper>, { a: 1; b: 2; c: 3 }>,

  /**
   * MapValues does not apply recursively.
   */
  Test.Expect<
    $<
      Object.MapValues<
        $<
          $<$<Conditional.If, String.IsString>, String.ToUpper>,
          Function.Identity
        >
      >,
      { a: "foo"; b: { c: "bar"; d: "baz" } }
    >,
    { a: "FOO"; b: { c: "bar"; d: "baz" } }
  >,

  /**
   * Will emit an error if applied to a non-object.
   */
  // @ts-expect-error
  $<Object.MapValues<String.ToUpper>, number>
];
