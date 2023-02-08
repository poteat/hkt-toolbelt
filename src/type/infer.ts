import { Kind, Type, Function } from "hkt-toolbelt";

type _$inferred =
  | string
  | number
  | boolean
  | undefined
  | null
  | Function.Function
  | Kind.Kind
  | _$inferredTuple
  | {
      [key: string]: _$inferred;
    };

type _$inferredTuple = _$inferred[] | ReadonlyArray<_$inferred>;

export type _$infer<
  X,
  Narrow = Type._$cast<X, _$inferred> | [...Type._$cast<X, _$inferredTuple>]
> = Narrow extends unknown[] ? { [key in keyof X]: _$infer<X[key]> } : Narrow;

export interface Infer extends Kind.Kind {
  f(x: this[Kind._]): _$infer<typeof x>;
}
