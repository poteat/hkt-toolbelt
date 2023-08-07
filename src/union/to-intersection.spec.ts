import { $, Test, Union } from "..";

declare function overloaded(x: number): string;
declare function overloaded(x: string): string;

/**
 * Tests for `Union.ToIntersection`, which converts a union type to an
 * intersection type.
 */
type ToIntersection_Spec = [
  /**
   * `Union.ToIntersection` should convert a union type to an intersection type.
   */
  Test.Expect<
    $<Union.ToIntersection, { a: "foo" } | { b: "foo" }>,
    { a: "foo"; b: "foo" }
  >,

  /**
   * Intersection of two non-compatible types results in `never`.
   */
  Test.Expect<$<Union.ToIntersection, number | string>, never>,

  /**
   * Can combine functions, which results in a overloaded function.
   */
  Test.Expect<
    $<Union.ToIntersection, ((x: number) => string) | ((x: string) => string)>,
    typeof overloaded
  >,

  /**
   * Any non-union type is not changed.
   */
  Test.Expect<$<Union.ToIntersection, number>, number>,

  /**
   * Boolean type is not changed.
   */
  Test.Expect<$<Union.ToIntersection, boolean>, boolean>,

  /**
   * Can intersect boolean with other types.
   */
  Test.Expect<$<Union.ToIntersection, boolean | [number]>, [number] & boolean>,

  /**
   * Can intersect 'true' with other types.
   */
  Test.Expect<$<Union.ToIntersection, true | [number]>, [number] & true>,

  /**
   * Applying to true | false results in boolean.
   */
  Test.Expect<$<Union.ToIntersection, true | false>, boolean>
];
