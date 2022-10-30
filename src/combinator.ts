import $, { Cast, Kind } from ".";

export abstract class Self extends Kind {
  abstract f: (x: this[Kind._]) => Self;
}

declare abstract class RecursiveKind extends Kind {
  abstract f: (x: Cast<this[Kind._], RecursiveKind>) => unknown;
}

export abstract class ApplySelf extends Kind {
  abstract f: (
    x: Cast<this[Kind._], RecursiveKind>
  ) => $<typeof x, Cast<typeof x, Kind.InputOf<typeof x>>>;
}

export * as Combinator from "./combinator";
