import * as $ from "./$";
export { $, $$ } from "./$";

import * as Boolean from "./boolean";
export * as Boolean from "./boolean";

import * as Combinator from "./combinator";
export * as Combinator from "./combinator";

import * as Conditional from "./conditional";
export * as Conditional from "./conditional";

import * as Function from "./function";
export * as Function from "./function";

import * as Kind from "./kind";
export * as Kind from "./kind";

import * as List from "./list";
export * as List from "./list";

import * as Object from "./object";
export * as Object from "./object";

import * as String from "./string";
export * as String from "./string";

import * as Test from "./test";
export * as Test from "./test";

import * as Type from "./type";
export * as Type from "./type";

import * as Union from "./union";
export * as Union from "./union";

export default {
  ...$,
  ...Boolean,
  ...Combinator,
  ...Conditional,
  ...Function,
  ...Kind,
  ...List,
  ...Object,
  ...String,
  ...Test,
  ...Type,
  ...Union,
};
