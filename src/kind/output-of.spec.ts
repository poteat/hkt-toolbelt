import { $, Kind, String, Test } from '..'

type AppendFoo = $<String.Append, 'foo'>
type AppendBar = $<String.Append, 'bar'>

type OutputOf_Spec = [
  // Test for String.Append with 'foo'
  Test.Expect<$<Kind.OutputOf, AppendFoo>, string | `${string}foo`>,

  // Test for String.Append with 'bar'
  Test.Expect<$<Kind.OutputOf, AppendBar>, string | `${string}bar`>,

  // Test for String.Append with empty string
  Test.Expect<$<Kind.OutputOf, $<String.Append, ''>>, string>,
]
