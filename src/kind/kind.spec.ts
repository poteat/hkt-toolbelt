import { Kind, Type, Test, $ } from '..'

// Define a custom kind similar to src/string/to-upper.ts
export type _$toUpper<S extends string> = Uppercase<S>

export interface CustomToUpper extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$toUpper<typeof x>
}

// Define tests
type Kind_Spec = [
  // Test if CustomToUpper works as expected
  Test.Expect<$<CustomToUpper, 'foo'>, 'FOO'>,
  Test.Expect<$<CustomToUpper, 'bar'>, 'BAR'>
]
