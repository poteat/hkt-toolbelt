import { $, Test, Object } from '..'

type Entries_Spec = [
  Test.Expect<
    $<Object.Entries, { foo: 'bar'; baz: 42 }>[number],
    ['foo', 'bar'] | ['baz', 42]
  >,

  Test.Expect<$<Object.Entries, {}>, []>
]
