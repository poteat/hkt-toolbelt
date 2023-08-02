import { $, Conditional, Test } from "hkt-toolbelt"

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

type Equals_Spec = [
  /**
   * An empty array always returns true.
   */
  Test.Expect<$<$<Conditional.ExtendsAll, []>, any>, true>,
  Test.Expect<$<$<Conditional.ExtendsAll, []>, never>, true>,

  /**
   * A non-array is not a valid argument.
   */
  //@ts-expect-error
  Test.Expect<$<$<Conditional.ExtendsAll, true>, true>, true>,

  /** Subclasses extend their Superclass */
  Test.Expect<$<$<Conditional.ExtendsAll, [Cat, Dog]>, Animal>, true>,

  /**
   * Instances extend their Types
   */
  Test.Expect<$<$<Conditional.ExtendsAll, [true, false]>, boolean>, true>,
  Test.Expect<$<$<Conditional.ExtendsAll, [0, 100, -100]>, number>, true>,

  /**
   * Subtypes extend Supertypes
   */
  Test.Expect<$<$<Conditional.ExtendsAll, [never]>, unknown>, true>,

  /**
   * Elements of Union Types extend their Unions.
   */
  Test.Expect<
    $<
      $<Conditional.ExtendsAll, [string, number, boolean]>,
      string | number | boolean
    >,
    true
  >,
  Test.Expect<
    $<$<Conditional.ExtendsAll, [string | number, string | boolean]>, string>,
    false
  >,

  /**
   * Intersections extend their elements
   */
  Test.Expect<
    $<
      $<Conditional.ExtendsAll, [{ a: 1 } & { b: 2 }, { a: 1 } & { c: 3 }]>,
      { a: 1 }
    >,
    true
  >,
  Test.Expect<
    $<$<Conditional.ExtendsAll, [{ a: 1 }, { b: 2 }]>, { a: 1 } & { b: 2 }>,
    false
  >,

  /**
   * Nothing extends `never`
   */
  Test.Expect<
    $<
      $<Conditional.ExtendsAll, [any, unknown, never, string, number, boolean]>,
      never
    >,
    false
  >,

  /**
   * `never` extends everything
   */
  Test.Expect<
    $<$<Conditional.ExtendsAll, [never, never, never]>, any | unknown | never>,
    true
  >,

  /**
   * Everything extends `unknown`
   */
  Test.Expect<
    $<
      $<Conditional.ExtendsAll, [any, unknown, never, string, number, boolean]>,
      unknown
    >,
    true
  >,

  /**
   * `unknown` extends nothing (except `any` and `unknown`)
   */
  Test.Expect<
    $<
      $<Conditional.ExtendsAll, [unknown, unknown, unknown]>,
      object | string | boolean | number | never
    >,
    false
  >
]
