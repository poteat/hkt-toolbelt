import { Type, Kind } from '..'

/**
 * `_$reverse2` is an internal utility that reverses a tuple.
 * 
 * @template T - The tuple to reverse.
 * @template O - The reversed tuple.
 */
type _$reverse2<T extends unknown[], O extends unknown[] = []> = T extends [
  ...infer Init,
  infer Last
]
  ? Init extends []
    ? [...O, Last]
    : _$reverse2<Init, [...O, Last]>
  : T extends [infer Head, ...unknown[]]
  ? Head
  : [...O, ...T]

/**
 * `_$reverse` is a type-level function that reverses a tuple.
 * 
 * @template T - The tuple to reverse.
 * @template O - The reversed tuple.
 * 
 * @example
 * type T0 = _$reverse<[1, 2, 3]> // [3, 2, 1]
 */
export type _$reverse<
  T extends unknown[],
  O extends unknown[] = []
> = T extends [infer Head, ...infer Tail]
  ? _$reverse<Tail, [Head, ...O]>
  : T extends []
  ? O
  : [..._$reverse2<T>, ...O]

/**
 * `Reverse` is a type-level function that reverses a tuple.
 * 
 * @template T - The tuple to reverse.
 * 
 * @example
 * type T0 = $<Reverse, [1, 2, 3]> // [3, 2, 1]
 */
export interface Reverse extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$reverse<typeof x>
}
