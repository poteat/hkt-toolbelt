<h1 align="center">
  [HK-Types Toolbelt]
</h1>

<p align= "center">
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

<p align="center" >
  <i>ts-toolbelt的高阶类型版本</i>
</p>

---

此库旨在提供适用于不同领域的辅助类（type）,这些类可以通过高阶类型(higher-kinded types)以函数的形式加以映射和组合。

利用此库对类谱写的支持和编译时的高效，您可以更好的编写可靠且类安全的程序。

我们意在实现对数百种高阶种类（kind categories）的支持，例如 **List**， **Boolean**， **String**， **Function** 等等。除此之外，我们还内置了帮助类谱写的组合类函数（combinators）。

## 1.1. 安装

```bash
> npm install hkt-toolbelt
```

## 1.2. 用法

简而言之，**`hkt-toolbelt`** 可以将以下代码：

```ts
/**
 * 去掉元组中的非数元素
 */
type FilterNum<T extends unknown[]> = T extends [Head, ...Tail]
  ? Head extends number
    ? [Head, ...FilterNum<Tail>]
    : FilterNum<Tail>
  : [];
```

简化成这样：

```ts
import { $, List, Conditional } from "hkt-toolbelt";

type FilterNum = List.Filter<Conditional.Extends<number>>;
```

您可以通过编谱 **`hkt-toolbelt`** 的高阶原始类让自己编写的复杂类更可读。

### 1.2.1 用$引用高阶类（kind）

您可以通过 `$` 运算符来使用您的高阶类:

```ts
type Result = $<FilterNum, [1, "x", 2, "y", 3]>; // [1, 2, 3]
```

### 1.2.2. 子路径导入

导入也可以以子路径的形式实现。

```ts
import { $ } from `hkt-toolbelt`;
import { Filter } from `hkt-toolbelt/list`;
import { Extends } from `hkt-toolbelt/conditional`;
```

## 1.3 HKT是什么?

> **> HKT 是 higher-kinded type 简称**

Typescript 有两种 _不同_ 的类型结构: “类”和“泛型”。

- **type(类)**: 编译时用来描述值的表达式。
- **generic(泛型)**: 类似模板的形式参数类，可以通过提供一个或多个实际参数实例化，并解析出类（type）。

泛型在 Typescript 中并非一类对象（first-class citizen）——除非已经提供全部所需的实际参数类，否则它们不可以被直接引用；泛型不能作为参数提供给其他泛型，也不能被返还——这些都是由语言本身的局限导致。

** `hkt-toolbelt` 额外引入两个类型结构:**

- **kind(高阶类)**: 编译时用来描述类（type）的表达式；参数化设计，因而可以应用到实际参数中。
- **generic kind(高阶泛型)**: 能够返还高阶类的泛型。

而高阶类（kind）对类(type)的使用，我们通过泛型`$<kind, type>`来实现。

利用高阶类，我们可以写出仅凭泛型无法实现的新类型，譬如对泛用函数的紧缩编写。

即便某个类可以通过泛型表达，我们也可以利用高阶类实现更美观、易用的接口。

> **关于术语的使用**
> 高阶类的英文，严格来说仅使用 **_kind_** 并不正确，不过“higher-kinded type”有点长，所以用 **'kind'** 简略表达.
>
> 有时候我们也会用“hk-type”来表达，这样其实更合适。

## 1.4. 目录

- [[HK-Types Toolbelt]](#higher-kinded-type-toolbelt)
  - [1.1. 安装](#11-安装)
  - [1.2. 用法](#12-用法)
    - [1.2.1. 用$引用高阶类（kind）](#121-用$引用高阶类（kind）)
    - [1.2.2. 子路径导入](#122-子路径导入)
  - [1.3. HKT是什么?](#13-hkt是什么)
  - [1.4. 目录](#14-目录)
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
    - [2.4.2. Conditional.Extends\<A>](#242-conditionalExtendsa)
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

柯里化函数下，这个仓库旨在用于使用 `point-free 编程风格` 来组合类型。在这方面，API 类型将首先接收 `执行的操作(一系列函数)` ，然后接收要操作的数据。

> 先将会执行哪几个函数串起来，最后参数变量，连串贯通的意思。

所有函数类 每次接受 _一个_ 参数，以支持 `柯里化函数` 和 `point-free 风格` 。

> `point-free 风格` 解释: 基本上是你写代码但不显式地在代码中提供参数, 简单来说，就是省略函数的参数。

这非常有用，特别是在需要函数的回调中, 让代码更易读。

## 2.1. Basic Utilities

### 2.1.1. $<F, X>

`$` 操作符用于对定义类型更高类型的函数。  
它相当于 TypeScript 中的 `F<A>` 语法。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.Append<` world`>, `hello`>; // `hello world`
```

### 2.1.2. $$<FX, X>

`$$` 操作用于将已经定义的类型作为输入，放进一系列的类型管道上，应用并计算。这是 `$` 和 `Kind. Compose` 的语法糖。

@see `$` @see `Kind.Compose`

```ts
import { $$, Kind, String } from `hkt-toolbelt`;

type Result = $$<
  Kind.Compose<String.Append<` world`>, String.Append<`!`>>,
  `hello`
>; // `hello world!`
```

### 2.1.3. Cast<A, B>

`Cast` 类型用于将一个类型转换为另一个类型。它相当于 TypeScript 中的 `A as B` 语法，用于对代码一些轻微修正情况下。

```ts
import { Cast } from `hkt-toolbelt`;

type Result = Cast<`hello`, string>; // `hello`
```

## 2.2. Boolean Types

### 2.2.1. Boolean. And\<X>

`And` 传入布尔类型并返回一个接受另一个布尔值的函数，然后返回两个布尔值之和为 `&&` 的结果。

```ts
import { $, Boolean } from `hkt-toolbelt`;

type Result = $<Boolean.And<true>, false>; // false
```

### 2.2.2. Boolean. Or\<X>

`Or` 传入一个布尔类型并返回一个接受另一个布尔值的函数，然后返回两个布尔值的结果为 `||` 。

```ts
import { $, Boolean } from `hkt-toolbelt`;

type Result = $<Boolean.Or<true>, false>; // true
```

### 2.2.3. Boolean. Not

`Not` 传入一个布尔类型值并返回相反的布尔值。

```ts
import { $, Boolean } from `hkt-toolbelt`;

type Result = $<Boolean.Not, true>; // false
```

## 2.3. Combinator Types

### 2.3.1. Combinator. Self

`Self` 返回自己。这意味着它可以无限地应用$。

```ts
import { $, Combinator } from `hkt-toolbelt`;

type Result = $<$<Combinator.Self, `foo`>, `foo`>; // Combinator.Self
```

### 2.3.2. Combinator. ApplySelf

`ApplySelf` 传入一个高阶类，并将那个高阶类型应用到它自己。这可用于创建合成递归类型。

```ts
import { $, Combinator } from `hkt-toolbelt`;

type Result = $<Combinator.ApplySelf, Function.Identity>; // Function.Identity
```

## 2.4. Conditional Types

### 2.4.1. Conditional. Equals\<A>

`Equals` 用于检查一个类型是否等于另一个类型。它等价于 `A extends B ?( B extends A ? true: false ) : false` 。

`Equals` 返回一个高阶类型函数包裹着传入一个类型的函数，然后返回布尔值。

```ts
import { $, Conditional } from `hkt-toolbelt`;

type Result = $<Conditional.Equals<`foo`>, `bar`>; // false
```

### 2.4.2. Conditional. Extends\<A>

`Extends` 用于检查一个类型是否是另一个类型的子类型。它等价于 `A extends B ? true : false` .

传入的第一个类型是父类，传入的第二个类型是子类。

`Extends` 传入一个类型并返回布尔值的高阶类型函数。

```ts
import { $, Conditional } from `hkt-toolbelt`;

type Result = $<Conditional.Extends<string>, `bar`>; // true
```

## 2.5. Function Types

### 2.5.1. Function

`Function` 类型是所有函数的超类型，即所有函数都是 `Function` 的子类型。它不是高阶类型，不能直接应用。

### 2.5.2. Function. Constant\<A>

`Constant` 传入一个 `类型` 并返回一个函数，该函数接受任何类型并返回原始类型。它忽略其应用的输入并总是返回配置的类型。

```ts
import { $, Function } from `hkt-toolbelt`;

type Result = $<Function.Constant<`foo`>, number>; // `foo`
```

### 2.5.3. Function. Identity

`Identity` 传入一个 `类型` ，并返回一个对应这个类型的高阶类型。

```ts
import { $, Function } from `hkt-toolbelt`;

type Result = $<Function.Identity, `foo`>; // `foo`
```

## 2.6. Kind Types

### 2.6.1. Kind\<F>

`Kind` 类型表示可以使用 `$` 应用于类型的类型函数。

Kind 作为可选的类型，提供一个高阶函数类型，以添加这个函数类型具体的 `形参` 以及 `返回的类型` ，这用于创建新的类型。

### 2.6.2. Kind. Composable\<FX>

`Composable` 检查一个由各种组成的 `元组是否可组合` 。如果类型 $N$ 的输出是类型 $N-1$ 的输入的子类型，则类型元组是可组合的。

```ts
import { $, Kind, String } from `hkt-toolbelt`;

type Result = $<Kind.Composable, [String.Append<`bar`>, String.Append<`foo`>]>; // true
```

### 2.6.3. Kind. Compose\<FX>

`Compose` 传入一个 `函数类元组` ，并将它们组合成一个函数类。

`Compose` 检查 types 元组是否可组合，并返回一个传入一个类且返回类型和结果的高阶类型。

`Compose` 从右向左执行函数，即元组中最后一个函数先执行——这是数学中的传统。

```ts
import { $, Kind, String } from `hkt-toolbelt`;

type Result = $<Kind.Compose<[String.Append<`bar`>, String.Append<`foo`>]>, ``>; // `foobar`
```

### 2.6.4. Kind. Pipe\<FX>

`Pipe` 传入一个 `函数类元组` ，并将它们输送到一个函数类中。这是从左向右操作的，即首先执行元组中的第一个函数。这是 `组合` 的相反顺序。

`Pipe` 通常对程序员来说更直观，因为它按执行顺序读取。这就是 `$$` 在内部使用的内容。

```ts
import { $, Kind, String } from `hkt-toolbelt`;

type Result = $<Kind.Pipe<[String.Append<`foo`>, String.Append<`bar`>]>, ``>; // `foobar`
```

### 2.6.5. Kind.\_

`_` 类型表示在被调用之前，这个类型是指向 `unique symbol` 类型。

`Kind._` 是由 `$` 来调用。

## 2.7. List Type

### 2.7.1. List. Map\<F>

`Map` 传入一个 `函数类` ，并返回一个接受元组类型的高级类型。它将给定的类型函数应用于元组中的每个元素。

```ts
import { $, List, String } from `hkt-toolbelt`;

type Result = $<List.Map<String.Append<`bar`>>, [`foo`, `baz`]>; // [`foobar`, `bazbar`]
```

### 2.7.2. List. Find\<F>

`Find` 函数先接受一个 `函数类` ，然后接受一个 `元组` ，并返回 finder 函数返回 `true` 的第一个元组元素。如果不存在这样的元素， `Find` 返回 `never` 。

```ts
import { $, List, String } from `hkt-toolbelt`;

type Result = $<List.Find<String.StartsWith<`foo`>>, [`bar`, `foobar`]>; // `foobar`
```

### 2.7.3. List. Filter\<F>

`Filter` 传入一个类型函数和一个元组，并按输入元组的顺序返回一个元组，因此只有 Filter 函数返回 `true` 的元素保留在结果元组中。

```ts
import { $, List, String } from `hkt-toolbelt`;

type Result = $<List.Filter<String.StartsWith<`foo`>>, [`bar`, `foobar`]>; // [`foobar`]
```

### 2.7.4. List. Append\<F>

`Append` 传入一个类型和一个元组，并应用该类型，使其被附加到所提供的元组的末尾。

```ts
import { $, List } from `hkt-toolbelt`;

type Result = $<List.Append<`bar`>, [`foo`, `baz`]>; // [`foo`, `baz`, `bar`]
```

### 2.7.5. List. First\<T>

`First` 传入一个元组，并返回该元组的第一个元素。

```ts
import { $, List } from `hkt-toolbelt`;

type Result = $<List.First, [`foo`, `bar`]>; // `foo`
```

### 2.7.6. List. Last\<T>

`Last` 传入一个 `元组` ，并返回元组的最后一个元素。在具有可变元素的元组的情况下，可变元素被正确处理，即使它是中缀。

```ts
import { $, List } from `hkt-toolbelt`;

type Result = $<List.Last, [`foo`, `bar`, `baz`]>; // `baz`
```

### 2.7.7. List. Pair\<T>

`Pair` 传入一个 `元组` ，并返回元组的元组，其中每个元组是原始元组的一对元素，按顺序排列。如。'[1, 2, 3] '变成'[[1, 2]，[2, 3]]'。

```ts
import { $, List } from `hkt-toolbelt`;

type Result = $<List.Pair, [1, 2, 3]>; // [[1, 2], [2, 3]]
```

对于可变元组，通过引入联合来表示可变对元素的可能组合来处理可变元素。

### 2.7.8. List. Every\<T>

`Every` 接受一个操作函数类和一个元组，如果元组中的每个元素都满足这个操作函数，则返回 `true` ，否则返回 `false` 。

```ts
import { $, List, Conditional } from `hkt-toolbelt`;

type Result = $<List.Every<Conditional.Extends<number>>, [1, 2, 3]>; // true
```

### 2.7.9. List. Some\<T>

` Some` 接受一个操作函数类和一个元组，如果元组中至少有一个元素满足操作函数类，则返回' true '，否则返回 ` ` false` 。

```ts
import { $, List, Conditional } from `hkt-toolbelt`;

type Result = $<List.Some<Conditional.Extends<string>>, [1, 2, 3]>; // false
```

### 2.7.10. List. Reverse\<T>

Reverse 函数接受一个元组，并返回一个包含倒序元素的元组。

这种类型正确地处理可变元组类型，例如。[1、2、……string[]] "变成"[…string[] 2 1]”。

```ts
import { $, List } from `hkt-toolbelt`;

type Result = $<List.Reverse, [1, 2, 3]>; // [3, 2, 1]
```

### 2.7.11. List. IsVariadic

`IsVariadic` 传入一个元组，如果元组是可变的，则返回 `true` ，否则返回 `false` 。
如果一个元组的长度不确定，我们就认为它是可变的。

```ts
import { List } from `hkt-toolbelt`;

type Result = List.IsVariadic<[1, 2, 3]>; // false
```

## 2.8. String Types

### 2.8.1. String. StartsWith\<S>

`StartsWith` 函数接受一个模版字符串，并返回它是否以给定的前缀开头，根据情况返回 `true` 或 `false` 。

当 _开始于_ 这个开头 `string` ，因此 `StartsWith<string>` 对于所有后续的字符串类型将返回 true。

然而， `string` 开头没有特定的前缀，因此 `$<startwith <` f `>, string>` 将导致 false。所有字符串也都以空字符串开头。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.StartsWith<`foo`>, `foobar`>; // true
```

### 2.8.2. String. EndsWith\<S>

`EndsWith` 传入一个模版字符串，并返回是否以给定后缀结束，根据情况返回 `true` 或 `false` 。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.EndsWith<`bar`>, `foobar`>; // true
```

### 2.8.3. String. Includes\<S>

`Includes` 传入一个字符串文字并返回它是否包含给定字符串的子字符串，根据情况返回 `true` 或 `false` 。

@see `String.StartsWith`

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.Includes<`foo`>, `barfoobar`>; // true
```

### 2.8.4. String. Append\<S>

`Append` 传入一个模版字符串并返回一个高阶函数类，该函数接受一个字符串并返回将传入的模版字符串添加到字符串末尾的结果。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.Append<`bar`>, `foo`>; // `foobar`
```

### 2.8.5. String. Prepend\<S>

`Prepend` 传入一个模版字符类型并返回一个高阶类型函数，该函数接受一个字符串并返回将传入的模版字符串添加到字符串开头的结果。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.Prepend<`foo`>, `bar`>; // `foobar`
```

### 2.8.6. String. IsTemplate

`IsTemplate` 传入一个字符串并返回它是否是模板字符串类型，根据情况返回 `true` 或 `false` 。

如果一个字符串不能被简化为字面值字符串，即如果其中包含 `${string}` ，则该字符串被认为是模板字面值。

> 这可能会是一步非常耗费性能的计算。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.IsTemplate, `foo${string}`>; // true
```

### 2.8.7. String. Join\<S>

`Join` 传入一个模版字符串，并返回一个更高类型的函数，该函数接受一个字符串元组，并返回以模版字符串值作为分隔符连接元组中的字符串的结果。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.Join<` `>, [`foo`, `bar`, `baz`]>; // `foo bar baz`
```

`Join` 也可以处理模板字符串，并将正确处理模板字面量的嵌入表达式。在可变元组输入的情况下，我们将联接解析为 `string` 。分隔符和元组元素都支持字符串联合。

### 2.8.8. String. Split\<S>

`Split` 传入一个模版字符串值并返回一个更高类型的函数，该函数接受一个字符串并返回一个字符串元组，其中原始字符串根据字符串字面值进行拆分。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.Split<` `>, `foo bar baz`>; // [`foo`, `bar`, `baz`]
```

`Split` 也可以处理模板字符串，并将正确处理模板字面量的嵌入表达式。但是，所有字符串字面值分隔符的结果都是 `string[]` 作为分割结果。分隔符和元组元素都支持字符串联合。
