export * as NaturalNumber from './natural-number'
export * as String from './string'

import * as NaturalNumber from './natural-number'
import * as String from './string'

const _ = {
  NaturalNumber: NaturalNumber,
  String: String
}

type _ = typeof _

export default _
