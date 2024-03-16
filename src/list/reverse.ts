import { Type, Kind } from '..'

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

export type _$reverse<
  T extends unknown[],
  O extends unknown[] = []
> = T extends [infer Head, ...infer Tail]
  ? _$reverse<Tail, [Head, ...O]>
  : T extends []
    ? O
    : [..._$reverse2<T>, ...O]

export interface Reverse extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$reverse<typeof x>
}
