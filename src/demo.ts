import { map } from './list'
import { capitalize, length } from './string'
import { pipe } from './kind'
import { identity } from './function'

const result = map(pipe([capitalize, length, identity]))(['foo', 'bar', 'baz'])
