import Cast from "./Cast";
import Kind from "./Kind";
import $ from "./$";

export declare namespace Combinator {
  export abstract class Self extends Kind {
    abstract f: (x: this[Kind._]) => Self;
  }

  export abstract class ApplySelf extends Kind {
    abstract f: (
      x: Cast<this[Kind._], Kind>
    ) => $<typeof x, Cast<typeof x, Kind.InputOf<typeof x>>>;
  }
}
