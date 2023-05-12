import * as $ from './$'
export { $, $$, $N } from './$'

import * as Boolean from './boolean'
export * as Boolean from './boolean'

import * as Combinator from './combinator'
export * as Combinator from './combinator'

import * as Conditional from './conditional'
export * as Conditional from './conditional'

import * as DecimalDigitList from './decimal-digit-list'
export * as DecimalDigitList from './decimal-digit-list'

import * as DigitList from './digit-list'
export * as DigitList from './digit-list'

import * as Digit from './digit'
export * as Digit from './digit'

import * as Function from './function'
export * as Function from './function'

import * as Kind from './kind'
export * as Kind from './kind'

import * as List from './list'
export * as List from './list'

import * as NaturalNumberTheory from './natural-number-theory'
export * as NaturalNumberTheory from './natural-number-theory'

import * as NaturalNumber from './natural-number'
export * as NaturalNumber from './natural-number'

import * as Number from './number'
export * as Number from './number'

import * as Object from './object'
export * as Object from './object'

import * as Parser from './parser'
export * as Parser from './parser'

import * as Stress from './stress'
export * as Stress from './stress'

import * as String from './string'
export * as String from './string'

import * as Test from './test'
export * as Test from './test'

import * as Type from './type'
export * as Type from './type'

import * as Union from './union'
export * as Union from './union'

const _ = {
  ...$,
  Boolean,
  Combinator,
  Conditional,
  DigitList,
  Digit,
  Function,
  Kind,
  List,
  NaturalNumberTheory,
  NaturalNumber,
  Number,
  Object,
  Parser,
  Stress,
  String,
  Test,
  Type,
  Union
}

type _ = typeof _

export default _
