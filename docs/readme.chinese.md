<h1 align="center">
  [HK-Types Toolbelt]
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/hkt-toolbelt">
    <img src=https://img.shields.io/npm/v/hkt-toolbelt?color=green>
  </a>
  <img src=https://img.shields.io/github/workflow/status/poteat/hkt-toolbelt/build>
  <img src=https://img.shields.io/github/repo-size/poteat/hkt-toolbelt>
  <br>
  <img src=https://img.shields.io/npm/dw/hkt-toolbelt>
  <img src=https://img.shields.io/github/license/poteat/hkt-toolbelt>
  <a href="https://code.lol">
    <img src=https://img.shields.io/badge/blog-code.lol-blue>
  </a>
</p>

<p align="center">
  <i>埋新危性線子勢保洋闘特分会作途。</i>
</p>

---

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。改発処街独化解強県間購混連顧染意落。芸暮顔間際紙能王継賠規学。受連撃先品利月及表濃和兆針中集。初奪望題両簡属国就作英響特一逃。砂宇壌不無流明面部国時条。揚本属福気化結潔試能訴知専歌介馬。

本州勝大村似提権衛東景頭東者像人平手社。覧掲港宿欲揺一白和祭江毎住略護海意贈。掲手合園罪優須検達夜囲表。

## 1.1. Installation

```bash
> npm install hkt-toolbelt
```

## 1.2. Usage

```ts
import $, { List, Conditional } from "hkt-toolbelt";

// A kind that filters to find numbers.
type FilterNumbers = List.Filter<Conditional.SubtypeOf<number>>;

type Result = $<FilterNumbers, [1, "foo", 2, 3, "bar"]>; // [1, 2, 3]
```

### 1.2.1. Subpath Imports

埋新危性線子勢保洋闘特分会作途。

```ts
import $ from "hkt-toolbelt";
import { Filter } from "hkt-toolbelt/list";
import { SubtypeOf } from "hkt-toolbelt/conditional";

type Result = $<Filter<SubtypeOf<number>>, [1, "foo", 2, 3, "bar"]>; // [1, 2, 3]
```

## 1.3 What is a HKT?

> **> 埋新危性線子勢保洋闘特分会作途。"**

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。改発処街独化解強県間購混連顧染意落。芸暮顔間際紙能王継賠規学。受連撃先品利月及表濃和兆針中集。初奪望題両簡属国就作英響特一逃。砂宇壌不無流明面部国時条。揚本属福気化結潔試能訴知専歌介馬。

本州勝大村似提権衛東景頭東者像人平手社。覧掲港宿欲揺一白和祭江毎住略護海意贈。掲手合園罪優須検達夜囲表。聞十絶稿県提画残理画野幸去年朝能今。理導気販雨真最属引文国合細注稲。予注提雪属紛速合天異神年局要代劇。著彰情也悪可氷由碁置市偏進安世場細。減差最載益稿増訴間導提序旅。段梁続士収覧介死分田制的。

## 1.4. Table of Contents

- [[HK-Types Toolbelt]](#higher-kinded-type-toolbelt)
  - [1.1. Installation](#11-installation)
  - [1.2. Usage](#12-usage)
    - [1.2.1. Subpath Imports](#121-subpath-imports)
  - [1.3. What is a HKT?](#13-what-is-a-hkt)
  - [1.4. Table of Contents](#14-table-of-contents)
- [2. API](#2-api)
  - [2.1. Basic Utilities](#21-basic-utilities)
    - [2.1.1. $<F, X>](#211-f-x)
    - [2.1.2. $$<FX, X>](#212-fx-x)
    - [2.1.3. Cast<A, B>](#213-casta-b)
  - [2.2. Boolean Types](#22-boolean-types)
    - [2.2.1. Boolean.And\<X>](#221-booleanandx)
    - [2.2.2. Boolean.Or\<X>](#222-booleanorx)
    - [2.2.3. Boolean.Not](#223-booleannot)
  - [2.3. Combinator Types](#23-combinator-types)
    - [2.3.1. Combinator.Self](#231-combinatorself)
    - [2.3.2. Combinator.ApplySelf](#232-combinatorapplyself)
  - [2.4. Conditional Types](#24-conditional-types)
    - [2.4.1. Conditional.Equals\<A>](#241-conditionalequalsa)
    - [2.4.2. Conditional.SubtypeOf\<A>](#242-conditionalsubtypeofa)
  - [2.5. Function Types](#25-function-types)
    - [2.5.1. Function](#251-function)
    - [2.5.2. Function.Constant\<A>](#252-functionconstanta)
    - [2.5.3. Function.Identity](#253-functionidentity)
  - [2.6. Kind Types](#26-kind-types)
    - [2.6.1. Kind\<F>](#261-kindf)
    - [2.6.2. Kind.Composable\<FX>](#262-kindcomposablefx)
    - [2.6.3. Kind.Compose\<FX>](#263-kindcomposefx)
    - [2.6.4. Kind.Pipe\<FX>](#264-kindpipefx)
    - [2.6.5. Kind.\_](#265-kind_)
  - [2.7. List Types](#27-list-types)
    - [2.7.1. List.Map\<F>](#271-listmapf)
    - [2.7.2. List.Find\<F>](#272-listfindf)
    - [2.7.3. List.Filter\<F>](#273-listfilterf)
    - [2.7.4. List.Append\<F>](#274-listappendf)
    - [2.7.5. List.First\<T>](#275-listfirstt)
    - [2.7.6. List.Last\<T>](#276-listlastt)
    - [2.7.7. List.Pair\<T>](#277-listpairt)
    - [2.7.8. List.Every\<T>](#278-listeveryt)
    - [2.7.9. List.Some\<T>](#279-listsomet)
    - [2.7.10. List.Reverse\<T>](#2710-listreverset)
  - [2.8. String Types](#28-string-types)
    - [2.8.1. String.StartsWith\<S>](#281-stringstartswiths)
    - [2.8.2. String.EndsWith\<S>](#282-stringendswiths)
    - [2.8.3. String.Includes\<S>](#283-stringincludess)
    - [2.8.4. String.Append\<S>](#284-stringappends)
    - [2.8.5. String.Prepend\<S>](#285-stringprepends)

# 2. API

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。改発処街独化解強県間購混連顧染意落。芸暮顔間際紙能王継賠規学。受連撃先品利月及表濃和兆針中集。初奪望題両簡属国就作英響特一逃。砂宇壌不無流明面部国時条。揚本属福気化結潔試能訴知専歌介馬。

本州勝大村似提権衛東景頭東者像人平手社。覧掲港宿欲揺一白和祭江毎住略護海意贈。掲手合園罪優須検達夜囲表。聞十絶稿県提画残理画野幸去年朝能今。理導気販雨真最属引文国合細注稲。予注提雪属紛速合天異神年局要代劇。著彰情也悪可氷由碁置市偏進安世場細。減差最載益稿増訴間導提序旅。段梁続士収覧介死分田制的。

## 2.1. Basic Utilities

### 2.1.1. $<F, X>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Append<" world">, "hello">; // "hello world"
```

### 2.1.2. $$<FX, X>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

@see `$`
@see `Kind.Compose`

```ts
import { $$, Kind, String } from "hkt-toolbelt";

type Result = $$<
  Kind.Compose<String.Append<" world">, String.Append<"!">>,
  "hello"
>; // "hello world!"
```

### 2.1.3. Cast<A, B>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import { Cast } from "hkt-toolbelt";

type Result = Cast<"hello", string>; // "hello"
```

## 2.2. Boolean Types

### 2.2.1. Boolean.And\<X>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { Boolean } from "hkt-toolbelt";

type Result = $<Boolean.And<true>, false>; // false
```

### 2.2.2. Boolean.Or\<X>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { Boolean } from "hkt-toolbelt";

type Result = $<Boolean.Or<true>, false>; // true
```

### 2.2.3. Boolean.Not

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { Boolean } from "hkt-toolbelt";

type Result = $<Boolean.Not, true>; // false
```

## 2.3. Combinator Types

### 2.3.1. Combinator.Self

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { Combinator } from "hkt-toolbelt";

type Result = $<$<Combinator.Self, "foo">, "foo">; // Combinator.Self
```

### 2.3.2. Combinator.ApplySelf

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { Combinator } from "hkt-toolbelt";

type Result = $<Combinator.ApplySelf, Function.Identity>; // Function.Identity
```

## 2.4. Conditional Types

### 2.4.1. Conditional.Equals\<A>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { Conditional } from "hkt-toolbelt";

type Result = $<Conditional.Equals<"foo">, "bar">; // false
```

### 2.4.2. Conditional.SubtypeOf\<A>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { Conditional } from "hkt-toolbelt";

type Result = $<Conditional.SubtypeOf<string>, "bar">; // true
```

## 2.5. Function Types

### 2.5.1. Function

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

### 2.5.2. Function.Constant\<A>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { Function } from "hkt-toolbelt";

type Result = $<Function.Constant<"foo">, number>; // "foo"
```

### 2.5.3. Function.Identity

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { Function } from "hkt-toolbelt";

type Result = $<Function.Identity, "foo">; // "foo"
```

## 2.6. Kind Types

### 2.6.1. Kind\<F>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

### 2.6.2. Kind.Composable\<FX>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { Kind, String } from "hkt-toolbelt";

type Result = $<Kind.Composable, [String.Append<"bar">, String.Append<"foo">]>; // true
```

### 2.6.3. Kind.Compose\<FX>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { Kind, String } from "hkt-toolbelt";

type Result = $<Kind.Compose<[String.Append<"bar">, String.Append<"foo">]>, "">; // "foobar"
```

### 2.6.4. Kind.Pipe\<FX>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { Kind, String } from "hkt-toolbelt";

type Result = $<Kind.Pipe<[String.Append<"foo">, String.Append<"bar">]>, "">; // "foobar"
```

### 2.6.5. Kind.\_

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

## 2.7. List Types

### 2.7.1. List.Map\<F>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { List, String } from "hkt-toolbelt";

type Result = $<List.Map<String.Append<"bar">>, ["foo", "baz"]>; // ["foobar", "bazbar"]
```

### 2.7.2. List.Find\<F>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { List, String } from "hkt-toolbelt";

type Result = $<List.Find<String.StartsWith<"foo">>, ["bar", "foobar"]>; // "foobar"
```

### 2.7.3. List.Filter\<F>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { List, String } from "hkt-toolbelt";

type Result = $<List.Filter<String.StartsWith<"foo">>, ["bar", "foobar"]>; // ["foobar"]
```

### 2.7.4. List.Append\<F>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { List } from "hkt-toolbelt";

type Result = $<List.Append<"bar">, ["foo", "baz"]>; // ["foo", "baz", "bar"]
```

### 2.7.5. List.First\<T>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { List } from "hkt-toolbelt";

type Result = $<List.First, ["foo", "bar"]>; // "foo"
```

### 2.7.6. List.Last\<T>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { List } from "hkt-toolbelt";

type Result = $<List.Last, ["foo", "bar", "baz"]>; // "baz"
```

### 2.7.7. List.Pair\<T>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { List } from "hkt-toolbelt";

type Result = $<List.Pair, [1, 2, 3]>; // [[1, 2], [2, 3]]
```

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

### 2.7.8. List.Every\<T>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { List, Conditional } from "hkt-toolbelt";

type Result = $<List.Every<Conditional.SubtypeOf<number>>, [1, 2, 3]>; // true
```

### 2.7.9. List.Some\<T>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { List, Conditional } from "hkt-toolbelt";

type Result = $<List.Some<Conditional.SubtypeOf<string>>, [1, 2, 3]>; // false
```

### 2.7.10. List.Reverse\<T>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { List } from "hkt-toolbelt";

type Result = $<List.Reverse, [1, 2, 3]>; // [3, 2, 1]
```

### 2.7.11. List.IsVariadic

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import { List } from "hkt-toolbelt";

type Result = List.IsVariadic<[1, 2, 3]>; // false
```

## 2.8. String Types

### 2.8.1. String.StartsWith\<S>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.StartsWith<"foo">, "foobar">; // true
```

### 2.8.2. String.EndsWith\<S>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.EndsWith<"bar">, "foobar">; // true
```

### 2.8.3. String.Includes\<S>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

@see `String.StartsWith`

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Includes<"foo">, "barfoobar">; // true
```

### 2.8.4. String.Append\<S>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Append<"bar">, "foo">; // "foobar"
```

### 2.8.5. String.Prepend\<S>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Prepend<"foo">, "bar">; // "foobar"
```

### 2.8.6. String.IsTemplate

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.IsTemplate, `foo${string}`>; // true
```

### 2.8.7. String.Join\<S>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Join<" ">, ["foo", "bar", "baz"]>; // "foo bar baz"
```

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

### 2.8.8. String.Split\<S>

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Split<" ">, "foo bar baz">; // ["foo", "bar", "baz"]
```

埋新危性線子勢保洋闘特分会作途。計危台政酸認星仕書表情田軒。置線望自載区者前送中賞開就属輸。合派込甲裕断作重命人惑板原泰乱化。
