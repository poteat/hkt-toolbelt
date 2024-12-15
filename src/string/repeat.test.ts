import { $, String, Test } from '..'

type Repeat_Spec = [
  // Type-Level Tests
  Test.Expect<$<$<String.Repeat, 'abc'>, 0>, ''>,
  Test.Expect<$<$<String.Repeat, 'abc'>, 1>, 'abc'>,
  Test.Expect<$<$<String.Repeat, 'abc'>, 2>, 'abcabc'>,
  Test.Expect<$<$<String.Repeat, 'x'>, 5>, 'xxxxx'>,
  Test.Expect<$<$<String.Repeat, ''>, 5>, ''>,

  // Non-naturals
  Test.Expect<$<$<String.Repeat, 'abc'>, -1>, never>,
  Test.Expect<$<$<String.Repeat, 'abc'>, 1.5>, never>,
  Test.Expect<$<$<String.Repeat, 'abc'>, -0.1>, never>
]

describe('String.repeat', () => {
  test('repeat "abc" 3 times', () => {
    const result = String.repeat('abc')(3)
    expect(result).toBe('abcabcabc')
  })

  test('repeat "x" 0 times', () => {
    const result = String.repeat('x')(0)
    expect(result).toBe('')
  })

  test('repeat with negative number returns never (undefined at runtime)', () => {
    const result = String.repeat('abc')(-1 as any)
    expect(result).toBeUndefined()
  })
})
