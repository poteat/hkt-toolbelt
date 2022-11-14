import { Kind } from "..";

export type _$isString<S extends unknown> = S extends string ? true : false;

export abstract class IsString extends Kind.Kind {
  abstract f: (x: this[Kind._]) => _$isString<typeof x>;
}
