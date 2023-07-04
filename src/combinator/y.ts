import { $, Type, Kind } from '..'

type _$<F, X> = $<
  Type._$cast<F, Kind.Kind>,
  Type._$cast<X, Kind._$inputOf<Type._$cast<F, Kind.Kind>>>
>

/**
 * Given a recursive kind `F`, `ApplyToY` applies `Y` to `F`. Prevents immediate
 * infinite recursion in applicative order languages like type-level TypeScript.
 */
interface _$applyToY<F extends Kind.Kind> extends Kind.Kind {
  // @ts-ignore
  f(x: this[Kind._]): _$<$<Y, F>, typeof x>
}

export interface Y extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): _$<typeof x, _$applyToY<typeof x>>
}
