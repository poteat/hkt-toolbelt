import { $, Kind, Type } from '..';

export type _$reify<K extends Kind.Kind> = K & {
  <X extends Kind._$inputOf<K>>(
    x: Type._$infer<X>
  ): $<K, X> extends Kind.Kind ? _$reify<$<K, X>> : $<K, X>;
};

export interface Reify extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): _$reify<typeof x>;
}
