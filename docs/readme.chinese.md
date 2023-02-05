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
  <i>函数式（functional）、可谱写（composable）的辅助类（type utilities）</i>
</p>

---

此库旨在提供适用于不同领域的辅助类（utility types）,这些类可以通过高阶类(higher-kinded types)以函数的形式加以映射和组合。

利用此库提供的可谱写（composable）且可高效编译（compile-time efficient）的辅助类，您可以更好的编写可靠且类安全的程序。

我们意在实现对数百种高阶类种（kind categories）的支持，例如 **List**， **Boolean**， **String**， **Function** 等等。除此之外，我们还内置了帮助类谱写（composing type）的类组合接口（combinators）。

## 安装

```bash
> npm install hkt-toolbelt
```

## 用法

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

您可以通过谱写 **`hkt-toolbelt`** 的高阶原始类让自己编写的复杂类更可读。

### 用$调用高阶类（kind）

您可以通过 `$` 运算符来使用您的高阶类:

```ts
type Result = $<FilterNum, [1, "x", 2, "y", 3]>; // [1, 2, 3]
```

### 子路径导入

导入也可以以子路径的形式实现。

```ts
import { $ } from `hkt-toolbelt`;
import { Filter } from `hkt-toolbelt/list`;
import { Extends } from `hkt-toolbelt/conditional`;
```

## HKT 是什么?

> **> HKT 是 higher-kinded type 简称**

Typescript 有两种 _不同_ 的类型结构: “类”和“泛型”。

- **type(类)**: 编译时用来描述值的表达式。
- **generic(泛型)**: 类似模板的形式参数类，可以通过提供一个或多个实际参数实例化，并解析出类（type）。

泛型在 Typescript 中并非一类对象（first-class citizen）——除非已经提供全部所需的实际参数类，否则它们不可以被直接调用；泛型不能作为参数提供给其他泛型，也不能被返还——这些都是由语言本身的局限导致。

**`hkt-toolbelt` 额外引入两个类型结构:**

- **kind(高阶类)**: 编译时用来描述类（type）的表达式，实际设计成函数的形式，可以接纳类作为参数进行运算。
- **generic kind(高阶泛型)**: 能够返还高阶类的泛型。

而以类(type)为参数的高阶类（kind）运算，我们通过泛型`$<kind, type>`来实现。

利用高阶类，我们可以写出仅凭泛型无法实现的新类型，譬如对泛用函数的紧缩谱写（narrow composition）。

即便某个类可以通过泛型表达，我们也可以利用高阶类实现更美观、易用的接口。

> **关于术语的使用**
> 高阶类的英文，严格来说仅使用 **_kind_** 并不正确，不过“higher-kinded type”有点长，所以用 **'kind'** 简略表达.
>
> 有时候我们也会用“hk-type”来表达，这样其实更合适。

> **中文译者注**
> 原文中出现的 higher-kinded type（高阶类）, type function（类函数）, higher-kinded-type function（高阶类函数）等词汇，虽然严格来说存在差别，但多数时候可以理解为相似的概念。

## 帮助指引

我们准备了可以帮助您上手 `hkt-toolbelt` 的资料，其中含有对相关概念和用法的详解。

- **[[自定义高阶类]](./guides/custom-kinds.md)** - 如何自定义新的高阶类?
- **[[参数限定]](./guides/kind-constraints.md)** - 如何限定高阶类的输入参数?
- **[[底层编码]](./guides/hk-type-encoding.md)** - 底层编码相关细节.

## 相关或相似的项目

- _此库灵感来源于 [ts-toolbelt](https://www.npmjs.com/package/ts-toolbelt)_
- _超棒的 TS 学习资源: [type-challenges](https://github.com/type-challenges/type-challenges)_
- _用于值（value）的辅助函数: [lodash](https://lodash.com)_

## 目录

- [API](#api)
  - [基础接口](#基础接口)
    - [$\<F, X\>](#f-x)
    - [$$\<FX, X\>](#fx-x)
    - [Cast\<A, B\>](#casta-b)
  - [布尔（Boolean）类接口](#布尔boolean类接口)
    - [Boolean.And\<X\>](#booleanandx)
    - [Boolean.Or\<X\>](#booleanorx)
    - [Boolean.Not](#booleannot)
  - [类组合（Combinator）接口](#类组合combinator接口)
    - [Combinator.Self](#combinatorself)
    - [Combinator.ApplySelf](#combinatorapplyself)
  - [条件判定（Conditional）类接口](#条件判定conditional类接口)
    - [Conditional.Equals\<A\>](#conditionalequalsa)
    - [Conditional.Extends\<A\>](#conditionalextendsa)
    - [If\<P, T, E\>](#ifp-t-e)
  - [函数（Function）类接口](#函数function类接口)
    - [Function](#function)
    - [Function.Constant\<A\>](#functionconstanta)
    - [Function.Identity](#functionidentity)
  - [高阶类（Kind）接口](#高阶类kind接口)
    - [Kind\<F\>](#kindf)
    - [Kind.Composable\<FX\>](#kindcomposablefx)
    - [Kind.Compose\<FX\>](#kindcomposefx)
    - [Kind.Pipe\<FX\>](#kindpipefx)
    - [Kind.\_](#kind_)
  - [列表（List）类接口](#列表list类接口)
    - [List.Map\<F\>](#listmapf)
    - [List.Find\<F\>](#listfindf)
    - [List.Filter\<F\>](#listfilterf)
    - [List.Append\<F\>](#listappendf)
    - [List.First\<T\>](#listfirstt)
    - [List.Last\<T\>](#listlastt)
    - [List.Pair\<T\>](#listpairt)
    - [List.Every\<T\>](#listeveryt)
    - [List.Some\<T\>](#listsomet)
    - [List.Reverse\<T\>](#listreverset)
    - [List.IsVariadic](#listisvariadic)
  - [对象（Object）类接口](#对象object类接口)
    - [Object.Keys\<F\>](#objectkeysf)
    - [Object.Values\<F\>](#objectvaluesf)
    - [Object.MapKeys\<F\>](#objectmapkeysf)
    - [Object.MapValues\<F\>](#objectmapvaluesf)
    - [Object.DeepMap\<F\>](#objectdeepmapf)
    - [Object.Paths](#objectpaths)
    - [Object.At\<K\>](#objectatk)
    - [Object.AtPath\<P\>](#objectatpathp)
  - [字串（String）类接口](#字串string类接口)
    - [String.StartsWith\<S\>](#stringstartswiths)
    - [String.EndsWith\<S\>](#stringendswiths)
    - [String.Includes\<S\>](#stringincludess)
    - [String.Append\<S\>](#stringappends)
    - [String.Prepend\<S\>](#stringprepends)
    - [String.IsTemplate](#stringistemplate)
    - [String.Join\<S\>](#stringjoins)
    - [String.Split\<S\>](#stringsplits)
    - [String.First](#stringfirst)
    - [String.Last](#stringlast)
    - [String.Tail](#stringtail)
    - [String.Init](#stringinit)
    - [String.Replace\<From, To\>](#stringreplacefrom-to)
    - [String.Reverse](#stringreverse)
    - [String.IsString](#stringisstring)
    - [String.ToUpper](#stringtoupper)
    - [String.ToLower](#stringtolower)
  - ["`Type`"接口](#type接口)
    - [Type.Display](#typedisplay)
    - [Type.ValueOf](#typevalueof)
  - [联合（Union）类接口](#联合union类接口)
    - [Union.ToIntersection](#uniontointersection)
    - [Union.ToTuple](#uniontotuple)

# API

此库的高阶类多为柯里化（currying）函数，旨在支持以无参风格（point-free style）实现类谱写。因此，使用类接口（API types）时需要先提供“操作”（operations），再提供操作的目标数据。

同样为了支持柯里化和无参风，所有类函数（type functions），例如 full Kinds，一次只接受 _一个_ 参数。

## 基础接口

### $<F, X>

`$` 操作符用于将类作为参数提供给高阶类函数（higher-kinded-type function），相当于 TypeScript 中的 `F<A>` 。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.Append<` world`>, `hello`>; // `hello world`
```

### $$<FX, X>

`$$` 操作符用于将类作为起始参数提供给一条高阶类通道（pipeline of kinds），它其实是简化同时使用 `$` 和 `Kind.Pipe` 的语法糖，用来免去完整调用后者的麻烦。

`Kind.Pipe` 以从左到右的顺序组合类函数。

@参考 `$`
@参考 `Kind.Compose`

```ts
import { $$, Kind, String } from `hkt-toolbelt`;

type Result = $$<[String.Append<" world">, String.Append<"!">], "hello">; // "hello world!"
```

### Cast<A, B>

`Cast` 用于将一个类转换成另一个类，相当于 TypeScript 中的 `A as B`，多用于微调。

```ts
import { Cast } from `hkt-toolbelt`;

type Result = Cast<`hello`, string>; // `hello`
```

## 布尔（Boolean）类接口

### Boolean.And\<X>

`And` 纳入一个布尔类并返还一个函数，这个函数可以纳入另一个布尔类并返回两个布尔类 `&&` 的结果。

```ts
import { $, Boolean } from `hkt-toolbelt`;

type Result = $<Boolean.And<true>, false>; // false
```

### Boolean.Or\<X>

`Or` 纳入一个布尔类并返还一个函数，这个函数可以纳入另一个布尔类并返回两个布尔类 `||` 的结果。

```ts
import { $, Boolean } from `hkt-toolbelt`;

type Result = $<Boolean.Or<true>, false>; // true
```

### Boolean.Not

`Not` 纳入一个布尔类并返还相反的布尔类。

```ts
import { $, Boolean } from `hkt-toolbelt`;

type Result = $<Boolean.Not, true>; // false
```

## 类组合（Combinator）接口

### Combinator.Self

`Self` 返还自身，因而可以利用$无限调用。

```ts
import { $, Combinator } from `hkt-toolbelt`;

type Result = $<$<Combinator.Self, `foo`>, `foo`>; // Combinator.Self
```

### Combinator.ApplySelf

`ApplySelf` 纳入一个高阶类，并将其作为参数提供给其自身，可用于创建 syntho 递归高阶类。

```ts
import { $, Combinator } from `hkt-toolbelt`;

type Result = $<Combinator.ApplySelf, Function.Identity>; // Function.Identity
```

## 条件判定（Conditional）类接口

### Conditional.Equals\<A>

`Equals` 用于检验一个类是否等于另一个类，等同于 TypeScript 中的 `A extends B ? ( B extends A ? true : false ) : false` 。

`Equals` 返还一个高阶类函数（higher-kinded-type function），此函数可以纳入另一个类，然后返还一个布尔类。

```ts
import { $, Conditional } from `hkt-toolbelt`;

type Result = $<$<Conditional.Equals, `foo`>, `bar`>; // false
```

### Conditional.Extends\<A>

`Extends` 用于检验一个类是否是另一个类的子类，等同于 TypeScript 中的 `A extends B ? true : false` 。

需先提供母类，再提供子类。

`Extends` 返还一个高阶类函数（higher-kinded-type function），此函数可以纳入另一个类，然后返还一个布尔类。

```ts
import { $, Conditional } from `hkt-toolbelt`;

type Result = $<$<Conditional.Extends, string>, `bar`>; // true
```

### If<P, T, E>

`If` 根据条件返还一个类，等同于 TypeScript 中的 `P<X> extends true ? T<X> : E<X>`，不过其以无参风格（point-free style）纳入参数 `X`。

`If` 纳入一个条件函数（predicate），一个真时类，和一个假时类；其返还一个高阶类函数，此函数可纳入一个类并根据判定结果返还对应真/假时类。

```ts
import { $, Conditional } from "hkt-toolbelt";

type Result = $<
  Conditional.If<
    Conditional.Equals<"foo">,
    String.Append<"bar">,
    String.Append<"baz">
  >,
  "foo"
>; // "foobar"
```

此高阶类专用于类层面的流程控制。

## 函数（Function）类接口

### Function

`Function` 是所有函数的母类，也即所有函数都是 `Function` 的子类。其并非高阶类且不能直接调用。

### Function.Constant\<A>

`Constant` 纳入一个类并返还一个函数，该函数可纳入任何类并返还最初纳入的类，即它会忽略后来纳入的类且始终返还最初的类。

```ts
import { $, Function } from `hkt-toolbelt`;

type Result = $<Function.Constant<`foo`>, number>; // `foo`
```

### Function.Identity

`Identity` 纳入一个类，并在高阶类的层面上返还该类。

```ts
import { $, Function } from `hkt-toolbelt`;

type Result = $<Function.Identity, `foo`>; // `foo`
```

## 高阶类（Kind）接口

### Kind\<F>

`Kind` 代表了可以通过 `$` 将类作为参数进行运算的类函数。

您可以选择给 Kind 提供一个函数类（function type）以提高其内部参数和返还值的优先级，以次创造新的高阶类。

### Kind.Composable\<FX>

`Composable` 检验一个高阶类元组中的高阶类是否可以组合（composable）。如果元组中高阶类 $N$ 的输出类型是高阶类 $N-1$ 的输入类型的子类型，则该元组中的高阶类可以组合。

```ts
import { $, Kind, String } from `hkt-toolbelt`;

type Result = $<Kind.Composable, [String.Append<`bar`>, String.Append<`foo`>]>; // true
```

### Kind.Compose\<FX>

`Compose` 可以将一个由高阶类组成的元组组合成一个类函数（type function）。

`Compose` 会检查提供的高阶类元组是否可以组合（composable），且会返回一个高阶类函数（higher-kinded-type function)，此函数可纳入一个类然后返还组合的结果。

`Compose` 从右向左执行函数，即——遵循数学的传统——元组中最后一个函数最先执行。

```ts
import { $, Kind, String } from `hkt-toolbelt`;

type Result = $<Kind.Compose<[String.Append<`bar`>, String.Append<`foo`>]>, ``>; // `foobar`
```

### Kind.Pipe\<FX>

`Pipe` 纳入一个由类函数（type function）组成的元组，并将它们“输送”到另一个类函数（type function）中。这里的执行顺序是从左向右，即元组中的首个函数最先执行，与 `Compose` 刚好相反。

`Pipe` 对程序员来说更直观，因为其阅读顺序与执行顺序统一。`$$` 语法糖实际运行的就是 `Pipe`。

```ts
import { $, Kind, String } from `hkt-toolbelt`;

type Result = $<Kind.Pipe<[String.Append<`foo`>, String.Append<`bar`>]>, ``>; // `foobar`
```

### Kind.\_

`_` 是类函数（type function）被调用前临时“占位”的独有类。`Kind._` 由 `$` 调用。

## 列表（List）类接口

### List.Map\<F>

`Map` 传入一个 `函数类` ，并返回一个接受元组类型的高级类型。它将给定的类型函数应用于元组中的每个元素。

```ts
import { $, List, String } from `hkt-toolbelt`;

type Result = $<List.Map<String.Append<`bar`>>, [`foo`, `baz`]>; // [`foobar`, `bazbar`]
```

### List.Find\<F>

`Find` 函数先接受一个 `函数类` ，然后接受一个 `元组` ，并返回 finder 函数返回 `true` 的第一个元组元素。如果不存在这样的元素， `Find` 返回 `never` 。

```ts
import { $, List, String } from `hkt-toolbelt`;

type Result = $<List.Find<String.StartsWith<`foo`>>, [`bar`, `foobar`]>; // `foobar`
```

### List.Filter\<F>

`Filter` 传入一个类型函数和一个元组，并按输入元组的顺序返回一个元组，因此只有 Filter 函数返回 `true` 的元素保留在结果元组中。

```ts
import { $, List, String } from `hkt-toolbelt`;

type Result = $<List.Filter<String.StartsWith<`foo`>>, [`bar`, `foobar`]>; // [`foobar`]
```

### List.Append\<F>

`Append` 传入一个类型和一个元组，并应用该类型，使其被附加到所提供的元组的末尾。

```ts
import { $, List } from `hkt-toolbelt`;

type Result = $<List.Append<`bar`>, [`foo`, `baz`]>; // [`foo`, `baz`, `bar`]
```

### List.First\<T>

`First` 传入一个元组，并返回该元组的第一个元素。

```ts
import { $, List } from `hkt-toolbelt`;

type Result = $<List.First, [`foo`, `bar`]>; // `foo`
```

### List.Last\<T>

`Last` 传入一个 `元组` ，并返回元组的最后一个元素。在具有可变元素的元组的情况下，可变元素被正确处理，即使它是中缀。

```ts
import { $, List } from `hkt-toolbelt`;

type Result = $<List.Last, [`foo`, `bar`, `baz`]>; // `baz`
```

### List.Pair\<T>

`Pair` 传入一个 `元组` ，并返回元组的元组，其中每个元组是原始元组的一对元素，按顺序排列。如。'[1, 2, 3] '变成'[[1, 2]，[2, 3]]'。

```ts
import { $, List } from `hkt-toolbelt`;

type Result = $<List.Pair, [1, 2, 3]>; // [[1, 2], [2, 3]]
```

对于可变元组，通过引入联合来表示可变对元素的可能组合来处理可变元素。

### List.Every\<T>

`Every` 接受一个操作函数类和一个元组，如果元组中的每个元素都满足这个操作函数，则返回 `true` ，否则返回 `false` 。

```ts
import { $, List, Conditional } from `hkt-toolbelt`;

type Result = $<List.Every<Conditional.Extends<number>>, [1, 2, 3]>; // true
```

### List.Some\<T>

` Some` 接受一个操作函数类和一个元组，如果元组中至少有一个元素满足操作函数类，则返回' true '，否则返回 ` ` false` 。

```ts
import { $, List, Conditional } from `hkt-toolbelt`;

type Result = $<List.Some<Conditional.Extends<string>>, [1, 2, 3]>; // false
```

### List.Reverse\<T>

Reverse 函数接受一个元组，并返回一个包含倒序元素的元组。

这种类型正确地处理可变元组类型，例如。[1、2、……string[]] "变成"[…string[] 2 1]”。

```ts
import { $, List } from `hkt-toolbelt`;

type Result = $<List.Reverse, [1, 2, 3]>; // [3, 2, 1]
```

### List.IsVariadic

`IsVariadic` 传入一个元组，如果元组是可变的，则返回 `true` ，否则返回 `false` 。
如果一个元组的长度不确定，我们就认为它是可变的。

```ts
import { List } from `hkt-toolbelt`;

type Result = List.IsVariadic<[1, 2, 3]>; // false
```

## 对象（Object）类接口

### Object.Keys\<F>

The `Keys` function takes in an object type, and returns a tuple of the keys of the object.

```ts
import { $, Object } from "hkt-toolbelt";

type Result = $<Object.Keys, { foo: string; bar: number }>; // ["foo", "bar"]
```

### Object.Values\<F>

The `Values` function takes in an object type, and returns a tuple of the values of the object.

```ts
import { $, Object } from "hkt-toolbelt";

type Result = $<Object.Values, { foo: string; bar: number }>; // [string, number]
```

### Object.MapKeys\<F>

The `MapKeys` function takes in a type function, and an object type, and returns an object type with the keys of the original object type mapped by the given type function.

```ts
import { $, Object, String } from "hkt-toolbelt";

type Result = $<Object.MapKeys<String.Append<"bar">>, { foo: string }>; // { foobar: string }
```

### Object.MapValues\<F>

The `MapValues` function takes in a type function, and an object type, and returns an object type with the values of the original object type mapped by the given type function.

```ts
import { $, Object, String } from "hkt-toolbelt";

type Result = $<Object.MapValues<String.Append<"bar">>, { foo: "foo" }>; // { foo: "foobar" }
```

### Object.DeepMap\<F>

The `DeepMap` function takes in a type function, and an object type, and returns an object type where every value in the object is mapped by the given type function.

```ts
import { $, Object, String } from "hkt-toolbelt";

type Result = $<
  Object.DeepMap<String.Append<"bar">>,
  { name: { first: "foo"; last: "bar" } }
>; // { name: { first: "foobar"; last: "barbar" } }
```

### Object.Paths

The `Paths` type takes in an object type, and returns a tuple of tuples, where each tuple is a path to a value in the object.

```ts
import { Object } from "hkt-toolbelt";

type Result = $<Object.Paths, { name: { first: "foo"; last: "bar" } }>; // [["name", "first"], ["name", "last"]]
```

### Object.At\<K>

The `At` function takes in a key, and an object type, and returns the value at the given key in the object.

```ts
import { $, Object } from "hkt-toolbelt";

type Result = $<Object.At<"name">, { name: "foo" }>; // "foo"
```

### Object.AtPath\<P>

The `AtPath` function takes in a path, and an object type, and returns the value at the given path in the object.

```ts
import { $, Object } from "hkt-toolbelt";

type Result = $<
  Object.AtPath<["name", "first"]>,
  { name: { first: "foo"; last: "bar" } }
>; // "foo"
```

## 字串（String）类接口

### String.StartsWith\<S>

`StartsWith` 函数接受一个模版字符串，并返回它是否以给定的前缀开头，根据情况返回 `true` 或 `false` 。

当 _开始于_ 这个开头 `string` ，因此 `StartsWith<string>` 对于所有后续的字符串类型将返回 true。

然而， `string` 开头没有特定的前缀，因此 `$<startwith <` f `>, string>` 将导致 false。所有字符串也都以空字符串开头。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.StartsWith<`foo`>, `foobar`>; // true
```

### String.EndsWith\<S>

`EndsWith` 传入一个模版字符串，并返回是否以给定后缀结束，根据情况返回 `true` 或 `false` 。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.EndsWith<`bar`>, `foobar`>; // true
```

### String.Includes\<S>

`Includes` 传入一个字符串文字并返回它是否包含给定字符串的子字符串，根据情况返回 `true` 或 `false` 。

@see `String.StartsWith`

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.Includes<`foo`>, `barfoobar`>; // true
```

### String.Append\<S>

`Append` 传入一个模版字符串并返回一个高阶函数类，该函数接受一个字符串并返回将传入的模版字符串添加到字符串末尾的结果。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.Append<`bar`>, `foo`>; // `foobar`
```

### String.Prepend\<S>

`Prepend` 传入一个模版字符类型并返回一个高阶类型函数，该函数接受一个字符串并返回将传入的模版字符串添加到字符串开头的结果。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.Prepend<`foo`>, `bar`>; // `foobar`
```

### String.IsTemplate

`IsTemplate` 传入一个字符串并返回它是否是模板字符串类型，根据情况返回 `true` 或 `false` 。

如果一个字符串不能被简化为字面值字符串，即如果其中包含 `${string}` ，则该字符串被认为是模板字面值。

> 这可能会是一步非常耗费性能的计算。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.IsTemplate, `foo${string}`>; // true
```

### String.Join\<S>

`Join` 传入一个模版字符串，并返回一个更高类型的函数，该函数接受一个字符串元组，并返回以模版字符串值作为分隔符连接元组中的字符串的结果。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.Join<` `>, [`foo`, `bar`, `baz`]>; // `foo bar baz`
```

`Join` 也可以处理模板字符串，并将正确处理模板字面量的嵌入表达式。在可变元组输入的情况下，我们将联接解析为 `string` 。分隔符和元组元素都支持字符串联合。

### String.Split\<S>

`Split` 传入一个模版字符串值并返回一个更高类型的函数，该函数接受一个字符串并返回一个字符串元组，其中原始字符串根据字符串字面值进行拆分。

```ts
import { $, String } from `hkt-toolbelt`;

type Result = $<String.Split<` `>, `foo bar baz`>; // [`foo`, `bar`, `baz`]
```

`Split` 也可以处理模板字符串，并将正确处理模板字面量的嵌入表达式。但是，所有字符串字面值分隔符的结果都是 `string[]` 作为分割结果。分隔符和元组元素都支持字符串联合。

### String.First

> **"If ya ain't `[First]`, you're `[Last]`"** - _Ricky Bobby_

The `First` function takes in a string and returns the first character of the string.

```ts
import { $, String } from "hkt-toolbelt";

type Result = $<String.First, "foo">; // "f"
```

### String.Last

The `Last` function takes in a string and returns the last character of the string.

```ts
import { $, String } from "hkt-toolbelt";

type Result = $<String.Last, "foo">; // "o"
```

### String.Tail

The `Tail` function takes in a string and returns the string with the first character removed.

```ts
import { $, String } from "hkt-toolbelt";

type Result = $<String.Tail, "foobar">; // "oobar"
```

### String.Init

The `Init` function takes in a string and returns the string with the last character removed.

```ts
import { $, String } from "hkt-toolbelt";

type Result = $<String.Init, "foobar">; // "fooba"
```

### String.Replace\<From, To>

The `Replace` generic, given two 'From' and 'To' types that represent a string to replace, and a string to replace it with, returns a higher-kinded-type that takes in a string and returns the result of replacing all instances of the 'From' string with the 'To' string.

```ts
import { $, String } from "hkt-toolbelt";

type Result = $<String.Replace<"foo", "bar">, "foo foo foo">; // "bar bar bar"
```

### String.Reverse

The `Reverse` function takes in a string and returns the string with the characters in reverse order.

```ts
import { $, String } from "hkt-toolbelt";

type Result = $<String.Reverse, "foobar">; // "raboof"
```

### String.IsString

The `IsString` function takes in a type and returns whether or not it is a string, returning `true` or `false` as appropriate.

```ts
import { $, String } from "hkt-toolbelt";

type Result = $<String.IsString, "foobar">; // true
```

### String.ToUpper

The `ToUpper` function takes in a string and returns the string with all characters converted to uppercase.

```ts
import { $, String } from "hkt-toolbelt";

type Result = $<String.ToUpper, "foobar">; // "FOOBAR"
```

### String.ToLower

The `ToLower` function takes in a string and returns the string with all characters converted to lowercase.

```ts
import { $, String } from "hkt-toolbelt";

type Result = $<String.ToLower, "FOOBAR">; // "foobar"
```

## "`Type`"接口

### Type.Display

The `Display` function takes in a type and attempts to force the Typescript compiler to display the resolved type in IDEs and other tools.

This is a useful internal tool to ensure resultant types remain legible.

```ts
import { $, Type } from "hkt-toolbelt";

type Result = $<Type.Display, "foobar">; // "foobar"
```

### Type.ValueOf

The `ValueOf` function takes in a type and returns the associated union value of the type, a higher-kinded equivalent to the `T[keyof T]` operator.

```ts
import { $, Type } from "hkt-toolbelt";

type Result = $<Type.ValueOf, { foo: "bar" }>; // "bar"
```

## 联合（Union）类接口

### Union.ToIntersection

The `ToIntersection` function takes in a union type and returns the intersection of all the types in the union.

```ts
import { $, Union } from "hkt-toolbelt";

type Result = $<Union.ToIntersection, { foo: "bar" } | { bar: "bar" }>; // { foo: "bar"; bar: "bar" }
```

### Union.ToTuple

The `ToTuple` function takes in a union type and returns a tuple of all the types in the union.

```ts
import { $, Union } from "hkt-toolbelt";

type Result = $<Union.ToTuple, { foo: "bar" } | { bar: "bar" }>; // [{ foo: "bar" }, { bar: "bar" }]
```
