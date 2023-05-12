import { Type, Object, Kind } from '..'

export type _$fromEntries<
  T extends [string, unknown][],
  O extends Record<string, unknown> = {}
> = T extends [infer First, ...infer Rest]
  ? First extends [string, unknown]
    ? _$fromEntries<
        Type._$cast<Rest, [string, unknown][]>,
        Object._$merge<
          O,
          {
            [key in First[0]]: First[1]
          }
        >
      >
    : never
  : O

export interface FromEntries extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], [string, unknown][]>): _$fromEntries<typeof x>
}
