import { $, Function, Kind, List, String, Test } from '..'

declare const map: $<Kind.Reify, List.Map>
declare const append: $<Kind.Reify, String.Append>
declare const join: $<Kind.Reify, String.Join>
declare const pipe: $<Kind.Reify, Kind.Pipe>

const f = pipe([map(append('!')), join(' ')])

const x = f(['hello', 'world']) // 'hello! world!'

type Reify_Spec = [
  /**
   * The return type of a reified type is unknown.
   */
  Test.Expect<ReturnType<$<Kind.Reify, Function.Identity>>, unknown>,

  /**
   * Can reify a type-level function with correct type inference.
   */
  Test.Expect<typeof x, 'hello! world!'>
]
