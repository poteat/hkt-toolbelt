import { Kind, Function, String, List, Test } from '..'

declare const append: Kind._$reify<String.Append>
declare const map: Kind._$reify<List.Map>
declare const identity: Kind._$reify<Function.Identity>

function expectType<T>(x: T): void {}

identity('foo')

expectType<'foo'>(identity('foo'))

const result1 = identity(['foo', 'bar'])

const result2 = identity([['foo']])

type Infer_Spec = [
  Test.Expect<typeof result1, ['foo', 'bar']>,
  Test.Expect<typeof result2, [['foo']]>
]

const appendBar = map(append('bar'))(['foo', 'baz'])
//    ^?

expectType<['foobar', 'bazbar']>(appendBar)

const result = identity(['foo', { x: ['x'] }, 'bar', ['foo']])
//    ^?

expectType<['foo', { x: ['x'] }, 'bar', ['foo']]>(result)
