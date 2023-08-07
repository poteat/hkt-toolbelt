import { $, Conditional, Test } from "..";

class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
}
class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }
}
class Cat extends Animal {
  constructor(name: string) {
    super(name)
  }
}

type ExtendsAll_Spec = [
  /**
   * An empty array returns true.
   */
  Test.Expect<$<$<Conditional.ExtendsAll, any>, []>, true>,
  Test.Expect<$<$<Conditional.ExtendsAll, never>, []>, true>,

  /**
   * A non-array is not a valid argument.
   */
  //@ts-expect-error
  Test.Expect<$<$<Conditional.ExtendsAll, true>, true>, true>,

  /** Subclasses extend their Superclass */
  Test.Expect<$<$<Conditional.ExtendsAll, Animal>, [Cat, Dog]>, true>,

  /**
   * Instances extend their Types
   */
  Test.Expect<$<$<Conditional.ExtendsAll, boolean>, [true, false]>, true>,
  Test.Expect<$<$<Conditional.ExtendsAll, number>, [0, 100, -100]>, true>,

  /**
   * Subtypes extend Supertypes
   */
  Test.Expect<$<$<Conditional.ExtendsAll, unknown>, [never]>, true>,

  /**
   * Elements of Union Types extend their Unions.
   */
  Test.Expect<
    $<
      $<Conditional.ExtendsAll, string | number | boolean>,
      [string, number, boolean]
    >,
    true
  >,
  Test.Expect<
    $<$<Conditional.ExtendsAll, string>, [string | number, string | boolean]>,
    false
  >,

  /**
   * Intersections extend their elements
   */
  Test.Expect<
    $<
      $<Conditional.ExtendsAll, { a: 1 }>,
      [{ a: 1 } & { b: 2 }, { a: 1 } & { c: 3 }]
    >,
    true
  >,
  Test.Expect<
    $<$<Conditional.ExtendsAll, { a: 1 } & { b: 2 }>, [{ a: 1 }, { b: 2 }]>,
    false
  >,

  /**
   * Nothing extends `never`
   */
  Test.Expect<
    $<
      $<Conditional.ExtendsAll, never>,
      [any, unknown, never, string, number, boolean]
    >,
    false
  >,

  /**
   * `never` extends everything
   */
  Test.Expect<
    $<$<Conditional.ExtendsAll, any | unknown | never>, [never, never, never]>,
    true
  >,

  /**
   * Everything extends `unknown`
   */
  Test.Expect<
    $<
      $<Conditional.ExtendsAll, unknown>,
      [any, unknown, never, string, number, boolean]
    >,
    true
  >,

  /**
   * `unknown` extends nothing (except `any` and `unknown`)
   */
  Test.Expect<
    $<
      $<Conditional.ExtendsAll, object | string | boolean | number | never>,
      [unknown, unknown, unknown]
    >,
    false
  >
]
