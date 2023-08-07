/**
 * Can we infer the most specific type of a value in a reified type?
 */

import { Kind, Function, String, List } from '..';

declare const append: Kind._$reify<String.Append>;
declare const map: Kind._$reify<List.Map>;
declare const identity: Kind._$reify<Function.Identity>;

function expectType<T>(x: T): void {}

identity('foo');

expectType<'foo'>(identity('foo'));

expectType<['foo', 'bar']>(identity(['foo', 'bar']));

expectType<[['foo']]>(identity([['foo']]));

const appendBar = map(append('bar'))(['foo', 'baz']);
//    ^?

expectType<['foobar', 'bazbar']>(appendBar);

const result = identity(['foo', { x: ['x'] }, 'bar', ['foo']]);
//    ^?

expectType<['foo', { x: ['x'] }, 'bar', ['foo']]>(result);
