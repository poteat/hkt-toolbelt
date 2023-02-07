import { $, Test, Object, Kind } from "..";

type DeepInputOf_Spec = [
  /**
   * Can represent the recursive object input of a function.
   */
  Test.Expect<
    $<$<Object.DeepInputOf, Kind.Kind<(x: number) => string>>, 42>,
    | number
    | {
        [key: string]: Object._$deepInputOf<Kind.Kind<(x: number) => string>>;
      }
  >
];
