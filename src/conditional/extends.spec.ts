import { $, $$, $N, Kind, Conditional, Function, Test } from "hkt-toolbelt";

type Extends_Spec = [
  /**
   * T extends T => true
   */
  Test.Expect<$<$<Conditional.Extends, true>, true>>,

  /**
   * true extends boolean => true
   */
  Test.Expect<$<$<Conditional.Extends, boolean>, true>>,

  /**
   * boolean extends true => false
   */
  Test.ExpectNot<$<$<Conditional.Extends, true>, boolean>>,

  /**
   * number extends string => false
   */
  Test.ExpectNot<$<$<Conditional.Extends, string>, number>>,

  /**
   * `unknown` extends `unknown`.
   */
  Test.Expect<$<$<Conditional.Extends, unknown>, unknown>>,

  /**
   * `never` extends `never`.
   */
  Test.Expect<$<$<Conditional.Extends, never>, never>>,

  Test.Expect<
    $<
      $N<Conditional.If, [
        $<Conditional.Extends, never>,
        $<Function.Constant, true>,
        $<Function.Constant, false>,
      ]>, 
      never
    >,
    true
  >,

  /**
   * `never` extends everything, everything extends `unknown`.
   */
  Test.Expect<$<$<Conditional.Extends, string | number | boolean | symbol | object | unknown[]>, never>>,
  Test.Expect<$<$<Conditional.Extends, unknown>, never>>,
  Test.Expect<$<$<Conditional.Extends, unknown>, string | number | boolean | symbol | object | unknown[]>>,

  /**
   * Nothing extends `never`, `unknown` extends nothing.
   */
  Test.ExpectNot<$<$<Conditional.Extends, never>, string | number | boolean | symbol | object | unknown[]>>,
  Test.ExpectNot<$<$<Conditional.Extends, never>, unknown>>,
  Test.ExpectNot<$<$<Conditional.Extends, string | number | boolean | symbol | object | unknown[]>, unknown>>,

  /**
   * Deeply extends nested lists
   */
  Test.Expect<$<$<Conditional.Extends, [1, [2, [3, [4]]]]>, [1, [2, [3, [4]]]]>>,

  /**
   * Deeply extends nested objects
   */
  Test.Expect<$<$<Conditional.Extends, { a: 1, b: 2, c: { d: 3, e: { f: 4, g: [5, 6, 7], h: 8 | 9 | 10 } } }>, { a: 1, b: 2, c: { d: 3, e: { f: 4, g: [5, 6, 7], h: 8 | 9 | 10 } } }>>,
  
  /** 
   * Extends empty lists and objects
   */
  Test.Expect<$<$<Conditional.Extends, []>, []>>,
  Test.Expect<$<$<Conditional.Extends, [[]]>, [[]]>>,
  Test.Expect<$<$<Conditional.Extends, {}>, {}>>,
  Test.Expect<$<$<Conditional.Extends, {}>, object>>,
  Test.Expect<$<$<Conditional.Extends, {}>, Record<PropertyKey, unknown>>>,
  Test.Expect<$<$<Conditional.Extends, [{}]>, [{}]>>,
];
