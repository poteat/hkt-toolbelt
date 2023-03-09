import { Test, $N, Kind, Function } from ".."

type Curry_Spec = [
  Test.Expect<
    $N<Kind.Curry, [2, Function.Identity, "foo", "bar"]>,
    ["foo", "bar"]
  >
]
