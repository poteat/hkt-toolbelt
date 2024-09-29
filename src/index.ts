export { $, $$, $N } from './$'
export * as Boolean from './boolean'
export * as Combinator from './combinator'
export * as Conditional from './conditional'
export * as Digit from './digit'
export * as DigitList from './digit-list'
export * as Function from './function'
export * as Integer from './integer'
export * as Kind from './kind'
export * as List from './list'
export * as Loop from './loop'
export * as Matrix from './matrix'
export * as NaturalNumber from './natural-number'
export * as NaturalNumberTheory from './natural-number-theory'
export * as Number from './number'
export * as Object from './object'
export * as Parser from './parser'
export * as Stress from './stress'
export * as String from './string'
export * as Test from './test'
export * as Type from './type'
export * as Union from './union'

import * as $ from './$'
import * as Boolean from './boolean'
import * as Combinator from './combinator'
import * as Conditional from './conditional'
import * as Digit from './digit'
import * as DigitList from './digit-list'
import * as Function from './function'
import * as Integer from './integer'
import * as Kind from './kind'
import * as List from './list'
import * as Loop from './loop'
import * as Matrix from './matrix'
import * as NaturalNumber from './natural-number'
import * as NaturalNumberTheory from './natural-number-theory'
import * as Number from './number'
import * as Object_ from './object'
import * as Parser from './parser'
import * as Stress from './stress'
import * as String from './string'
import * as Test from './test'
import * as Type from './type'
import * as Union from './union'

const _ = {
  ...$,
  Boolean,
  Combinator,
  Conditional,
  DigitList,
  Digit,
  Function,
  Integer,
  Kind,
  List,
  Loop,
  Matrix,
  NaturalNumberTheory,
  NaturalNumber,
  Number,
  Object: Object_,
  Parser,
  Stress,
  String,
  Test,
  Type,
  Union
}

type _ = typeof _

export default _
