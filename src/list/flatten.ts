import { Kind, List, Type } from "..";

/**
 * `_$flatten` is a type-level function that completely flattens a tuple by recursively concatenating all nested elements.
 *
 * @param T The input tuple.
 *
 * @example
 *
 * ```ts
 * import { $, List } from 'hkt-toolbelt';
 *
 * type MyList = [0, [1, [2, [3, [4]]]]]
 *
 * type Result = List._$flatten<MyList> // [0, 1, 2, 3, 4]
 * ```
 *
 */
export type _$flatten<
  T extends unknown[],
  RESULT extends List.List = T extends [infer H, ...infer R]
    ? H extends unknown[]
      ? [..._$flatten<H>, ..._$flatten<R>]
      : [H, ..._$flatten<R>]
    : []
> = RESULT;

/**
 * `Flatten` is a type-level function that completely flattens a tuple by recursively concatenating all nested elements.
 *
 * @param T The input tuple.
 *
 * @example
 *
 * ```ts
 * import { $, List } from 'hkt-toolbelt';
 *
 * type MyList = [0, [1, [2, [3, [4]]]]]
 *
 * type Result = $<List.Flatten, MyList> // [0, 1, 2, 3, 4]
 * ```
 *
 */
export interface Flatten extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$flatten<typeof x>;
}
