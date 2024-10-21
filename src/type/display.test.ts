import { $, Test, Type } from '..'

/**
 * Tests associated with `Type.Display`, which forces the compiler to resolve
 * types such that IDEs can display them.
 */
type Display_Spec = [
  /**
   * Acts as an identity function.
   */
  Test.Expect<$<Type.Display, 'foo'>, 'foo'>
]

it('should return the value unchanged', () => {
  expect(Type.display('foo')).toBe('foo')
})
