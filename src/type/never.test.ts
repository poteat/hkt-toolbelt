import { Type, Test } from '..'

type Never_Spec = [
  /**
   * Never is the type of the never type.
   */
  Test.Expect<Type.Never, never>
]

it('should return the never type', () => {
  expect(Type.never).toBe(undefined)
})
