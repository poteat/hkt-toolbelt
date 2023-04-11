import { $, Parser2, Kind, String, Type } from ".."

export type _$run<P extends Parser2.Parser, X extends string> = $<
  P,
  Type._$cast<
    { input: String._$toList<X>; index: ["0"]; result: never },
    Kind._$inputOf<P>
  >
>["result"]

interface Run_T<P extends Parser2.Parser> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$run<P, typeof x>
}

export interface Run extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser2.Parser>): Run_T<typeof x>
}
