import { $, Test, Type } from "hkt-toolbelt";

type Cast_Spec = [
  /**
   * Can cast a type to itself.
   */
  Test.Expect<Type._$cast<true, true>, true>,

  /**
   * Can cast a type to a subtype.
   */
  Test.Expect<Type._$cast<boolean, true>, true>,

  /**
   * Casting to a supertype keeps the type narrow.
   */
  Test.Expect<Type._$cast<true, boolean>, true>
];

/**
 * Tests associated with `Type.Display`, which forces the compiler to resolve
 * types such that Intellisense may parse them.
 */
type Display_Spec = [
  /**
   * Acts as an identity function.
   */
  Test.Expect<$<Type.Display, "foo">, "foo">
];

/**
 * Tests associated with `Type.ValueOf`, which extracts the values associated
 * with the type, if any exist, via `keyof`.
 */
type ValueOf_Spec = [
  /**
   * The value of a tuple are the tuple elements.
   */
  Test.Expect<$<Type.ValueOf, ["foo", "bar"]>, "foo" | "bar">,

  /**
   * The value of an object are the object values.
   */
  Test.Expect<$<Type.ValueOf, { foo: "foo"; bar: "bar" }>, "foo" | "bar">
];

type R = $<Type.ValueOf, ["foo", "bar"]>;
