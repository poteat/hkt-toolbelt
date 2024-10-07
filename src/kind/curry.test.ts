import { Test, $N, Kind, Function, List } from '..'

type Curry_Spec = [
  Test.Expect<
    $N<Kind.Curry, [2, Function.Identity, 'foo', 'bar']>,
    ['foo', 'bar']
  >
]

it('should curry a function', () => {
  const myFcn = Kind.curry(2)(List.same)

  expect(myFcn('foo')('bar')).toBe(false)
  expect(myFcn('foo')('foo')).toBe(true)
})
