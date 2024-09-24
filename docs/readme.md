# HKT Toolbelt

The HKT Toolbelt is a collection of type-level utilities that can be mapped and combined in functional ways using higher-kinded types.

For example, you can map and pipe type-level functions:

```ts
import { $, List, String } from 'hkt-toolbelt'

type Result = $<
  List.Map<String.ToUpper>,
  ['foo', 'bar'] // ['FOO', 'BAR']
>
```

We provide utilities around string manipulation, object mapping, arithmetic, looping, parsing, and more.

The toolbelt has 280 utilities organized into 22 modules.

# Module List

| Module name | Description |
| -- | -- |
| [\$](#module) | The `$` module contains various type-level utilities for applying type-level functions to arguments. |
| [Boolean](#module-boolean) | The `Boolean` module contains various boolean type utilities. These utilities are used to perform logical operations on boolean types. |
| [Combinator](#module-combinator) | The `Combinator` module contains various combinators. These are higher-order abstract functions that are applied to modify the behavior of other type-level functions. |
| [Conditional](#module-conditional) | The `Conditional` module contains various conditional type utilities. These utilities are used to express conditional logic in type-level programming. |
| [Digit](#module-digit) | The `Digit` module contains various utilities for working with decimal digits (0-9). Digits are used in various contexts, such as representing numbers. |
| [DigitList](#module-digitlist) | The `DigitList` module contains various utilities for working with digit lists. Digit lists are a type-level representation of lists of decimal digits (0-9). They are used in various contexts, such as representing numbers. |
| [Function](#module-function) | The `Function` module contains various utilities for working with function types. Function types are used in various contexts, such as representing higher-order functions. |
| [Integer](#module-integer) | The `Integer` module contains various utilities for working with integer types, i.e. signed and unsigned integers. |
| [Kind](#module-kind) | The `Kind` module contains various utilities for working with higher-kinded types. Higher-kinded types are used in various contexts, such as representing and manipulating higher-order functions, and composing types. |
| [List](#module-list) | The `List` module contains various utilities for working with type-level tuples. It provides utilities such as mapping, filtering, and reducing operations. |
| [Loop](#module-loop) | The `Loop` module contains various utilities for working with loops. Loops are a type-level programming construct that allows you to repeat a block of code until a certain condition is met. |
| [Matrix](#module-matrix) | The `Matrix` module contains various utilities for working with matrices. Matrices are represented as arrays of arrays, i.e. an array of rows. |
| [NaturalNumber](#module-naturalnumber) | The `NaturalNumber` module contains various utilities for working with natural numbers, i.e. integers above or equal to zero. It provides utilities such as addition, comparison, etc. |
| [NaturalNumberTheory](#module-naturalnumbertheory) | The `NaturalNumberTheory` module contains various novelty utilities for computing natural number sequences and operations. It provides utilities such as collatz, factorial, etc. |
| [Number](#module-number) | The `Number` module contains various utilities for working with including absolute values, comparisons, etc. |
| [Object](#module-object) | The `Object` module contains various utilities for working with objects, including getting and setting values, merging, etc. |
| [Parser](#module-parser) | The `Parser` module contains various utilities for building type-level parsers, which take in a string literal and return a type representing the result of parsing the string. |
| [Stress](#module-stress) | The `Stress` module contains various utilities for stress testing type-level functions, including generating large tuples and objects. This is used internally to ensure that type-level functions are robust and can handle large inputs without crashing. |
| [String](#module-string) | The `String` module contains various utilities for working with strings, including manipulating string types, joining strings, etc. |
| [Test](#module-test) | The `Test` module contains various utilities for testing type-level functions, including expecting types to be equal, etc. This is used internally to ensure correctness. |
| [Type](#module-type) | The `Type` module contains various utilities for working with types, including casting, displaying, and inferring types. |
| [Union](#module-union) | The `Union` module contains various utilities for working with union types, including converting to intersections, lists, etc. |


# Module: $

The `$` module contains various type-level utilities for applying type-level
functions to arguments.


```ts
import { $, String } from 'hkt-toolbelt'

type Result = $<String.ToUpper, 'foo'> // 'FOO'
```
 

| Utility name | Description |
| -- | -- |
  | [\$](#utility-) | `$` is the most fundamental type in `hkt-toolbelt`. `$` is a generic type which takes in a type-level function and an input type, and returns the resultant output type of the type-level function, when applied to the input. |
  | [\$\$](#utility-) | `$$` is a type-level function in `hkt-toolbelt` that allows users to pipe multiple type-level functions together and apply them to an input. |
  | [\$N](#utility-n) | `$N` is a type-level function that applies a type-level function to a list of arguments. |


## Utility: \$.\$

`$` is the most fundamental type in `hkt-toolbelt`. `$` is a generic type
which takes in a type-level function and an input type, and returns the
resultant output type of the type-level function, when applied to the input.

This is a type-level equivalent of an 'apply' function.

`$` operates via partial application. This means that `$` can be used to
partially apply a type-level function, and then apply the partially applied
type-level function to a different input type. All applications of `$` must
be curried.

### Type-Level Function Application

The reason that we use `$` instead of normal generic type parameters is that
we want to be able to partially apply type-level functions. If we used
normal generic type parameters, we would not be able to perform partial
application, nor would we be able to take in or reference 'unapplied' types.

As well, in base TypeScript, generics may not take in other generics. In
other words, the following is not valid TypeScript:

```ts
type Apply<F, X> = F<X>; // 'Type 'F' is not generic.'
```

If we wanted to create a 'Map' type, we would not be able to do so with
normal generic type parameters. Instead, we would need to use a higher-order
type-level function. That is what `hkt-toolbelt` provides.

| Argument name | Type | Description |
| -- | -- | -- |
| F | `Kind` | A type-level function. |
| X | `InputOf<F>` | The input type to apply the type-level function to. |

#### Basic Usage


For example, `Function.Identity` is a type-level function which takes in one
argument: the input type. `Function.Identity` returns the input type that was
passed in.

Applying `Function.Identity` to a type will result in the type that was
passed in:

```ts
import { Kind, Function } from "hkt-toolbelt";
type Result = $<Function.Identity, "foo">; // "foo"
```


For example, `String.Append` is a type-level function which takes in two
arguments: first, the string to append, and second, the string to append to.

Only applying `String.Append` to one argument will result in a partially
applied type-level function. This partially applied type-level function can
then be applied to a different input type.

```ts
import { Kind, String } from "hkt-toolbelt";
type AppendBar = $<String.Append, "bar">;
type Result = $<AppendBar, "foo">; // "foobar"
```

Intermediary type aliases are not necessary, but they can be useful for
readability. The following example is equivalent to the previous example.

```ts
import { Kind, String } from "hkt-toolbelt";
type Result = $<$<String.Append, "bar">, "foo">; // "foobar"
```

#### Advanced Usage


For example, `List.Map` is a type-level function which takes in two
arguments: first, a type-level function, and second, a list. `List.Map`
returns a list of the same length as the input list, where each element is
the result of applying the type-level function to the corresponding element
in the input list.

This example applies `List.Map` to a partially applied `String.Append` type-
level function, and a list of strings. The result is a list of strings, where
each string has been appended with the string "bar".

```ts
import { Kind, List, String } from "hkt-toolbelt";
type Result = $<
 $<List.Map, $<String.Append, "bar">,
 ["foo", "baz"]
>; // ["foobar", "bazbar"]
```

This example is a nice demonstration of functionality that cannot easily be
achieved with normal generic type parameters.


For example, `List.Filter` is a type-level function which takes in two
arguments: first, a type-level function, and second, a list. `List.Filter`
will only return the elements of the input list where the type-level
function returns the type `true`.

This example applies `List.Filter` to a partially applied `String.Includes`,
and a list of strings. The result is a list of strings, where each string
includes the string "bar".

Here we show where each intermediary step has been given a type alias. This
is not necessary, but it can be useful for readability and reusability.

```ts
import { Kind, List, String } from "hkt-toolbelt";

// Does the string include "bar"?
type IncludesBar = $<String.Includes, "bar">;

// Filter the list for strings that include "bar".
type FilterForBar = $<List.Filter, IncludesBar>;

// Apply the filter to the list.
type Result = $<
  FilterForBar,
  ["foo", "foobar", "baz", "barqux"]
>; // ["foobar", "barqux"]
```

In conclusion, `hkt-toolbelt` provides a powerful set of type-level
functions, which can be used to create complex type-level logic. The `$`
type is the most fundamental type in `hkt-toolbelt`, and is used to apply
type-level functions to input types.
 


## Utility: \$.\$\$

`$$` is a type-level function in `hkt-toolbelt` that allows users to pipe
multiple type-level functions together and apply them to an input.

### Purpose

`hkt-toolbelt` provides a variety of higher-order type-level functions that
enable users to create complex type-level logic. However, it can be
challenging to apply multiple type-level functions to an input without
resorting to using intermediary type aliases.

For example, imagine we want to append a string to a list of strings and
then join the resulting list. We would write this as the following, using
`Kind.Pipe`.

`Kind.Pipe` is a type-level function that takes a tuple of type-level
functions and composes them from left to right.

```ts
import { Kind, List, String } from "hkt-toolbelt";

type Result = $<
  $<Kind.Pipe,
  [
    $<List.Push, "foo">,
    $<String.Join, " ">
  ]>,
  ["bar", "baz"]
> // "bar baz foo"
```

This is quite verbose. We can use `$$` to make this code more readable:

```ts
import { Kind, List, String, $$ } from "hkt-toolbelt";

type Result = $$<
  [
    $<List.Push, "foo">,
    $<String.Join, " ">
  ],
  ["bar", "baz"]
>; // "bar baz foo"
```

Here, `$$` is being used to pipe `List.Push` and `String.Join` together and
then apply them to a list of strings.

| Argument name | Type | Description |
| -- | -- | -- |
| FX | `Kind[]` | A tuple of type-level functions that will be piped together. |
| X | `InputOf<FX[0]>` | The input type that the type-level functions will be applied to. |

#### Basic Usage


Here's a basic example that uses `$$` to apply a type-level function to an
input type:

```ts
import { Kind, List, $$ } from "hkt-toolbelt";

type Result = $$<
  [$<List.Push, "bar">, List.Unshift<"foo">],
  [1, 2, 3]
>; // ["foo", 1, 2, 3, "bar"]
```

Here, `List.Push` and `List.Unshift` are being piped together using `$$` to
append "bar" to a list of numbers and then prepend "foo".

#### Errors

`$$` will enforce that the Nth type-level function's output is a subtype of
the (N + 1)th input. If this is not the case, `$$` will return the `never`
type.

If you receive a `never` type, it can be helpful to use the `Kind.InputOf`
and `Kind.OutputOf` type-level functions to inspect the input and output
types of the type-level functions that you are piping together.
 


## Utility: \$.\$N

`$N` is a type-level function that applies a type-level function to a list of
arguments.

This is syntactic sugar for nested `$` applications. In some sense this is
the contrapositive of `$$`, in that `$$` pipes a value through a list of
functions, while `$N` pipes a list of values through a function.

There is no specific type checking to ensure the elements of the list are
subtypes of the input type of the type-level function.

| Argument name | Type | Description |
| -- | -- | -- |
| K | `Kind` | The type-level function to apply. |
| X | `List` | The list of arguments to apply the type-level function to. |

Since all type-level functions are curried, we successively apply the
type-level function to each argument in the list.

This is useful for applying a type-level function that takes many arguments,
such as conditionals.


For example, `Function.If` is a type-level function which takes in four
arguments: a predicate, a truthy branch, a falsy branch, and an input type.

Let's consider a function that emits 'even' if the input number is even, and
'odd' if the input number is odd:

```ts
import { $, $N, Conditional, Function, NaturalNumber } from "hkt-toolbelt";

type Parity = $N<
  Conditional.If,
  [
    NaturalNumber.IsEven,
    $<Function.Constant, "even">,
    $<Function.Constant, "odd">
  ]
>;

type Result = $<Parity, 42>; // "even"
```

Here, we apply `Conditional.If` to a list of arguments. The first argument is
`NaturalNumber.IsEven`, which is a type-level function that takes in a
`NaturalNumber` and returns `true` if the number is even, and `false`
otherwise. The second argument is a type-level function that always returns
the string "even". The third argument is a type-level function that always
returns the string "odd".

Since all type-level functions are curried, the resultant `Parity` type-level
function may be applied to get the result.
 


# Module: Boolean

The `Boolean` module contains various boolean type utilities. These utilities
are used to perform logical operations on boolean types.


```ts
import { $, Boolean } from 'hkt-toolbelt'

type Result = $<Boolean.And<true>, false> // false
```
 

| Utility name | Description |
| -- | -- |
  | [AndAll](#utility-booleanandall) | `AndAll` is a type-level function that checks whether all elements in a sequence of booleans are `true`. |
  | [And](#utility-booleanand) | `And` is a type-level function that takes in two boolean types, `T` and `U`, and returns the boolean result of applying the 'and' logical operation on `T` and `U`. |
  | [Imply](#utility-booleanimply) | `Imply` is a type-level function that takes in two boolean types, `T` and `U`, and returns the boolean result of applying the 'imply' logical operation on `T` and `U`. |
  | [NandAll](#utility-booleannandall) | `NandAll` is a type-level function that checks whether none of the elements in a sequence of boolean values are `true`. |
  | [Nand](#utility-booleannand) | `Nand` is a type-level function that takes in two boolean types, `T` and `U`, and returns the boolean result of applying the 'nand' logical operation on `T` and `U`. |
  | [Nimply](#utility-booleannimply) | `Nimply` is a type-level function that takes in two boolean types, `T` and `U`, and returns the boolean result of applying the 'not-implies' logical operation on `T` and `U`. |
  | [NorAll](#utility-booleannorall) | `NorAll` is a type-level function that returns true only if every element in the given sequence of booleans is false. |
  | [Nor](#utility-booleannor) | `Nor` is a type-level function that takes in two boolean types, `T` and `U`, and returns the boolean result of applying the 'nor' logical operation on `T` and `U`. |
  | [Not](#utility-booleannot) | `Not` is a type-level function that takes in a boolean type `T`, and returns the boolean result of applying the 'not' logical operation on `T`. |
  | [OrAll](#utility-booleanorall) | `OrAll` is a type-level function that returns true if any of the elements in the given sequence of booleans are true. |
  | [Or](#utility-booleanor) | `Or` is a type-level function that takes in two boolean types, `T` and `U`, and returns the boolean result of applying the 'or' logical operation on `T` and `U`. |
  | [XnorAll](#utility-booleanxnorall) | `XnorAll` is a type-level function that returns true if an odd number of elements in the given sequence of booleans are true. |
  | [Xnor](#utility-booleanxnor) | `Xnor` is a type-level function that takes in two boolean types, `T` and `U`, and returns the boolean result of applying the 'xnor' logical operation on `T` and `U`. |
  | [Xor](#utility-booleanxor) | `Xor` is a type-level function that takes in two boolean types, `T` and `U`, and returns the boolean result of applying the 'exclusive or' (xor) logical operation on `T` and `U`. |


## Utility: Boolean.AndAll

`AndAll` is a type-level function that checks whether all elements in a
sequence of booleans are `true`.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `boolean[]` | The boolean array to check. |


For example, we can use `AndAll` to check if all elements in a boolean array
are `true`. In this example, we have an array with all elements being `true`:

We apply `AndAll` to the boolean array using the `$` type-level applicator:

```ts
import { $, Boolean } from "hkt-toolbelt";

type Result = $<Boolean.AndAll, [true, true, true]>; // true
```
 


## Utility: Boolean.And

`And` is a type-level function that takes in two boolean types, `T` and
`U`, and returns the boolean result of applying the 'and' logical operation
on `T` and `U`.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `boolean` | A boolean type. |
| U | `boolean` | A boolean type. |


For example, we can use `And` to determine whether two boolean types are
both true. In this example, `true` and `false` are passed as type arguments
to the type-level function:

We apply `And` to `true` and `false` respectively using the `$` type-level
applicator:

```ts
import { $, Boolean } from "hkt-toolbelt";

type Result = $<$<Boolean.And, true>, false>; // false
```
 


## Utility: Boolean.Imply

`Imply` is a type-level function that takes in two boolean types, `T` and
`U`, and returns the boolean result of applying the 'imply' logical
operation on `T` and `U`.

This is also known as the 'logical implication' operator.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `boolean` | A boolean type. |
| U | `boolean` | A boolean type. |


For example, we can use `Imply` to determine whether a statement is true
given the truth values of two propositions, `T` and `U`. In this example,
`true` and `false` are passed as type arguments to the type-level function:

We apply `Imply` to `true` and `false` respectively using the `$` type-level
applicator:

```ts
import { $, Boolean } from "hkt-toolbelt";

type Result = $<$<Boolean.Imply, true>, false>; // false
```
 


## Utility: Boolean.NandAll

`NandAll` is a type-level function that checks whether none of the elements
in a sequence of boolean values are `true`.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `boolean[]` | The boolean array to check. |


For example, we can use `NandAll` to check if none of the elements in a
boolean array are `true`. In this example, we have an array with all elements
being `false`:

We apply `NandAll` to the boolean array using the `$` type-level applicator:

```ts
import { $, Boolean } from "hkt-toolbelt";

type Result = $<Boolean.NandAll, [false, false, false]>; // true
```
 


## Utility: Boolean.Nand

`Nand` is a type-level function that takes in two boolean types, `T` and
`U`, and returns the boolean result of applying the 'nand' logical operation
on `T` and `U`.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `boolean` | A boolean type. |
| U | `boolean` | A boolean type. |


For example, we can use `Nand` to determine whether two boolean types are
not both true. In this example, `true` and `false` are passed as type
arguments to the type-level function:

We apply `Nand` to `true` and `false` respectively using the `$` type-level
applicator:

```ts
import { $, Boolean } from "hkt-toolbelt";

type Result = $<$<Boolean.Nand, true>, false>; // true
```
 


## Utility: Boolean.Nimply

`Nimply` is a type-level function that takes in two boolean types, `T` and
`U`, and returns the boolean result of applying the 'not-implies' logical
operation on `T` and `U`.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `boolean` | A boolean type. |
| U | `boolean` | A boolean type. |


For example, we can use `Nimply` to determine whether two boolean types
follow the 'not-implies' logical operation. In this example, `true` and
`false` are passed as type arguments to the type-level function:

We apply `Nimply` to `true` and `false` respectively using the `$` type-level
applicator:

```ts
import { $, Boolean } from "hkt-toolbelt";

type Result = $<$<Boolean.Nimply, true>, false>; // true
```
 


## Utility: Boolean.NorAll

`NorAll` is a type-level function that returns true only if every element in
the given sequence of booleans is false.

| Argument name | Type | Description |
| -- | -- | -- |
| B | `boolean[]` | A sequence of booleans. |


For example, we can use `NorAll` to check if none of the elements in a
boolean array are `true`. In this example, we have an array with all elements
being `false`:

We apply `NorAll` to the boolean array using the `$` type-level applicator:

```ts
import { $, Boolean } from "hkt-toolbelt";

type Result = $<Boolean.NorAll, [false, false, false]>; // true
```
 


## Utility: Boolean.Nor

`Nor` is a type-level function that takes in two boolean types, `T` and
`U`, and returns the boolean result of applying the 'nor' logical operation
on `T` and `U`.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `boolean` | A boolean type. |
| U | `boolean` | A boolean type. |


For example, we can use `Nor` to determine whether two boolean types are both
false. In this example, `true` and `true` are passed as type arguments to the
type-level function:

We apply `Nor` to `true` and `true` respectively using the `$` type-level
applicator:

```ts
import { $, Boolean } from "hkt-toolbelt";

type Result = $<$<Boolean.Nor, true>, true>; // false
```
 


## Utility: Boolean.Not

`Not` is a type-level function that takes in a boolean type `T`, and
returns the boolean result of applying the 'not' logical operation on `T`.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `boolean` | A boolean type. |


For example, we can use `Not` to negate a boolean type:

We apply `Not` to `true` using the `$` type-level applicator:

```ts
import { $, Boolean } from "hkt-toolbelt";

type Result = $<Boolean.Not, true>; // false
```
 


## Utility: Boolean.OrAll

`OrAll` is a type-level function that returns true if any of the elements in
the given sequence of booleans are true.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `boolean[]` | The boolean array to check. |


For example, we can use `OrAll` to check if any of the elements in a
boolean array are `true`. In this example, we have an array with all elements
being `false`:

We apply `OrAll` to the boolean array using the `$` type-level applicator:

```ts
import { $, Boolean } from "hkt-toolbelt";

type Result = $<Boolean.OrAll, [false, false, false]>; // false
```
 


## Utility: Boolean.Or

`Or` is a type-level function that takes in two boolean types, `T` and
`U`, and returns the boolean result of applying the 'or' logical operation
on `T` and `U`.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `boolean` | A boolean type. |
| U | `boolean` | A boolean type. |


For example, we can use `Or` to determine whether at least one of two boolean
types is true. In this example, `true` and `false` are passed as type arguments
to the type-level function:

We apply `Or` to `true` and `false` respectively using the `$` type-level
applicator:

```ts
import { $, Boolean } from "hkt-toolbelt";

type Result = $<$<Boolean.Or, true>, false>; // true
```
 


## Utility: Boolean.XnorAll

`XnorAll` is a type-level function that returns true if an odd number of
elements in the given sequence of booleans are true.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `boolean[]` | The boolean array to check. |


For example, we can use `XnorAll` to check if an even number of elements in
a boolean array are `true`. In this example, we have an array with an odd
number of `true` elements:

We apply `XnorAll` to the boolean array using the `$` type-level applicator:

```ts
import { $, Boolean } from "hkt-toolbelt";

type Result = $<Boolean.XnorAll, [true, false, true]>; // false
```
 


## Utility: Boolean.Xnor

`Xnor` is a type-level function that takes in two boolean types, `T` and
`U`, and returns the boolean result of applying the 'xnor' logical operation
on `T` and `U`.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `boolean` | A boolean type. |
| U | `boolean` | A boolean type. |


For example, we can use `Xnor` to determine whether two boolean types are
equal. In this example, `true` and `true` are passed as type arguments to the
type-level function:

We apply `Xnor` to `true` and `true` respectively using the `$` type-level
applicator:

```ts
import { $, Boolean } from "hkt-toolbelt";

type Result = $<$<Boolean.Xnor, true>, true>; // true
```


In this example, `true` and `false` are passed as type arguments to the
type-level function:

We apply `Xnor` to `true` and `false` respectively using the `$` type-level
applicator:

```ts
import { $, Boolean } from "hkt-toolbelt";

type Result = $<$<Boolean.Xnor, true>, false>; // false
```

The 'xnor' operation is a logical operation which stands for 'exclusive nor'.
The xnor operation returns true if and only if its operands are equal. It is
equivalent to the negation of the xor (exclusive or) operation.
 


## Utility: Boolean.Xor

`Xor` is a type-level function that takes in two boolean types, `T` and
`U`, and returns the boolean result of applying the 'exclusive or' (xor)
logical operation on `T` and `U`.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `boolean` | A boolean type. |
| U | `boolean` | A boolean type. |


For example, we can use `Xor` to determine whether two boolean types are
different. In this example, `true` and `false` are passed as type arguments
to the type-level function:

We apply `Xor` to `true` and `false` respectively using the `$` type-level
applicator:

```ts
import { $, Boolean } from "hkt-toolbelt";

type Result = $<$<Boolean.Xor, true>, false>; // true
```

### Exclusive Or (XOR) Operation

The 'exclusive or' operation (XOR) is a logical operation that outputs true
only when the inputs differ. In other words, it returns false when the
inputs are the same.

Here's a truth table for the XOR operation:

| Input A | Input B | Output |
| ------- | ------- | ------ |
| true    | true    | false  |
| true    | false   | true   |
| false   | true    | true   |
| false   | false   | false  |

The XOR operation can also be thought of as the negation of the equality
operation (i.e., `A !== B` is equivalent to `A ^ B`).
 


# Module: Combinator

The `Combinator` module contains various combinators. These are higher-order
abstract functions that are applied to modify the behavior of other
type-level functions.



| Utility name | Description |
| -- | -- |
  | [ApplySelf](#utility-combinatorapplyself) | `ApplySelf` is a higher-order type-level function that takes in a recursive kind and applies that kind to itself. |
  | [Collate](#utility-combinatorcollate) | `Collate` is a combinator that takes a number `N` and returns a type-level function of arity `N` that expects `N` arguments, and after all curried applications will return a tuple of length `N`, containing the arguments applied. |
  | [FixSequence](#utility-combinatorfixsequence) | The `FixSequence` type-level function generates a fixed-point sequence for a given kind `KIND`. A fixed-point sequence is a sequence of values where the next value in the sequence is the result of applying `KIND` to the previous value, and so on, until the value reaches a fixed point. |
  | [RecursiveKind](#utility-combinatorrecursivekind) | `RecursiveKind` is a higher-order type-level function that serves as a subtype. It is used to express the fact that some other higher-order kind takes in itself as a type argument. |
  | [Self](#utility-combinatorself) | `Self` is a higher-order type-level function that outputs itself. Since it outputs itself, it can be applied an arbitrary amount of times. |


## Utility: Combinator.ApplySelf

`ApplySelf` is a higher-order type-level function that takes in a recursive
kind and applies that kind to itself.

This type-level function is provided only for theoretical completeness, and
experiences little practical use.

This is similar to the `(f) => f(f)` pattern in functional programming,
where the function `f` takes in itself as an argument, and returns its own
application to itself.

| Argument name | Type | Description |
| -- | -- | -- |
| F | `Kind` | A recursive kind that takes in itself as a type argument. |


For example, we can use `ApplySelf` to create the omega combinator, which
is the simplest way to cause an infinite loop in term-rewriting systems.

```ts
import { Combinator } from "hkt-toolbelt";

type Omega = $<Combinator.ApplySelf, Combinator.ApplySelf>; // Error
```


For example, you could apply `ApplySelf` to the identity function. This
returns the identity function itself, so is of little practical use.

```ts
import { $, Combinator, Function } from "hkt-toolbelt";

type Result = $<Combinator.ApplySelf, Function.Identity>; // Function.Identity
```
 


## Utility: Combinator.Collate

`Collate` is a combinator that takes a number `N` and returns a type-level
function of arity `N` that expects `N` arguments, and after all curried
applications will return a tuple of length `N`, containing the arguments
applied.

| Argument name | Type | Description |
| -- | -- | -- |
| N | `number` | The arity of the type-level function to create. |

This is useful for creating type-level functions that are 'variadic' in the
sense that they can take in a specified number of arguments.

Additionally, this can be used in conjunction with `Uncurry` to "lift"
arguments out of function composition.

If zero is passed in, an empty tuple is immediately returned.


```ts
import { $, Kind, Type } from "ts-toolbelt"

type Take2 = $<Kind.Collate, 2>

type Result = $<$<Take2, "foo">, "bar"> // ["foo", "bar"]
```
 


## Utility: Combinator.FixSequence

The `FixSequence` type-level function generates a fixed-point sequence for a
given kind `KIND`. A fixed-point sequence is a sequence of values where the
next value in the sequence is the result of applying `KIND` to the previous
value, and so on, until the value reaches a fixed point.

| Argument name | Type | Description |
| -- | -- | -- |
| F | `Kind` | The kind for which the fixed-point sequence is generated. |
| X | `InputOf<F>` | The initial value of the fixed-point sequence. |

A fixed point is reached when applying `KIND` to a value returns that same
value. Notably, this means that an infinite loop is possible if we do not
converge to a fixed point.

There are two scenarios where we do not reach convergence:
- If we diverge (generate larger and larger values).
- If we oscillate (generate values that infinitely cycle between values).

If convergence is not reached, the 'infinite type instantiation' error will
be emitted by the TypeScript compiler.

### Term Rewriting

Here we show a simple example of a convergent fixed-point sequence. Term
rewriting is a concept in computer science that is used to transform a
string into another string.

We define a term rule "xyz --> x", which replaces the string "xyz" with the
string "x". We then create a fixed-point sequence for this term rule.

A term sequence may be terminal or non-terminal. A terminal term sequence is
one where we reach a state where no more term rules can be applied.

```ts
import { $, Function, String, Combinator } from "hkt-toolbelt";

type Rewrite = $<Combinator.FixSequence, $<$<String.Replace, "xyz">, "x">>

// ["zyxyzyzyz", "zyxyzyz", "zyxyz", "zyx"]
type Result = $<Rewrite, "zyxyzyzyz">
```

In the above example, we started with a given string and applied successive
term rules until we reached a terminal state.

### Divergent Case

Here we show a simple example of a divergent fixed-point sequence. We define
the (+1) type-level function, which takes a number and returns that number
plus 1. We then create a fixed-point sequence for (+1), starting from the
value `0`.

```ts
import { $, Combinator, NaturalNumber } from "hkt-toolbelt";

// Error: Type instantiation is excessively deep and possibly infinite.
type Result = $<$<Combinator.FixSequence, $<NaturalNumber.Add, 1>>, 0>;
```

In the above example, we started with the value `0` and applied the (+1)
function to it. The result of applying (+1) to `0` is `1`. We then apply (+1)
to `1`, which results in `2`. We continue this process until we reach the
maximum number of iterations allowed by the TypeScript compiler.
 


## Utility: Combinator.RecursiveKind

`RecursiveKind` is a higher-order type-level function that serves as a
subtype. It is used to express the fact that some other higher-order kind
takes in itself as a type argument.

| Argument name | Type | Description |
| -- | -- | -- |
| F | `RecursiveKind` | Input type of the recursive kind. |

This type-level function doesn't do much on its own, but it is useful in
combination with other type-level functions.
 


## Utility: Combinator.Self

`Self` is a higher-order type-level function that outputs itself. Since it
outputs itself, it can be applied an arbitrary amount of times.

| Argument name | Type | Description |
| -- | -- | -- |
| X | `any` | An ignored input type. |


```ts
import { $, Combinator } from "hkt-toolbelt";

type Self1 = $<Combinator.Self, never>;

type Self2 = $<Self1, never>;
```
 


# Module: Conditional

The `Conditional` module contains various conditional type utilities. These
utilities are used to express conditional logic in type-level programming.


```ts
import { $, Conditional } from 'hkt-toolbelt'

type MyFcn = $<$<Conditional.If, $<Conditional.Equals, 123>, 'foo'>, 'bar'>

type Result = $<MyFcn, 123> // 'foo'
type Result2 = $<MyFcn, 456> // 'bar'
```
 

| Utility name | Description |
| -- | -- |
  | [EqualsAll](#utility-conditionalequalsall) | `EqualsAll` is a type-level function that takes in one array of types, `T`, and returns a type-level function that returns `true` if all elements of `T` evaluate to the same type or `T` is empty, and `false` if otherwise. |
  | [Equals](#utility-conditionalequals) | `Equals` is a type-level function that takes in one type, `T`, and returns a type-level function that takes in one type, `U`, and returns `true` if `U` is the same type as `T`, and `false` otherwise. |
  | [ExtendsAll](#utility-conditionalextendsall) | `ExtendsAll` is a type-level function that takes in a type `U` and an array of types, `T`, and returns a type-level function that returns `true` if all elements of `T` extend `U`, and `false` if otherwise. |
  | [Extends](#utility-conditionalextends) | `Extends` is a type-level function that takes in two types, `T` and `U`, and returns a boolean that represents whether `T` extends `U`. |
  | [If](#utility-conditionalif) | `If` is a type-level if-then-else statement. Given a predicate `Predicate`, a true branch `Then`, and a false branch `Else`, `If` will evaluate the predicate with an input `X` of type `Kind._$inputOf<Predicate>`. If the predicate returns `true`, then `If` will return the result of applying `Then` to `X`. Otherwise, `If` will return the result of applying `Else` to `X`. |
  | [IsSupertypeOf](#utility-conditionalissupertypeof) | `IsSupertypeOf` is a type-level function that takes in two types, `T` and `U`, and returns a boolean that represents whether `T` is a supertype of `U`. |
  | [NotEquals](#utility-conditionalnotequals) | `NotEquals` is a type-level function that returns `true` if `T` and `U` are not equal. Otherwise, it returns `false`. |


## Utility: Conditional.EqualsAll

`EqualsAll` is a type-level function that takes in one array of types, `T`, and returns a
type-level function that returns `true` if all elements of `T` evaluate to the same type or `T` is empty,
and `false` if otherwise.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `any[]` | An array of types. |


For example, we can use `EqualsAll` to determine whether multiple types are equal.
In this example, `EqualsAll` is a type-level function that returns `true` if all elements of its input evaluate as being equal.

We apply this type-level function to `[false, false, false]` and `[true, false]` respectively using the `$` type-level applicator:

```ts
import { $, Conditional } from "hkt-toolbelt";

type IsTrue = $<Conditional.EqualsAll, [false, false, false]>; // true
type IsNotTrue = $<Conditional.EqualsAll, [true, false]>; // false
```
 


## Utility: Conditional.Equals

`Equals` is a type-level function that takes in one type, `T`, and returns a
type-level function that takes in one type, `U`, and returns `true` if `U` is
the same type as `T`, and `false` otherwise.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `any` | A type. |
| U | `any` | A type. |


For example, we can use `Equals` to determine whether two types are equal.
In this example, we partially apply `Equals` to `true`, which results in a
type-level function that returns `true` if its input is the same as `true`.

We then apply this partially applied function to `true` and `false`
respectively using the `$` type-level applicator:

```ts
import { $, Conditional } from "hkt-toolbelt";

type IsTrue = $<$<Conditional.Equals, true>, true>; // true
type IsNotTrue = $<$<Conditional.Equals, true>, false>; // false
```
 


## Utility: Conditional.ExtendsAll

`ExtendsAll` is a type-level function that takes in a type `U` and an array of types, `T`,
and returns a type-level function that returns `true` if all elements of `T` extend `U`,
and `false` if otherwise.

If T is empty, `true` is returned.

| Argument name | Type | Description |
| -- | -- | -- |
| U | `any` | A type. |
| T | `any[]` | An array of types. |


For example, we can use `ExtendsAll` to determine whether a series of types all extend a second input type.
In this example, we partially apply `ExtendsAll` to `string | number` and `never`, which result in
two type-level functions that return `true` if all elements of their input extend `string | number` and `never`, respectively.

We then apply both of these partially applied functions to `[string, number]` using the `$` type-level applicator.

```ts
import { $, Conditional } from "hkt-toolbelt";

type IsTrue = $<$<Conditional.ExtendsAll, string | number>, [string, number]>; // true
type IsNotTrue = $<$<Conditional.ExtendsAll, never>, [string, number]>; // false
```
 


## Utility: Conditional.Extends

`Extends` is a type-level function that takes in two types, `T` and `U`, and
returns a boolean that represents whether `T` extends `U`.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `any` | The supertype that we are checking if `U` extends. |
| U | `any` | The type that we are checking if it is a subtype of `T`. |


For example, we can use `Extends` to determine whether a type `T` extends a
type `U`. In this example, we test whether `true` extends `boolean`:

We apply `Extends` to `boolean` and `true` respectively using the `$`
type-level applicator. This checks whether `true` extends `boolean`:

```ts
import { $, Conditional } from "hkt-toolbelt";

type Result = $<$<Conditional.Extends, boolean>, true>; // true
```

In the following examples, we test whether a string extends a number:

```ts
import { $, Conditional } from "hkt-toolbelt";

type Result = $<$<Conditional.Extends, number>, string>; // false
```

Note that TypeScript provides its own `extends` keyword that can be used to
perform a subtype check. However, `extends` can only be used in a
conditional type. `Extends` is composable, so it can be used in more
sophisticated type-level functions.
 


## Utility: Conditional.If

`If` is a type-level if-then-else statement. Given a predicate `Predicate`,
a true branch `Then`, and a false branch `Else`, `If` will evaluate the
predicate with an input `X` of type `Kind._$inputOf<Predicate>`. If the
predicate returns `true`, then `If` will return the result of applying
`Then` to `X`. Otherwise, `If` will return the result of applying `Else`
to `X`.

This can be thought of as a type-level ternary operator.

| Argument name | Type | Description |
| -- | -- | -- |
| Predicate | `Kind` | A type-level function that returns a boolean. |
| Then | `Kind` | A type-level function that is applied when the predicate returns |
| Else | `Kind` | A type-level function that is applied when the predicate returns |
| X | `InputOf<Predicate>` | The input to the predicate function. |

## Usage Examples


For example, we can use `If` to create a type-level ternary operator. Since
`If` has a high arity, we use `$N` to pipe multiple arguments to `If`.

Let's implement a function that emits 'yes' if the input string starts with
'foo', and 'no' otherwise:

```ts
import { $, Conditional, Function } from "hkt-toolbelt";

type StartsWithFoo = $N<
  Conditional.If,
  [
    $<String.StartsWith, "foo">,
    $<Function.Constant, "yes">,
    $<Function.Constant, "no">
  ]
>;

type Result = StartsWithFoo<"foo">; // "yes"
```

In this example, we use `String.StartsWith` to create a predicate function
that returns `true` if the input string starts with "foo", and `false`
otherwise.

Each of the truthy and falsy branches are simple constant functions that
return the string "yes" and "no", respectively. These functions are applied
on the input string, so more complex processing can be done in the branches.


We can also use `If` to filter a list. In this example, we use
`String.StartsWith` to filter out elements of a list that do not start with
the string "foo":

```ts
import { $, Conditional, List, String } from "hkt-toolbelt";

type Filtered = $<
  $<
    List.Filter,
    $<Conditional.If, $<String.StartsWith, "foo">, String.Identity>
  >,
  ["foo", "bar", "baz", "foobar"]
>; // ["foo", "foobar"]
```

Here, we use `If` to create a conditional type-level function that returns
`String.Identity` when the string starts with "foo", and `never` otherwise.
We then pass this function to `List.Filter`, which returns a list of only the
elements that satisfy the predicate.
 


## Utility: Conditional.IsSupertypeOf

`IsSupertypeOf` is a type-level function that takes in two types, `T` and `U`, and
returns a boolean that represents whether `T` is a supertype of `U`.

This function checks the converse of `Extends`.
While `Extends` returns `true` if `T` -> `U` is true,
`IsSupertypeOf` will return `true` if and only if `T` <- `U` is true.

This is useful if it is known that `U` extends `T`,
but the two arguments are being supplied in the opposite order expected by `Extends`.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `any` | The supertype that we are checking if `U` extends. |
| U | `any` | The type that we are checking if it is a subtype of `T`. |


For example, we can use `IsSupertypeOf` to determine whether a given type `T` is a supertype of
another type `U`. In this example, we test whether `boolean` is a supertype of `true`:

We apply `IsSupertypeOf` to `true` and `boolean` respectively using the `$`
type-level applicator. This checks whether `boolean` is a supertype of `true`:

```ts
import { $, Conditional } from "hkt-toolbelt";

type Result = $<$<Conditional.IsSupertypeOf, true>, boolean>; // true
```


In the following examples, we test whether a number is a supertype of a string:

```ts
import { $, Conditional } from "hkt-toolbelt";

type Result = $<$<Conditional.Extends, number>, string>; // false
```

TypeScript does not provide a native keyword like `extends` that can be used to
perform a supertype check. While `extends` can only be used in a
conditional type, `IsSupertypeOf` is composable, so it can be used in more
sophisticated type-level functions.
 


## Utility: Conditional.NotEquals

`NotEquals` is a type-level function that returns `true` if `T` and `U` are
not equal. Otherwise, it returns `false`.

| Argument name | Type | Description |
| -- | -- | -- |
| T | `any` | The first type to compare. |
| U | `any` | The second type to compare. |


```ts
import { $, Conditional } from 'hkt-toolbelt'

type Result = $<Conditional.NotEquals, "foo", "bar"> // true
```
 


# Module: Digit

The `Digit` module contains various utilities for working with decimal digits
(0-9). Digits are used in various contexts, such as representing numbers.


```ts
import { $, Digit } from 'hkt-toolbelt'

type Result = $<$<Digit.Add, 1>, 2> // 3
```
 

| Utility name | Description |
| -- | -- |
  | [AddTens](#utility-digitaddtens) | `AddTens` is a type-level function that takes two decimal digit types, `A` and `B`, adds them together, and returns the resultant tens digit. |
  | [Add](#utility-digitadd) | `Add` is a type-level function that takes two decimal digit types, `A` and `B`, adds them together (excluding the carry-over), and returns the resulting digit type. |
  | [Compare](#utility-digitcompare) | `Compare` is a type-level function that takes two decimal digit types, `A` and `B`, compares their magnitudes, and returns the corresponding result {-1, 0, or 1}. |
  | [DecrementTens](#utility-digitdecrementtens) | `DecrementTens` is a type-level function that takes a single decimal digit type `A` and determines whether the tens digit should be decremented during a subtraction operation. |
  | [Decrement](#utility-digitdecrement) | `Decrement` is a type-level function which takes in a required `Digit.Digit`, and returns the preceding digit. The preceding digit is the digit immediately before the provided digit in the sequence "0, 1, 2, 3, 4, 5, 6, 7, 8, 9". |
  | [Digit](#utility-digitdigit) | `Digit` is a type alias that represents a single decimal digit in the range from "0" to "9" (inclusive). Each decimal digit is represented as a string literal type. This type is particularly useful when working with type-level numerical operations or string manipulation involving numbers. |
  | [IncrementTens](#utility-digitincrementtens) | `IncrementTens` is a type-level function that takes a digit type `A` as input and returns the tens place increment for that digit. |
  | [Increment](#utility-digitincrement) | `Increment` is a type-level function that takes in a digit type `A` and returns the next digit in the sequence. If the input digit is "9", the function returns "0". |
  | [MultiplyTens](#utility-digitmultiplytens) | `MultiplyTens` is a type-level function that takes in two single-digit types, `A` and `B`, and returns the tens place of the product of `A` and `B`. |
  | [Multiply](#utility-digitmultiply) | `Multiply` is a type-level function that takes in two digit types, `A` and `B`, and returns the result of multiplying `A` by `B`, modulo 10. The result is a single digit type. |
  | [SubtractTens](#utility-digitsubtracttens) | `SubtractTens` is a type-level function that takes in two digit types, `A` and `B`, and returns the result of subtracting `B` from `A` in the tens place. If `B` is greater than `A`, the result is 1. |
  | [Subtract](#utility-digitsubtract) | `Subtract` is a type-level function that takes in two digit types, `A` and `B`, and returns the digit result of subtracting `B` from `A`. |
  | [Zero](#utility-digitzero) | `Zero` is a type representing the digit zero ("0"). It is a subtype of the `Digit` type, and can be used in various arithmetic operations and comparisons provided by the `DigitList` and `NaturalNumber` namespaces. |


## Utility: Digit.AddTens

`AddTens` is a type-level function that takes two decimal digit types,
`A` and `B`, adds them together, and returns the resultant tens digit.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Digit` | A one-character decimal digit type. |
| B | `Digit` | A one-character decimal digit type. |


For example, using the `hkt-toolbelt` `$` type-level applicator,
we apply `AddTens` to the digits `5` and `7`:

```ts
import { Kind, $, Digit } from "hkt-toolbelt";

type Result = $<$<Digit.AddTens, "5">, "7">; // "1"
```
 


## Utility: Digit.Add

`Add` is a type-level function that takes two decimal digit types,
`A` and `B`, adds them together (excluding the carry-over), and returns
the resulting digit type.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Digit` | A one-character decimal digit type. |
| B | `Digit` | A one-character decimal digit type. |


For example, using the `hkt-toolbelt` `$` type-level applicator,
we apply `Add` to the digits `7` and `4`:

```ts
import { Kind, $, Digit } from "hkt-toolbelt";

type Result = $<$<Digit.Add, "7">, "4">; // "1"
```
 


## Utility: Digit.Compare

`Compare` is a type-level function that takes two decimal digit types, `A`
and `B`, compares their magnitudes, and returns the corresponding result
{-1, 0, or 1}.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Digit` | A one-character decimal digit type. |
| B | `Digit` | A one-character decimal digit type. |


For example, we can use the `$` type-level applicator to apply `Compare` to
two digits. In this example, we compare the digits `7` and `4`.

```ts
import { Kind, $, Digit } from "hkt-toolbelt"

type Result = $<$<Digit.Compare, "7">, "4"> // 1
```
 


## Utility: Digit.DecrementTens

`DecrementTens` is a type-level function that takes a single decimal digit
type `A` and determines whether the tens digit should be decremented
during a subtraction operation.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Digit` | A one-character decimal digit type. |


For example, using the `hkt-toolbelt` `$` type-level applicator, we apply
`DecrementTens` to the digit `4`:

```ts
import { $, Digit } from "hkt-toolbelt"

type Result = $<Digit.DecrementTens, "4"> // "0"
```
 


## Utility: Digit.Decrement

`Decrement` is a type-level function which takes in a required `Digit.Digit`,
and returns the preceding digit. The preceding digit is the digit immediately
before the provided digit in the sequence "0, 1, 2, 3, 4, 5, 6, 7, 8, 9".

We apply `Decrement` to a digit using the `$` type-level applicator.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Digit` | A single-digit type which represents a digit from "0" to "9". |


For example, if we want to subtract one from the digit "5", we would use
this type-level function as follows:

```ts
import { $, Digit } from 'hkt-toolbelt';

type Result = $<Digit.Decrement, '5'> // "4"
```
 


## Utility: Digit.Digit

`Digit` is a type alias that represents a single decimal digit in the range
from "0" to "9" (inclusive). Each decimal digit is represented as a string
literal type. This type is particularly useful when working with
type-level numerical operations or string manipulation involving numbers.




## Utility: Digit.IncrementTens

`IncrementTens` is a type-level function that takes a digit type `A` as
input and returns the tens place increment for that digit.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Digit` | A digit type. |


We apply `IncrementTens` to a digit using the `$` type-level applicator:

```ts
import { $, Digit } from "hkt-toolbelt";

type Result = $<Digit.IncrementTens, "9">; // "1"
```
 


## Utility: Digit.Increment

`Increment` is a type-level function that takes in a digit type `A` and
returns the next digit in the sequence. If the input digit is "9", the
function returns "0".

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Digit` | A digit type. |


For example, we can use `Increment` to increment a digit type:

We apply `Increment` to a digit type using the `$` type-level applicator:

```ts
import { $, Digit } from "hkt-toolbelt"

type Result = $<Digit.Increment, "3"> // "4"
```
 


## Utility: Digit.MultiplyTens

`MultiplyTens` is a type-level function that takes in two single-digit
types, `A` and `B`, and returns the tens place of the product of `A` and `B`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Digit` | A single-digit type. |
| B | `Digit` | A single-digit type. |


For example, we can use `MultiplyTens` to compute the tens place of the
product of two single-digit types:

We apply `MultiplyTens` to `"5"` and `"4"` respectively using the `$`
type-level applicator:

```ts
import { $, Digit } from "hkt-toolbelt"

type Result = $<$<Digit.MultiplyTens, "5">, "4"> // "2"
```
 


## Utility: Digit.Multiply

`Multiply` is a type-level function that takes in two digit types, `A` and
`B`, and returns the result of multiplying `A` by `B`, modulo 10. The result
is a single digit type.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Digit` | A digit type, the multiplier. |
| B | `Digit` | A digit type, the multiplicand. |


For example, we can use `Multiply` to multiply two digit types. In this
example, `2` and `3` are passed as type arguments to the type-level function:

We apply `Multiply` to `2` and `3` respectively using the `$` type-level
applicator:

```ts
import { $, Digit } from "hkt-toolbelt"

type Result = $<$<Digit.Multiply, "2">, "3"> // "6"
```
 


## Utility: Digit.SubtractTens

`SubtractTens` is a type-level function that takes in two digit types, `A`
and `B`, and returns the result of subtracting `B` from `A` in the tens
place. If `B` is greater than `A`, the result is 1.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Digit` | A digit type, the minuend. |
| B | `Digit` | A digit type, the subtrahend. |


For example, we can use `SubtractTens` to subtract two digit types in the
tens place:

We apply `SubtractTens` to `"2"` and `"9"` respectively using the `$`
type-level applicator:

```ts
import { $, Digit } from "hkt-toolbelt"

type Result = $<$<Digit.SubtractTens, "2">, "9"> // "1"
```
 


## Utility: Digit.Subtract

`Subtract` is a type-level function that takes in two digit types, `A` and
`B`, and returns the digit result of subtracting `B` from `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Digit` | A digit type, the minuend. |
| B | `Digit` | A digit type, the subtrahend. |


For example, we can use `Subtract` to subtract two digit types. In this
example, "2" and "1" are passed as type arguments to the type-level function:

We apply `Subtract` to "2" and "1" respectively using the `$` type-level
applicator:

```ts
import { $, Digit } from "hkt-toolbelt"

type Result = $<$<Digit.Subtract, "2">, "1"> // "1"
```
 


## Utility: Digit.Zero

`Zero` is a type representing the digit zero ("0"). It is a subtype of the
`Digit` type, and can be used in various arithmetic operations and
comparisons provided by the `DigitList` and `NaturalNumber` namespaces.


For example, we can use `Zero` in arithmetic operations like addition:

```ts
import { $, Digit } from "hkt-toolbelt";

type Result = $<$<Digit.Add, Digit.Zero>, "2">; // "3"
```

In this example, we add `Zero` to the digit "1", and the result is a digit
list containing the digit "1".
 


# Module: DigitList

The `DigitList` module contains various utilities for working with digit
lists. Digit lists are a type-level representation of lists of decimal digits
(0-9). They are used in various contexts, such as representing numbers.


```ts
import { $, DigitList } from 'hkt-toolbelt'

type Result = $<$<DigitList.Add, ["1", "2", "3"]>, ["4", "5", "6"]> // ["5", "7", "9"]
```
 

| Utility name | Description |
| -- | -- |
  | [Add](#utility-digitlistadd) | `Add` is a type-level function that takes in two digit lists `A` and `B`, and returns the sum of the two digit lists as a new digit list. |
  | [Compare](#utility-digitlistcompare) | `Compare` is a type-level function that takes in two digit lists `A` and `B`, and returns the comparison result as a number type. The result will be 1 if `A` is greater than `B`, 0 if `A` is equal to `B`, and -1 if `A` is less than `B`. |
  | [Decrement](#utility-digitlistdecrement) | `Decrement` is a type-level function that takes in a digit list `A` and returns a new digit list representing the result of decrementing the input digit list by 1. If the input digit list is empty or represents zero, the result will be a digit list representing zero. |
  | [DigitList](#utility-digitlistdigitlist) | `DigitList` is a type alias representing a list of decimal digits from "0" to "9" (inclusive). |
  | [DivideBySubtraction](#utility-digitlistdividebysubtraction) | `DivideBySubtraction` is a type-level function that performs a division by subtraction. It returns the result of the division. |
  | [Divide](#utility-digitlistdivide) | `Divide` is a type-level function that performs a division operation. It returns the result of the division operation. |
  | [First](#utility-digitlistfirst) | `First` is a type-level function that returns the first digit of a digit list. It returns the first digit of the digit list. If the list is empty, it returns ["0"]. |
  | [FromString](#utility-digitlistfromstring) | `FromString` is a type-level function that converts a string into a digit list and trims leading zeros. It returns a digit list from a string. |
  | [Increment](#utility-digitlistincrement) | `Increment` is a type-level function that increments a digit list. It returns the incremented digit list. |
  | [IsEven](#utility-digitlistiseven) | `IsEven` is a type-level function that checks if a digit list is even. It returns `true` if the digit list is even, `false` otherwise. |
  | [IsOdd](#utility-digitlistisodd) | `IsOdd` is a type-level function that checks if a digit list is odd. It returns a function that takes a digit list as a parameter and returns `true` if the digit list is odd, `false` otherwise. |
  | [Last](#utility-digitlistlast) | `Last` is a type-level function that gets the last digit of a digit list. It returns the last digit of the digit list. If the list is empty, it returns "0". |
  | [Modulo](#utility-digitlistmodulo) | `Modulo` is a type-level function that calculates the modulo of two digit lists. Returns the result of the modulo operation. |
  | [MultiplyDigit](#utility-digitlistmultiplydigit) | `MultiplyDigit` is a type-level function that multiplies a digit list by a single digit. |
  | [Multiply](#utility-digitlistmultiply) | `Multiply` is a type-level function that multiplies a digit list by another digit list. It returns the result of the multiplication operation. |
  | [Pop](#utility-digitlistpop) | `Pop` is a type-level function that removes the last digit from a digit list. It returns the digit list after the last digit has been removed. This may result in a completely empty digit list, which is semantically equivalent to the number zero. |
  | [Shift](#utility-digitlistshift) | `Shift` is a type-level function that removes the first digit from a digit list. It returns the result of the shift operation. |
  | [Subtract](#utility-digitlistsubtract) | `Subtract` is a type-level function that subtracts one digit list from another. It returns the result of the subtraction. |
  | [ToNumber](#utility-digitlisttonumber) | `ToNumber` is a type-level function that represents a function to convert a digit list to a number. It returns the number from the digit list. |
  | [ToString](#utility-digitlisttostring) | `ToString` is a type-level function that converts a digit list to a string. It returns the string representation of the digit list. |
  | [TrimRight](#utility-digitlisttrimright) | `TrimRight` is a type-level function that trims trailing zeros from a digit list. It returns the trimmed digit list. |
  | [Trim](#utility-digitlisttrim) | `Trim` is a type-level function that trims leading zeros from a digit list. It returns the trimmed digit list. |


## Utility: DigitList.Add

`Add` is a type-level function that takes in two digit lists `A` and `B`,
and returns the sum of the two digit lists as a new digit list.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | A digit list. |
| B |  | A digit list. |


For example, we can use `Add` to add two digit lists representing the
numbers 123 and 456:

We apply `Add` to `["1", "2", "3"]` and `["4", "5", "6"]` respectively using
the `$` type-level applicator:

```ts
import { $, DigitList } from "hkt-toolbelt"

type Result = $<$<DigitList.Add, ["1", "2", "3"]>, ["4", "5", "6"]> // ["5",
"7", "9"]
```
 


## Utility: DigitList.Compare

`Compare` is a type-level function that takes in two digit lists `A` and
`B`, and returns the comparison result as a number type. The result will be
1 if `A` is greater than `B`, 0 if `A` is equal to `B`, and -1 if `A` is
less than `B`.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | A digit list type. |
| B |  | A digit list type. |



For example, we can use the `$` type-level applicator to apply `Compare` to
two digit lists.

In this example, we compare the digit lists ["1", "2", "3"] and ["3", "2",
"1"]:

```ts
import { $, DigitList } from "hkt-toolbelt"

type Result = $<$<DigitList.Compare, ["1", "2", "3"]>, ["3", "2", "1"]> // -1
```
 


## Utility: DigitList.Decrement

`Decrement` is a type-level function that takes in a digit list `A` and
returns a new digit list representing the result of decrementing the input
digit list by 1. If the input digit list is empty or represents zero, the
result will be a digit list representing zero.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | A digit list type. |


For example, we can use `Decrement` to decrement a digit list representing
the number 42 by 1. In this example, the digit list `["4", "2"]` is passed as
a type argument to the type-level function:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result = $<DigitList.Decrement, ["4", "2"]>; // ["4", "1"]
```


We can also use `Decrement` with an empty digit list or a digit list
representing zero. In both cases, the result will be a digit list
representing zero:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result1 = $<DigitList.Decrement, []>; // ["0"]
type Result2 = $<DigitList.Decrement, ["0"]>; // ["0"]
```
 


## Utility: DigitList.DigitList

`DigitList` is a type alias representing a list of decimal digits from "0"
to "9" (inclusive).


For example, we can use `DigitList` to represent a list of decimal digits from "0" to "9":

```ts
import { DigitList } from "hkt-toolbelt";

type MyDigitList = DigitList; // ("0" | "1" | "2" | ... | "9")[]
```
 


## Utility: DigitList.DivideBySubtraction

`DivideBySubtraction` is a type-level function that performs a division by subtraction.
It returns the result of the division.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | A digit list representing a number to divide. |
| B |  | A digit list representing a number to divide by. |


For example, we can use `DivideBySubtraction` to divide a digit list representing the number 10 by 2:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result = $<$<DigitList.DivideBySubtraction, ["1", "0"]>, ["2"]>; // ["5"] quotient is 5, and the remainder is 0.
```
 


## Utility: DigitList.Divide

`Divide` is a type-level function that performs a division operation.
It returns the result of the division operation.


For example, we can use `Divide` to create a division operation that divides a digit list representing the number 10 by 2:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result = $<$<DigitList.Divide, ["1", "0"]>, ["2"]>; // ["5"]
```

In this example, `Result` is a type that represents the digit list ["5"], which is the result of dividing 10 by 2.
 


## Utility: DigitList.First

`First` is a type-level function that returns the first digit of a digit list.
It returns the first digit of the digit list. If the list is empty, it returns ["0"].


For example, we can use `First` to get the first digit of a digit list representing the number 12:

```ts
import { $, DigitList, Type } from "hkt-toolbelt";

type Result = $<DigitList.First, ["1", "2"]>; // "1"
```

In this example, `Result` is a type that represents the digit "1", which is the first digit of the digit list ["1", "2"].
 


## Utility: DigitList.FromString

`FromString` is a type-level function that converts a string into a digit list and trims leading zeros.
It returns a digit list from a string.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | The string to be converted into a digit list. |


For example, we can use `FromString` to convert a string into a digit list:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result = $<DigitList.FromString, "123">; // ["1", "2", "3"]
```


Also we can use `FromString` to convert a string into a digit list and trim leading zeros.

```ts
import { $, DigitList, Type } from "hkt-toolbelt";

type Result = $<DigitList.FromString, "00123">; // ["1", "2", "3"]
```
 


## Utility: DigitList.Increment

`Increment` is a type-level function that increments a digit list.
It returns the incremented digit list.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | The digit list to increment. |


For example, we can use `Increment` to increment a digit list:

```ts
import { $, DigitList, Type } from "hkt-toolbelt";

type Result = $<DigitList.Increment, ["1", "0"]>; // ["1", "1"]
```

In this example, `Result` is a type that represents the digit list ["1", "1"], which is the result of incrementing the digit list ["1", "0"].
 


## Utility: DigitList.IsEven

`IsEven` is a type-level function that checks if a digit list is even.
It returns `true` if the digit list is even, `false` otherwise.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The digit list to check. |


For example, we can use `IsEven` to check if a digit list is even:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result = $<DigitList.IsEven, ["1", "0"]>; // true
```

In this example, `Result` is a type that represents `true`, which indicates that the digit list ["1", "0"] is even.
 


## Utility: DigitList.IsOdd

`IsOdd` is a type-level function that checks if a digit list is odd.
It returns a function that takes a digit list as a parameter and returns `true` if the digit list is odd, `false` otherwise.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The digit list to check. |


For example, we can use `IsOdd` to check if a digit list is odd:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result = $<DigitList.IsOdd, ["1", "0"]>; // false
```

In this example, `Result` is a type that represents `false`, which indicates that the digit list ["1", "0"] is not odd.
 


## Utility: DigitList.Last

`Last` is a type-level function that gets the last digit of a digit list.
It returns the last digit of the digit list. If the list is empty, it returns "0".

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | The digit list to get the last digit from. |


For example, we can use `Last` to get the last digit of a digit list:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result = $<DigitList.Last, ["1", "2", "3"]>; // "3"
```

In this example, `Result` is a type that represents "3", which is the last digit of the digit list ["1", "2", "3"].
 


## Utility: DigitList.Modulo

`Modulo` is a type-level function that calculates the modulo of two digit lists.
Returns the result of the modulo operation.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | The first digit list. |
| B |  | The second digit list. |


For example, we can use `Modulo` to calculate the modulo of two digit lists:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result = $<$<DigitList.Modulo, ["1", "0"]>, ["3"]>; // ["1"]
```

In this example, `Result` is a type that represents ["1"], which is the modulo of the division of ["1", "0"] by ["3"].
 


## Utility: DigitList.MultiplyDigit

`MultiplyDigit` is a type-level function that multiplies a digit list by a
single digit.

Returns the result of the multiplication operation.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | The digit list. |
| B |  | The single digit. |


For example, we can use `MultiplyDigit` to multiply a digit list by a single
digit:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result = $<$<DigitList.MultiplyDigit, "2">, ["3"]>; // ["6"]
```

In this example, `Result` is a type that represents ["6"], which is the
result of multiplying ["3"] by "2".
 


## Utility: DigitList.Multiply

`Multiply` is a type-level function that multiplies a digit list by another digit list.
It returns the result of the multiplication operation.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | The digit list. |
| B |  | The single digit. |


For example, we can use `Multiply` to multiply a digit list ["4", "2"] by another digit list ["1", "2"]:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Is504 = $<$<DigitList.Multiply, ["1", "2"]>, ["4", "2"]>; // ["5", "0", "4"]
```


If one of the inputs is an empty digit list or the zero digit, the result will be the zero digit.

```ts
import { DigitList } from "hkt-toolbelt";

type IsZero = $<$<DigitList.Multiply, []>, ["4", "2"]>; // ["0"]
type IsZero2 = $<$<DigitList.Multiply, ["0"], ["4", "2"]>; // ["0"]
```
 


## Utility: DigitList.Pop

`Pop` is a type-level function that removes the last digit from a digit list.
It returns the digit list after the last digit has been removed. This may
result in a completely empty digit list, which is semantically equivalent to
the number zero.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | The digit list. |


For example, we can use `Pop` to remove the last digit from a digit list:

```ts
import { $, DigitList, Type } from "hkt-toolbelt";

type Result = $<DigitList.Pop, ["1", "2", "3"]>; // ["1", "2"]
```

In this example, `Result` is a type that represents ["1", "2"], which is the result of removing the last digit from ["1", "2", "3"].
 


## Utility: DigitList.Shift

`Shift` is a type-level function that removes the first digit from a digit list.
It returns the result of the shift operation.


For example, we can use `Shift` to remove the first digit from a digit list:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result = $<DigitList.Shift, ["1", "2", "3"]>; // ["2", "3"]
```

In this example, `Result` is a type that represents ["2", "3"], which is the result of removing the first digit from ["1", "2", "3"].
 


## Utility: DigitList.Subtract

`Subtract` is a type-level function that subtracts one digit list from
another. It returns the result of the subtraction.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | A digit list representing a number to subtract. |
| B |  | A digit list representing a number to subtract by. |


For example, we can use `Subtract` to subtract one digit list from another:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result = $<DigitList.Subtract, ["5", "0"], ["2", "5"]>; // ["2", "5"]
```

In this example, `Result` is a type that represents ["2", "5"], which is the
result of subtracting ["2", "5"] from ["5", "0"].
 


## Utility: DigitList.ToNumber

`ToNumber` is a type-level function that represents a function to convert a digit list to a number.
It returns the number from the digit list.

| Argument name | Type | Description |
| -- | -- | -- |
| x |  | A digit list to convert to a number. |


For example, we can use `ToNumber` to convert a digit list to a number:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result = $<DigitList.ToNumber, ["5", "0", "2"]>; // 502
```

In this example, `Result` is a type that represents the number 502, which is the result of converting the digit list ["5", "0", "2"] to a number.
 


## Utility: DigitList.ToString

`ToString` is a type-level function that converts a digit list to a string.
It returns the string representation of the digit list.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | A digit list to convert to a string. |


For example, we can use `ToString` to convert a digit list to a string:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result = $<DigitList.ToString, ["5", "0", "2"]>; // "502"
```

In this example, `Result` is a type that represents the string "502", which is the result of converting the digit list ["5", "0", "2"] to a string.
 


## Utility: DigitList.TrimRight

`TrimRight` is a type-level function that trims trailing zeros from a digit list.
It returns the trimmed digit list.

| Argument name | Type | Description |
| -- | -- | -- |
| x |  | A digit list to trim trailing zeros from. |


For example, we can use `TrimRight` to trim trailing zeros from a digit list:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result = $<DigitList.TrimRight, ["3", "0", "0"]>; // ["3"]
```
 


## Utility: DigitList.Trim

`Trim` is a type-level function that trims leading zeros from a digit list.
It returns the trimmed digit list.

| Argument name | Type | Description |
| -- | -- | -- |
| x |  | A digit list to trim leading zeros from. |


For example, we can use `Trim` to trim leading zeros from a digit list:

```ts
import { $, DigitList } from "hkt-toolbelt";

type Result = $<DigitList.Trim, ["0", "5", "0", "2"]>; // ["5", "0", "2"]
```

In this example, `Result` is a type that represents the digit list ["5", "0", "2"], which is the result of trimming the leading zeros from the digit list ["0", "5", "0", "2"].
 


# Module: Function

The `Function` module contains various utilities for working with function
types. Function types are used in various contexts, such as representing
higher-order functions.


```ts
import { $, Function } from 'hkt-toolbelt'

type Result = $<$<Function.ReturnType, (x: number) => string>, 42> // string
```
 

| Utility name | Description |
| -- | -- |
  | [Constant](#utility-functionconstant) | `Constant` is a type-level function that constructs a type-level function which always returns the given value, regardless of input. |
  | [Function](#utility-functionfunction) | `Function` is the top type (supertype) of all function types in TypeScript. |
  | [Identity](#utility-functionidentity) | `Identity` is a type-level utility that returns its input type unchanged. |
  | [ReturnType](#utility-functionreturntype) | `ReturnType` extracts the return type of a function type. |


## Utility: Function.Constant

`Constant` is a type-level function that constructs a type-level function
which always returns the given value, regardless of input.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The constant value to return. |

@returns The configured constant value T.



```ts
import { $, Function } from 'hkt-toolbelt'

// Returns 'foo' regardless of input
type C = $<$<Function.Constant, 'foo'>, 0> // 'foo'
type D = $<$<Function.Constant, 'foo'>, 'bar'> // 'foo'
```
 


## Utility: Function.Function

`Function` is the top type (supertype) of all function types in TypeScript.

It specifies `never[]` as the parameter types because:

1. Parameters are contravariant, so for a function A to be assignable to B,
   the parameters of B must be assignable to the parameters of A.

2. We want every other function to be assignable to `Function`, i.e. be a
   subtype of Function.

3. `never` is the only type assignable to all other types. It is the bottom
   type (subtype) of all types.

So by using `never[]` parameters, `Function` becomes assignable from any
other function type, making it the top type.




## Utility: Function.Identity

`Identity` is a type-level utility that returns its input type unchanged.

It acts as the "identity" function at the type level.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The input type to return unchanged |

@returns The input value x, unchanged


```ts
import { $, Function } from 'hkt-toolbelt'

// Returns 'foo'
type R = $<Function.Identity, 'foo'>
```

The `Identity` utility is often useful for disabling side effects of
other types within a pipeline.
 


## Utility: Function.ReturnType

`ReturnType` extracts the return type of a function type.

| Argument name | Type | Description |
| -- | -- | -- |
| x |  | A function type |


```ts
import { $ } from 'hkt-toolbelt'

type Fn = (a: number) => string

type R = $<ReturnType, Fn> // string
```

This utility can be useful for extracting the return type of a function without
having to call it.
 


# Module: Integer

The `Integer` module contains various utilities for working with integer
types, i.e. signed and unsigned integers.


```ts
import { $, Integer } from 'hkt-toolbelt'

type Result = $<$<Integer.Add, 1>, -2> // -1
```
 

| Utility name | Description |
| -- | -- |
  | [Add](#utility-integeradd) | `Add` is a type-level function that takes in two integers `A` and `B`, and returns the sum of the two integers. |
  | [Compare](#utility-integercompare) | `Compare` is a type-level function that takes in two integer types `A` and `B`, and returns the comparison result as an integer type. The result will be 1 if `A` is greater than `B`, 0 if `A` is equal to `B`, and -1 if `A` is less than `B`. |
  | [Decrement](#utility-integerdecrement) | `Decrement` is a type-level function that decrements an integer type. It returns the decremented integer. |
  | [DivideBy](#utility-integerdivideby) | `DivideBy` is a type-level function that takes in two integer types, `A` and `B`, and returns the result of dividing `B` by `A`. |
  | [Divide](#utility-integerdivide) | `Divide` is a type-level function that takes in two integers and performs a division operation. It returns the result of the division operation. |
  | [Increment](#utility-integerincrement) | `Increment` is a type-level function that increments an integer type. It returns the incremented integer. |
  | [IsEven](#utility-integeriseven) | `IsEven` is a type-level function that takes in an integer type, `A`, and returns a boolean indicating whether `A` is an even number |
  | [IsGreaterThanOrEqual](#utility-integerisgreaterthanorequal) | `IsGreaterThanOrEqual` is a type-level function that takes in two integer types, `A` and `B`, and returns a boolean indicating whether `B` is greater than or equal to `A`. |
  | [IsGreaterThan](#utility-integerisgreaterthan) | `IsGreaterThan` is a type-level function that takes in two integer types, `A` and `B`, and returns a boolean indicating whether `B` is greater than `A`. |
  | [IsLessThanOrEqual](#utility-integerislessthanorequal) | `IsLessThanOrEqual` is a type-level function that takes in two integer types, `A` and `B`, and returns a boolean indicating whether `B` is less than or equal to `A`. |
  | [IsLessThan](#utility-integerislessthan) | `IsLessThan` is a type-level function that takes in two integer types, `A` and `B`, and returns a boolean indicating whether `B` is less than `A`. |
  | [IsOdd](#utility-integerisodd) | `IsOdd` is a type-level function that takes in an integer type, `A`, and returns a boolean indicating whether `A` is an odd number |
  | [ModuloBy](#utility-integermoduloby) | `ModuloBy` is a type-level function that takes in two integer types, `A` and `B`, and returns the floored modulo of `B` divided by `A`. |
  | [Modulo](#utility-integermodulo) | `Modulo` is a type-level function that takes in two natural number types, `A` and `B`, and returns the floored modulo of `A` divided by `B`. |
  | [Multiply](#utility-integermultiply) | `Multiply` is a type-level function that multiplies an integer by another integer. It returns the result of the multiplication operation. |
  | [RemainderBy](#utility-integerremainderby) | `RemainderBy` is a type-level function that takes in two integer types, `A` and `B`, and returns the remainder of `B` divided by `A`. |
  | [Remainder](#utility-integerremainder) | `Remainder` is a type-level function that takes in two integer types, `A` and `B`, and returns the remainder of `A` divided by `B`. |
  | [SubtractBy](#utility-integersubtractby) | `SubtractBy` is a type-level function that takes in two integer types, `A` and `B`, and returns the result of subtracting `A` from `B`. |
  | [Subtract](#utility-integersubtract) | `Subtract` is a type-level function that subtracts one integer from another. It returns the result of the subtraction. |


## Utility: Integer.Add

`Add` is a type-level function that takes in two integers `A` and `B`,
and returns the sum of the two integers.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | An integer. |
| B | `Number.Number` | An integer. |

If one or more of the inputs is not an integer, an error is emitted.


For example, we can use `Add` to add the two integers -123 and 456:

We apply `Add` to -123 and 456 respectively using
the `$` type-level applicator:

```ts
import { $, Integer } from "hkt-toolbelt"

type Result = $<$<Integer.Add, -123>, 456> // 333
```


If one of the inputs is not a natural number, `never` is returned.

```ts
import { Integer } from "hkt-toolbelt";

type IsNever = $<Integer.Add, -42.42>; // never
```
 


## Utility: Integer.Compare

`Compare` is a type-level function that takes in
two integer types `A` and `B`, and returns the comparison result as an integer type.
The result will be 1 if `A` is greater than `B`,
0 if `A` is equal to `B`, and -1 if `A` is less than `B`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | An integer type. |
| B | `Number.Number` | An integer type. |


For example, we can use `Compare` to compare two integers.

```ts
import { $, Integer } from "hkt-toolbelt";

type Result1 = $<$<Integer.Compare, 123>, -321>; // 1
type Result2 = $<$<Integer.Compare, -123>, 321>; // -1
```
 


## Utility: Integer.Decrement

`Decrement` is a type-level function that decrements an integer type.
It returns the decremented integer.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | - The integer to decrement. |

If the input is not an integer, `never` is returned.


For example, we can use `Decrement` to decrement an integer:

```ts
import { $, Integer, Type } from "hkt-toolbelt";

type Result = $<Integer.Decrement, 0>; // -1
```


If the input is not an integer, `never` is returned.

```ts
import { Integer } from "hkt-toolbelt";

type IsNever = $<Integer.Decrement, -42.42>; // never
```
 


## Utility: Integer.DivideBy

`DivideBy` is a type-level function that takes in two integer types,
`A` and `B`, and returns the result of dividing `B` by `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | An integer to divide by. |
| B | `Number.Number` | An integer to be divided. |

The parameters are reversed from `Divide`. This is useful for partial
application, i.e. to test divisibility.


For example, we can apply `DivideBy` to the type argument 3 using the `$` type-level applicator,
and evaluate the results of dividing multiple integers by 3.

```ts
import { $, Integer } from "hkt-toolbelt";

type DivideByThree = $<Integer.DivideBy, 3>;

type Result1 = $<DivideByThree, 4>; // 1
type Result2 = $<DivideByThree, -4>; // -1
```


If one of the inputs is not an integer, `never` is returned.

```ts
import { $, Integer } from "hkt-toolbelt";

type IsNever = $<Integer.DivideBy, -42.42>; // never
```
 


## Utility: Integer.Divide

`Divide` is a type-level function that takes in two integers and performs a division operation.
It returns the result of the division operation.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | An integer to divide. |
| B | `Number.Number` | An integer to divide by. |

If `A` is not a multiple of `B`, the quotient is returned and the remainder is thrown away.
The quotient is truncated towards zero. That is, `-1/2` is evaluated to be 0, not -1.

If either input is not a integer, `never` is returned.


For example, we can use `Divide` to create a division operation that divides 10 by -2:

```ts
import { $, Integer } from "hkt-toolbelt";

type Result = $<$<Integer.Divide, 10>, -2>; // -5
```


If `A` is not a multiple of `B`, the result is truncated towards zero,
and only the quotient is returned.

```ts
import { $, Integer } from "hkt-toolbelt";

type Result = $<$<Integer.Divide, -100>, 99>; // -1
```


If one of the inputs is not a integer, `never` is returned.

```ts
import { $, Integer } from "hkt-toolbelt";

type IsNever = $<Integer.Divide, -42.42>; // never
```
 


## Utility: Integer.Increment

`Increment` is a type-level function that increments an integer type.
It returns the incremented integer.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | - The integer to increment. |

If the input is not an integer, `never` is returned.


For example, we can use `Increment` to increment an integer:

```ts
import { $, Integer, Type } from "hkt-toolbelt";

type Result = $<Integer.Increment, -10>; // -9
```


If the input is not an integer, `never` is returned.

```ts
import { Integer } from "hkt-toolbelt";

type IsNever = $<Integer.Increment, -42.42>; // never
```
 


## Utility: Integer.IsEven

`IsEven` is a type-level function that takes in an integer type,
`A`, and returns a boolean indicating whether `A` is an even number

@template {Number.Number} A - An integer type.
@returns {boolean}
 


## Utility: Integer.IsGreaterThanOrEqual

`IsGreaterThanOrEqual` is a type-level function that takes in two integer
types, `A` and `B`, and returns a boolean indicating whether `B` is greater
than or equal to `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | An integer to compare against. |
| B | `Number.Number` | An integer to evaluate. |

The parameters are ordered such that `IsGreaterThanOrEqual` can be partially applied
in a coherent manner. That is, we can apply `IsGreaterThanOrEqual` to `3`, and have a
function `IsGreaterThanOrEqualToThree`.


For example, we can use `IsGreaterThanOrEqual` to determine whether an integer is
less than or equal to another integer. In this example, `-3` and `-2` are passed as
type arguments to the type-level function:

We apply `IsGreaterThanOrEqual` to `-3`, and then to `-2` respectively using the `$`
type-level applicator:

```ts
import { $, Integer } from "hkt-toolbelt";

type Result = $<$<Integer.IsGreaterThanOrEqual, -3>, -2>; // true
```


If we apply `IsGreaterThanOrEqual` to `-3` and `-3`, we should expect to get `true`.

```ts
import { $, Integer } from "hkt-toolbelt";

type Result = $<$<Integer.IsGreaterThanOrEqual, -3>, -3>; // true
```


If we apply `IsGreaterThanOrEqual` to `-3` and `-4`, we should also expect to get
`false`.

```ts
import { $, Integer } from "hkt-toolbelt";

type Result = $<$<Integer.IsGreaterThanOrEqual, -3>, -4>; // false
```
 


## Utility: Integer.IsGreaterThan

`IsGreaterThan` is a type-level function that takes in two integer
types, `A` and `B`, and returns a boolean indicating whether `B` is greater
than `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | An integer to compare against. |
| B | `Number.Number` | An integer to evaluate. |

The parameters are ordered such that `IsGreaterThan` can be partially applied
in a coherent manner. That is, we can apply `IsGreaterThan` to `3`, and have a
function `IsGreaterThanThree`.


For example, we can use `IsGreaterThan` to determine whether an integer is
greater than another integer. In this example, `-2` and `-3` are passed as
type arguments to the type-level function:

We apply `IsGreaterThan` to `-3`, and then to `-2` respectively using the `$`
type-level applicator:

```ts
import { $, Integer } from "hkt-toolbelt";

type Result = $<$<Integer.IsGreaterThan, -3>, -2>; // true
```


If we apply `IsGreaterThan` to `-3` and `-3`, we should expect to get `false`.

```ts
import { $, Integer } from "hkt-toolbelt";

type Result = $<$<Integer.IsGreaterThan, -3>, -3>; // false
```


If we apply `IsGreaterThan` to `-3` and `-4`, we should expect to get `false`.

```ts
import { $, Integer } from "hkt-toolbelt";

type Result = $<$<Integer.IsGreaterThan, -3>, -4>; // false
```
 


## Utility: Integer.IsLessThanOrEqual

`IsLessThanOrEqual` is a type-level function that takes in two integer
types, `A` and `B`, and returns a boolean indicating whether `B` is less
than or equal to `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | An integer to compare against. |
| B | `Number.Number` | An integer to evaluate. |

The parameters are ordered such that `IsLessThanOrEqual` can be partially applied
in a coherent manner. That is, we can apply `IsLessThanOrEqual` to `3`, and have a
function `IsLessThanOrEqualToThree`.


For example, we can use `IsLessThanOrEqual` to determine whether an integer is
less than or equal to another integer. In this example, `-3` and `-4` are passed as
type arguments to the type-level function:

We apply `IsLessThanOrEqual` to `-3`, and then to `-4` respectively using the `$`
type-level applicator:

```ts
import { $, Integer } from "hkt-toolbelt";

type Result = $<$<Integer.IsLessThanOrEqual, -3>, -4>; // true
```


If we apply `IsLessThanOrEqual` to `-3` and `-3`, we should expect to get `true`.

```ts
import { $, Integer } from "hkt-toolbelt";

type Result = $<$<Integer.IsLessThanOrEqual, -3>, -3>; // true
```


If we apply `IsLessThanOrEqual` to `-3` and `4`, we should also expect to get
`false`.

```ts
import { $, Integer } from "hkt-toolbelt";

type Result = $<$<Integer.IsLessThanOrEqual, -3>, 4>; // false
```
 


## Utility: Integer.IsLessThan

`IsLessThan` is a type-level function that takes in two integer
types, `A` and `B`, and returns a boolean indicating whether `B` is less
than `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | An integer to compare against. |
| B | `Number.Number` | An integer to compare. |

The parameters are ordered such that `IsLessThan` can be partially applied
in a coherent manner. That is, we can apply `IsLessThan` to `3`, and have a
function `IsLessThanThree`.


For example, we can use `IsLessThan` to determine whether an integer is
less than another integer. In this example, `-4` and `-3` are passed as
type arguments to the type-level function:

We apply `IsLessThan` to `-3`, and then to `-4` respectively using the `$`
type-level applicator:

```ts
import { $, Integer } from "hkt-toolbelt";

type Result = $<$<Integer.IsLessThan, -3>, -4>; // true
```


If we apply `IsLessThan` to `-3` and `-3`, we should expect to get `false`.

```ts
import { $, Integer } from "hkt-toolbelt";

type Result = $<$<Integer.IsLessThan, -3>, -3>; // false
```


If we apply `IsLessThan` to `-3` and `4`, we should expect to get `false`.

```ts
import { $, Integer } from "hkt-toolbelt";

type Result = $<$<Integer.IsLessThan, -3>, 4>; // false
```
 


## Utility: Integer.IsOdd

`IsOdd` is a type-level function that takes in an integer type,
`A`, and returns a boolean indicating whether `A` is an odd number

@template {Number.Number} A - An integer type.
@returns {boolean}
 


## Utility: Integer.ModuloBy

`ModuloBy` is a type-level function that takes in two integer types,
`A` and `B`, and returns the floored modulo of `B` divided by `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | An integer to divide by to calculate the modulo. |
| B | `Number.Number` | An integer type to be divided numerator. |

The parameters are reversed from `Modulo`. This is useful for partial
application, i.e. to test divisibility.


For example, we can use `ModuloBy` to determine the remainder
of an integer divided by another integer. In this example, `3` and `4`, `-4` are
passed as type arguments to the type-level function:

```ts
import { $, Integer } from "hkt-toolbelt";

type ModuloByThree = $<Integer.ModuloBy, 3>;

type Result = $<ModuloByThree, 4>; // 1
type Result = $<ModuloByThree, -4>; // 3
```
 


## Utility: Integer.Modulo

`Modulo` is a type-level function that takes in two natural number types,
`A` and `B`, and returns the floored modulo of `A` divided by `B`.

Modulo `k` is defined as `k := n - d * q` where `q` is the integer such that
`k` has the same sign as the divisor `d` while being as close to 0 as possible.

Modulo `k` is also equivalent to `k := ((n % d) + d) % d`,
where `%` is the remainder operator in javascript.

The sign of output `k` is always the same as the divisor `B`,
and the value of `k` is always within the range `-B < k < B`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | An integer to divide. |
| B | `Number.Number` | An integer to divide by. |


For example, we can use `Modulo` to determine the modulo of an integer
divided by another integer. In this example, `10`, `-10` and `3`, `-3` are
passed as type arguments to the type-level function:

We apply `Modulo` to `10` and `-10`, and then to `3` and `-3` respectively using the `$`
type-level applicator:

```ts
import { $, Integer } from "hkt-toolbelt";

type Result1 = $<$<Integer.Modulo, 10>, 3>; // 1
type Result2 = $<$<Integer.Modulo, 10>, -3>; // -2
type Result3 = $<$<Integer.Modulo, -10>, 3>; // 2
type Result4 = $<$<Integer.Modulo, -10>, -3>; // -1
```


Here we calculate the modulo of `123` or `-123` divided by `17` or `-17`:

```ts
import { $, Integer } from "hkt-toolbelt";

type Result1 = $<$<Integer.Modulo, 123>, 17>; // 4
type Result2 = $<$<Integer.Modulo, 123>, -17>; // -13
type Result3 = $<$<Integer.Modulo, -123>, 17>; // 13
type Result4 = $<$<Integer.Modulo, -123>, -17>; // -4
```
 


## Utility: Integer.Multiply

`Multiply` is a type-level function that multiplies an integer by another integer.
It returns the result of the multiplication operation.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | - An integer. |
| B | `Number.Number` | - An integer. |

If one or more of the inputs is not an integer, an error is emitted.


For example, we can use `Multiply` to multiply an integer 456 by another integer -123:

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Is504 = $<$<NaturalNumber.Multiply, -123>, 456>; // -56088
type Is504Str = $<$<NaturalNumber.Multiply, '-123'>, '456'>; // -56088
```


If one of the inputs is zero, the result will be zero.

```ts
import { NaturalNumber } from "hkt-toolbelt";

type IsZero = $<$<NaturalNumber.Multiply, 0>, 42>; // 0
```


If one of the inputs is not an integer, `never` is returned.

```ts
import { NaturalNumber } from "hkt-toolbelt";

type IsNever = $<NaturalNumber.Multiply, -42.42>; // never
```
 


## Utility: Integer.RemainderBy

`RemainderBy` is a type-level function that takes in two integer types,
`A` and `B`, and returns the remainder of `B` divided by `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | An integer to divide by to calculate the remainder. |
| B | `Number.Number` | The numerator. |

The parameters are reversed from `Remainder`. This is useful for partial
application, i.e. to test divisibility.


For example, we can use `RemainderBy` to determine the remainder
of an integer divided by another integer. In this example, `3` and `4`, `-4` are
passed as type arguments to the type-level function:

```ts
import { $, Integer } from "hkt-toolbelt";

type RemainderByThree = $<Integer.RemainderBy, 3>;

type Result1 = $<RemainderByThree, 4>; // 4 % 3 = 1
type Result2 = $<RemainderByThree, -4>; // -4 % 3 = -1
```
 


## Utility: Integer.Remainder

`Remainder` is a type-level function that takes in two integer types,
`A` and `B`, and returns the remainder of `A` divided by `B`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | An integer to divide. |
| B | `Number.Number` | An integer to divide by. |


For example, we can use `Remainder` to determine the remainder of an integer
divided by another integer. In this example, all four combinations of
`+/-3`, `+/-2` are passed as type arguments to the type-level function:

We apply `Remainder` to `+/-3`, and then to `+/-2` respectively using the `$`
type-level applicator:

```ts
import { $, Integer } from "hkt-toolbelt";

type Result1 = $<$<Integer.Remainder, 3>, 2>; // 1
type Result2 = $<$<Integer.Remainder, -3>, -2>; // 1
type Result3 = $<$<Integer.Remainder, 3>, -2>; // -1
type Result4 = $<$<Integer.Remainder, -3>, 2>; // -1
```


Here we calculate the remainder of `10` and `-10` divided by `3` and `-3`:

```ts
import { $, Integer } from "hkt-toolbelt";

type Result1 = $<$<Integer.Remainder, 10>, 3>; // 1
type Result2 = $<$<Integer.Remainder, -10>, -3>; // 1
type Result3 = $<$<Integer.Remainder, 10>, -3>; // -1
type Result4 = $<$<Integer.Remainder, -10>, 3>; // -1
```
 


## Utility: Integer.SubtractBy

`SubtractBy` is a type-level function that takes in two integer types,
`A` and `B`, and returns the result of subtracting `A` from `B`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | An integer to subtract by. |
| B | `Number.Number` | An integer to be subtracted from. |

The parameters are reversed from `Subtract`. This is useful for partial
application, i.e. to test divisibility.


For example, we can apply `SubtractBy` to the type argument 3 using the `$` type-level applicator,
and evaluate the results of subtracting multiple integers by 3.

```ts
import { $, Integer } from "hkt-toolbelt";

type SubtractByThree = $<Integer.SubtractBy, 3>;

type Result1 = $<SubtractByThree, 4>; // 1
type Result2 = $<SubtractByThree, -4>; // -7
```


If one of the inputs is not an integer, `never` is returned.

```ts
import { $, Integer } from "hkt-toolbelt";

type IsNever = $<Integer.SubtractBy, -42.42>; // never
```
 


## Utility: Integer.Subtract

`Subtract` is a type-level function that subtracts one integer from
another. It returns the result of the subtraction.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | An integer to subtract. |
| B | `Number.Number` | An integer to subtract by. |


For example, we can use `Subtract` to subtract one integer from another:

```ts
import { $, Integer } from "hkt-toolbelt";

type Result = $<$<Integer.Subtract, -50>, 25>; // -75
```


If one of the inputs is not a integer, `never` is returned.

```ts
import { $, Integer } from "hkt-toolbelt";

type IsNever = $<Integer.Subtract, -42.42>; // never
```
 


# Module: Kind

The `Kind` module contains various utilities for working with higher-kinded
types. Higher-kinded types are used in various contexts, such as representing
and manipulating higher-order functions, and composing types.


```ts
import { $, Kind } from 'hkt-toolbelt'

type Result = $<$<Kind.Apply, [1, 2, 3]>, Function.Identity> // [1, 2, 3]
```
 

| Utility name | Description |
| -- | -- |
  | [ApplyN](#utility-kindapplyn) | `ApplyN` is a type-level function that applies a kind to a type. |
  | [Apply](#utility-kindapply) | `Apply` is a type-level function that applies a kind to a type. |
  | [Arity](#utility-kindarity) | `Arity` is a type-level function that takes in a curried type-level function, and returns the total number of arguments it needs in order to be fully applied. |
  | [ComposablePair](#utility-kindcomposablepair) | `ComposablePair` checks if two kinds can be composed together. |
  | [Composable](#utility-kindcomposable) | `Composable` checks whether a sequence of kinds can be composed without errors. |
  | [Compose](#utility-kindcompose) | `Compose` is a type-level function that allows users to compose multiple type-level functions together. It takes in a list of functions and a type argument as input, composes the functions in its input list from right to left, and returns a higher-kinded-type function that takes in a type and returns the result of the composition. |
  | [Curry](#utility-kindcurry) | `Curry` is a combinator that takes in a positive natural number `N` and a type-level function `K`, which expects a tuple of length `N`, and returns a curried type-level function with `N` arity. |
  | [InputOf](#utility-kindinputof) | Represents a type-level utility to deduce the input type of a provided kind. |
  | [Juxt](#utility-kindjuxt) | `Juxt` is a type-level function that applies a tuple of kinds to a type. |
  | [OutputOf](#utility-kindoutputof) | Represents a type-level utility to deduce the output type of a provided kind. |
  | [Parameters](#utility-kindparameters) | `Parameters` is a type-level function that takes in a curried n-ary type-level function, and returns an ordered of the types of the n arguments that the input function is expecting. |
  | [PipeWeak](#utility-kindpipeweak) | `PipeWeak` is a type-level function that takes a tuple of type-level functions and composes them from left to right, such that the output of the first function is the input of the second function, and so on. |
  | [Pipe](#utility-kindpipe) | `Pipe` is a type-level function that allows users to compose multiple type-level functions together. It takes in a list of functions and a type argument as input, composes the functions in its input list from left to right, and and applies the resulting type-level function to the second input type. |
  | [Reify](#utility-kindreify) | Represents a type-level utility to reify a kind into a function signature. The `Reify` interface is a more structured way to use the reification process, and is built upon the `_$reify` type. |
  | [Unapply](#utility-kindunapply) | `Unapply` is a type-level function that takes in a) a type-level function that has been partially or fully applied with an argument, b) the original type-level function that was invoked to derive the first input type, and then extracts and returns the applied argument from closure. |
  | [Uncurry](#utility-kinduncurry) | `Uncurry` is a type-level function that takes in a type-level function and a list of arguments, and applies the type-level function to the list of arguments. |


## Utility: Kind.ApplyN

`ApplyN` is a type-level function that applies a kind to a type.

It takes a list of arguments X and kind K, and applies
K to X using the `$N` operator.

@see {@link Kind.Uncurry}

`ApplyN` is `Kind.Uncurry` with the argument positions reversed.
Here, we first take in the values, and then a kind to apply to those values.

This makes `ApplyN` particularly useful for more complicated chains
of type-level logic.

| Argument name | Type | Description |
| -- | -- | -- |
| X |  | The list of arguments to apply the kind to |
| K |  | The kind to apply |

@returns The result of applying K to X
 


## Utility: Kind.Apply

`Apply` is a type-level function that applies a kind to a type.

It takes a value X and kind K, casts X to the input type of K, and applies
K to the casted X using the `$` operator.

@see {@link $}
Notably, the argument positions are reversed compared to `\$`.
Here, we first take in a value, and then a kind to apply to that value.

| Argument name | Type | Description |
| -- | -- | -- |
| X |  | The value of type X to apply the kind to |
| K |  | The kind to apply |

@returns The result of applying K to x



For a simple example, we can apply `Identity` to the type 42:

```ts
import { $, Kind, Function } from 'hkt-toolbelt'

type X = $<$<Kind.Apply, 42>, Function.Identity> // 42
```



`Apply` is particularly useful for more complicated chains of type-level
logic. For example, we can map over a list of kinds and apply all of them
to an input type:

```ts
import { $, Kind, List, String } from 'hkt-toolbelt'

type X = $<
  $<List.Map, $<Kind.Apply, 'qux'>>,
  [$<String.Prepend, 'foo'>, $<String.Append, 'bar'>, String.ToUpper]
>
// ['fooqux', 'quxbar', 'QUX']
```

In the above example, we map over a list of kinds, and apply each of them
to the input type `'qux'`. The result is a list of types, each of which
is the result of applying the corresponding kind to `'qux'`.
 


## Utility: Kind.Arity

`Arity` is a type-level function that takes in a curried type-level function,
and returns the total number of arguments it needs in order to be fully applied.

| Argument name | Type | Description |
| -- | -- | -- |
| K | `Kind.Kind` | A type-level function whose arity will be returned. |

If `K` is a fully-applied `Kind`, 0 will be returned.
If `K` is not a `Kind`, an error will be emitted.


```ts
type ReduceArity = $<Kind.Arity, List.Reduce>  // 3
type PartialApply1 = $<Kind.Arity, $<List.Reduce, never>>  // 2
type PartialApply2 = $<Kind.Arity, $<$<List.Reduce, never>, never>>  // 1
type FullApply = $<Kind.Arity, $<$<$<List.Reduce, never>, never>, never>>  // 0
```
 


## Utility: Kind.ComposablePair

`ComposablePair` checks if two kinds can be composed together.

It takes a pair of kinds [A, B] and returns true if B's output type is a
subtype of A's input type. This means that B can be piped into A.

Equivalently, A can be composed with B. Regarding terminology, f(g(x)) is f
composed with g, and we say that 'g is piped into f'. In other words,
composition is a right-to-left description.

| Argument name | Type | Description |
| -- | -- | -- |
| K |  | A tuple containing two kinds to check |

@returns Whether the kinds are composable


```ts
// Returns true - length results in a number, which can be incremented.
$<ComposablePair, [NaturalNumber.Increment, String.Length]>

// Returns false - reverse results in a list, which cannot be upper-cased.
$<ComposablePair, [String.ToUpper, List.Reverse]>
```
 


## Utility: Kind.Composable

`Composable` checks whether a sequence of kinds can be composed without
errors.

It should be invoked via `$` by passing a tuple of kinds:

```ts
$<Composable, [A, B, C]>
```

This will evaluate to a boolean literal type indicating whether the kinds in the tuple are composable:

- `true` if each adjacent pair is composable.
- `false` otherwise.

Two kinds `X` and `Y` are composable if `X`'s output type is a subtype of `Y`'s input type.

| Argument name | Type | Description |
| -- | -- | -- |
| K |  | The tuple of kinds to check |



```ts
// true - number => number => string is a valid chain
$<Composable, [NaturalNumber.Decrement, NaturalNumber.Increment, String.Length]>

// false - the chain breaks
$<Composable, [List.Map, String.ToUpper, List.Reverse]>
```

@see {@link _$composable}
`Composable` is the public interface for `_$composable` which performs the
checks.
 


## Utility: Kind.Compose

`Compose` is a type-level function that allows users to compose
multiple type-level functions together. It takes in a list of functions and a type argument as input,
composes the functions in its input list from right to left,
and returns a higher-kinded-type function that takes in a type and returns the result of the composition.

| Argument name | Type | Description |
| -- | -- | -- |
| FX | `Kind.Kind[]` | a tuple of type-level functions |
| X |  | a type to which a `Kind` can be applied. |

@see {@link Kind.Pipe}
`Kind.Pipe` provides the same functionality as `Compose` but evaluates the list of functions in reverse order.

@see {@link $$}
While `$$` immediately applies a composed function to an input,
`Compose` can also be passed into other higher-order type-level functions without being invoked.

## Errors

`Compose` ensures that the tuple of kinds is composable by enforcing that
the Nth type-level function's output is a subtype of the (N + 1)th input.
If this is not the case, `Compose` will return the `never` type.

@see {@link Kind.InputOf} {@link Kind.OutputOf}
If you receive a `never` type, it can be helpful to use the `Kind.InputOf`
and `Kind.OutputOf` type-level functions to inspect the input and output
types of the type-level functions that you are composing together.
 


## Utility: Kind.Curry

`Curry` is a combinator that takes in a positive natural number `N` and
a type-level function `K`, which expects a tuple of length `N`, and returns
a curried type-level function with `N` arity.

The resultant type-level function expects `N` arguments, applied via nested
`$` applications. Alternatively, `$N` can be used to apply the arguments
as a tuple, i.e. through an 'uncurried' application.

Internally, `Curry` keeps an internal tuple that it appends to as each
argument is applied. Once the tuple has `N` elements, it applies the
type-level function `K` to the tuple.

| Argument name | Type | Description |
| -- | -- | -- |
| N | `Number.Number` | The number of arguments to expect. |
| K | `Kind.Kind` | The type-level function to curry. |

See `Combinator.Collate` for a similar combinator.


```ts
import { $, Kind, Type } from "ts-toolbelt"

type Result = $N<Curry, [2, Function.Identity]>
 


## Utility: Kind.InputOf

Represents a type-level utility to deduce the input type of a provided kind.

| Argument name | Type | Description |
| -- | -- | -- |
| F |  | The kind whose input type needs to be inferred. |

@returns The inferred input type of the provided kind. If the kind doesn't
have a deducible input type, it will return `unknown`.


// Given a kind that represents the addition of a natural number with 2:
type Add2 = $<NaturalNumber.Add, 2>;
// You can use Kind.InputOf to deduce the input type of this kind:
type InputType = $<Kind.InputOf, Add2>; // This will be inferred as Number.Number


// For more complex kinds:
type ReduceAdd = $<List.Reduce, NaturalNumber.Add>;
type InputType2 = $<Kind.InputOf, ReduceAdd>; // This will be inferred as unknown

type ReduceAdd0 = $<ReduceAdd, 0>;
type InputType3 = $<Kind.InputOf, ReduceAdd0>; // This will be inferred as unknown[]
 


## Utility: Kind.Juxt

`Juxt` is a type-level function that applies a tuple of kinds to a type.

This is useful for implementing point-free style type-level functions.

| Argument name | Type | Description |
| -- | -- | -- |
| FX |  | A tuple of kinds to apply. |
| X |  | The input type to apply the kinds to. |

@returns A tuple of the results of applying each kind in the tuple to `X`.



In the below example, we apply `Kind.Juxt` to a tuple of two kinds,
List.Length and List.Reverse. On the successive line, we apply the kinds to
the input type `[1, 2, 3]`. The result is a tuple of two types, the first
being the length of the input list `[1, 2, 3]` (3), and the second being the
reversed list `[3, 2, 1]`.

```ts
import { $, Kind, List } from "hkt-toolbelt";

type MyJuxt = $<Kind.Juxt, [List.Length, List.Reverse]>;

type Result = MyJuxt<[1, 2, 3]>; // [3, [3, 2, 1]]
```
 


## Utility: Kind.OutputOf

Represents a type-level utility to deduce the output type of a provided kind.

| Argument name | Type | Description |
| -- | -- | -- |
| F |  | The kind whose output type needs to be inferred. |

@returns The inferred output type of the provided kind. If the kind doesn't have a deducible output type, it will return `unknown`.


// Using the `String.ToUpper` kind which converts a string to uppercase:
// You can use Kind.OutputOf to deduce the output type of this kind:
type OutputType = $<Kind.OutputOf, String.ToUpper>; // This will be inferred as string
 


## Utility: Kind.Parameters

`Parameters` is a type-level function that takes in a curried n-ary type-level function,
and returns an ordered of the types of the n arguments that the input function is expecting.

| Argument name | Type | Description |
| -- | -- | -- |
| K | `Kind.Kind` | A type-level function whose parameters will be returned. |

`K` can be applied successively to a series of arguments that extend each element of the
list returned by `Parameters` by using the @see {@link `$`} operator.

`K` can also be applied to a list of arguments that extends the list returend by `Parameters`
by using the @see {@link `$N`} operator.

If `K` is a fully-applied `Kind`, an empty list will be returned.
If `K` is not a `Kind`, an error will be emitted.


type ReduceParams = $<Kind.Parameters, List.Reduce>  // [Kind.Kind<(x: never) => Kind.Kind>, unknown, List.List]
type PartialApply1 = $<Kind.Parameters, $<List.Reduce, never>>  // [unknown, List.List]
type PartialApply2 = $<Kind.Parameters, $<$<List.Reduce, never>, never>>  // [List.List]
type FullApply = $<Kind.Parameters, $<$<$<List.Reduce, never>, never>, never>>  // []
 


## Utility: Kind.PipeWeak

`PipeWeak` is a type-level function that takes a tuple of type-level
functions and composes them from left to right, such that the output of the
first function is the input of the second function, and so on.

This is a weaker version of `Pipe` that does not enforce subtype
constraints between the input and output of each function.

The type constraint associated with the overall input, and the constraint
enforcing a tuple of kinds are both still enforced.

This is useful for pipes which are too complicated for the inputs and outputs
to be correctly inferred.

| Argument name | Type | Description |
| -- | -- | -- |
| FX |  | A tuple of type-level functions that will be piped together. |
| X |  | The type that the type-level functions will be applied to. |



```ts
import { $, Kind, String } from "hkt-toolbelt";

type MyFunc = $<Kind.PipeWeak, [
  $<String.Append, "foo">,
  $<String.Append, "bar">,
]>

type Result = $<MyFunc, "baz"> // "bazfoobar"
```
 


## Utility: Kind.Pipe

`Pipe` is a type-level function that allows users to compose
multiple type-level functions together. It takes in a list of functions and a type argument as input,
composes the functions in its input list from left to right, and
and applies the resulting type-level function to the second input type.

| Argument name | Type | Description |
| -- | -- | -- |
| FX | `Kind.Kind[]` | a tuple of type-level functions |
| X |  | a type to which a `Kind` can be applied |

@see {@link Kind.Compose}
The functionality of `Pipe` is identical to `Kind.Compose`
except for the order of evaluation being reversed, which has the advantage of improved readability.

@see {@link $$}
In short, `Pipe` is the partially applicable formulation of `$$`.
While `$$` immediately applies a composed function to an input,
`Pipe` can also be passed into other higher-order type-level functions without being invoked.

## Errors

`Pipe` ensures that the tuple of kinds is composable by enforcing that
Nth type-level function's output is a subtype of the (N + 1)th input.
If this is not the case, `Pipe` will return the `never` type.

@see {@link Kind.InputOf} {@link Kind.OutputOf}
If you receive a `never` type, it can be helpful to use the `Kind.InputOf`
and `Kind.OutputOf` type-level functions to inspect the input and output
types of the type-level functions that you are piping together.
 


## Utility: Kind.Reify

Represents a type-level utility to reify a kind into a function signature.
The `Reify` interface is a more structured way to use the reification process, and is built upon the `_$reify` type.

| Argument name | Type | Description |
| -- | -- | -- |
| F |  | The kind to be reified. |

@returns A function signature derived from the provided kind.


// Using the `String.ToUpper` kind, you can use Reify to get a function-like signature:
declare const toUpper: $<Kind.Reify, String.ToUpper>;
// This function can be used as a 'reified kind', with type inference.
const x = toUpper('hello'); // 'HELLO'
 


## Utility: Kind.Unapply

`Unapply` is a type-level function that takes in
a) a type-level function that has been partially or fully applied with an argument,
b) the original type-level function that was invoked to derive the first input type,
and then extracts and returns the applied argument from closure.

| Argument name | Type | Description |
| -- | -- | -- |
| K | `Kind.Kind` | The target type-level function to unapply. |
| F | `Kind.Kind` | The type-level function that was applied to an argument to derive `K` |

Note that `_$unapply` infers the most specific type for the closure argument,
whereas `Kind._$inputOf` returns the widest category of arguments accepted by the input function.


For example, we can use `Unapply` to determine what argument was passed into an applied type-level function.
In this example, we partially apply `Unapply` to `NaturalNumber.Add`, which results in a
type-level function that returns the argument passed into `NaturalNumber.Add` to derive its input,
if its input is the result of applying that function.

We then apply this partially applied function to `Add2` using the `$` type-levl applicator:

```ts
import { $, Kind, NaturalNumber } from "hkt-toolbelt";

type Add2 = $<NaturalNumber.Add, 2>
type Is2 = $<$<Kind.Unapply, NaturalNumber.Add>, Add2> // 2
```
 


## Utility: Kind.Uncurry

`Uncurry` is a type-level function that takes in a type-level function and
a list of arguments, and applies the type-level function to the list of
arguments.

This is syntactic sugar for nested `$` applications. See `$N`, which is the
operator shorthand for this function.

| Argument name | Type | Description |
| -- | -- | -- |
| K | `Kind.Kind` | The type-level function to apply. |
| X | `List.List` | The list of arguments to apply the type-level function to. |

This is useful for applying a type-level function that takes many arguments,
such as conditionals.

Additionally, this can be used in conjunction with `Curry` to "lift"
arguments out of function composition.
 


# Module: List

The `List` module contains various utilities for working with type-level
tuples. It provides utilities such as mapping, filtering, and reducing
operations.


```ts
import { $, List, String } from 'hkt-toolbelt'

type Result = $<List.Map, [String.ToUpper, ['foo', 'bar']]> // ['FOO', 'BAR']
```
 

| Utility name | Description |
| -- | -- |
  | [Accumulate](#utility-listaccumulate) | `Accumulate` is a type-level function that takes in three inputs: a) a partially-applied type-level function for a pairwise operation that is expecting two more arguments, b) a type specifying the initial argument that will be passed into this partially-applied function, c) a target list of types, and returns a list which contains the result of every intermediate accumulator value computed while performing a reduce operation on the input list (also known as "cumulative fold"). |
  | [At](#utility-listat) | `At` is a type-level function that retrieves and returns an element from a tuple type. |
  | [Chunk](#utility-listchunk) | `Chunk` is a type-level function that takes in a number `N` and a list `T`, and returns a list of lists, where each sublist has a length of `N`. |
  | [Concat](#utility-listconcat) | `Concat` is a type-level function that concatenates two tuples. |
  | [Contains](#utility-listcontains) | `Contains` is a type-level function that takes in a value `X` and a list `T`, and returns a boolean indicating whether `X` is present in `T`. |
  | [ContainsValue](#utility-listcontainsvalue) | `ContainsValue` is a type-level function that takes in a list `T` and a value `X`, and returns a boolean indicating whether `T` contains `X`. |
  | [Duplicates](#utility-listduplicates) | `Duplicates` is a type-level function that takes in a list `T` and returns a list of the duplicate elements in `T`, i.e. those elements that appear more than once in `T`. |
  | [Every](#utility-listevery) | `Every` is a type-level function that checks if every element in a tuple satisfies a predicate. |
  | [Filter](#utility-listfilter) | `Filter` is a type-level function that takes in two inputs: a partially-applied type-level predicate that expects one more argument and returns a boolean type, and a target list of types upon which to perform the filtering operation. It returns a filtered list of types. |
  | [Find](#utility-listfind) | `Find` is a type-level function that finds the first element in a list that satisfies a predicate. |
  | [First](#utility-listfirst) | `First` is a type-level function that returns the first element of a tuple. |
  | [FlatMap](#utility-listflatmap) | `FlatMap` is a type-level function that applies a mapping function to each element of a list, and returns a flattened list of the results (by one level only). |
  | [FlattenN](#utility-listflattenn) | `FlattenN` is a type-level function that flattens a tuple up to a specified depth level by recursively concatenating nested subtuple elements. |
  | [Flatten](#utility-listflatten) | `Flatten` is a type-level function that completely flattens a tuple by recursively concatenating all nested elements. |
  | [Includes](#utility-listincludes) | `Includes` is a type-level function that checks if a list includes a certain element. |
  | [Intersect](#utility-listintersect) | `Intersect` is a type-level function that takes in two lists `A` and `B`, and returns a list of the elements that are common to both lists. |
  | [IntersectMask](#utility-listintersectmask) | `IntersectMask` is a type-level function that takes in two lists `A` and `B`, and masks out (i.e. sets to `never`) the elements in `A` that are not present in `B`. |
  | [InverseMapN](#utility-listinversemapn) | `InverseMapN` is a type-level function that takes in two inputs: a list of type-level functions upon which to perform the map operation, and a target list of arguments which will be passed into all of these functions using `$N` It returns a list filled with the returned results of applying the functions to the arguments. |
  | [InverseMap](#utility-listinversemap) | `InverseMap` is a type-level function that takes in two inputs: a list of type-level functions upon which to perform the map operation, and a target type argument which will be passed into all of these functions. It returns a list filled with the returned results of applying the functions to the argument. |
  | [IsVariadic](#utility-listisvariadic) | `IsVariadic` is a type-level function that checks if a tuple is variadic. |
  | [Iterate](#utility-listiterate) | `Iterate` is a type-level function that repeatedly applies a function over an input value for a given number of times, and returns a list containing all of the intermediate results. |
  | [Last](#utility-listlast) | `Last` is a type-level function that returns the last element of a tuple. |
  | [Length](#utility-listlength) | `Length` is a type-level function that returns the length of a list. |
  | [List](#utility-listlist) |  |
  | [MapN](#utility-listmapn) | `_$MapN` is a type-level function that takes in two inputs: a partially-applied type-level function that expects more arguments, and a target list of lists upon which to map the function using the `$N` operator. It returns a mapped list of types. |
  | [Map](#utility-listmap) | `Map` is a type-level function that maps a type-level function over a list of types. |
  | [Pair](#utility-listpair) | `Pair` is a type-level function that generates a tuple of pairs from a tuple, where each element is paired with the next element. |
  | [PopN](#utility-listpopn) | `PopN` is a type-level function that pops N elements from the tail of a list. |
  | [Pop](#utility-listpop) | `Pop` is a type-level function that pops one element from the tail of a list. |
  | [Push](#utility-listpush) | `Push` is a type-level function that pushes an element to the end of a tuple. |
  | [PushValue](#utility-listpushvalue) | `PushValue` is a type-level function that takes in a tuple `T` and a value `U`, and returns a new tuple with `U` appended to the end of `T`. |
  | [Range](#utility-listrange) | `Range` is a type-level function that generates a range of numbers. |
  | [Reduce](#utility-listreduce) | `Reduce` is a type-level function that takes in three inputs: a) a partially-applied type-level function for a pairwise operation that is expecting two more arguments, b) a type specifying the initial argument that will be passed into this partially-applied function, c) a target list of types, and performs a reduce operation (also known as "fold") over the target list, and returns the resulting type. |
  | [Remove](#utility-listremove) | `Remove` is a type-level function that takes in a list `T` and a value `X`, and returns a new list `T` with all instances of the value `X` removed. |
  | [Repeat](#utility-listrepeat) | `Repeat` is a type-level function that returns a tuple filled with multiple elements of a specified type. |
  | [Reverse](#utility-listreverse) | `Reverse` is a type-level function that reverses a tuple. |
  | [ShiftN](#utility-listshiftn) | `ShiftN` is a type-level function that shifts N elements from the head of an array. |
  | [Shift](#utility-listshift) | `Shift` is a type-level function that shifts one element from the head of a list. |
  | [Slice](#utility-listslice) | `Slice` is a type-level function that extracts and returns a subtuple of specified range from a tuple type. It takes in three arguments: `START` and `END`, which respectively specify the inclusive start and exclusive end indices of a slice, and `T`, the tuple that is to be sliced. Both positive and negative indices are supported, with negative indices being normalized into zero-based indices under the hood. |
  | [Some](#utility-listsome) | `Some` is a type-level function that checks if some element in a tuple satisfies a predicate. |
  | [Splice](#utility-listsplice) | `Splice` is a type-level function that changes the contents of a tuple type by removing or replacing existing elements and/or adding new elements. |
  | [Times](#utility-listtimes) | `Times` is a type-level function that generates a list of numbers from 0 to N-1. |
  | [Unique](#utility-listunique) |  |
  | [Unshift](#utility-listunshift) | `List.Unshift` is a type-level function that prepends an item to a list. |
  | [Zip](#utility-listzip) | `Zip` is a type-level function that takes in one array of arrays, `T`, and returns an array of arrays, where the i-th array contains the i-th element from each of the elements of `T`. |


## Utility: List.Accumulate

`Accumulate` is a type-level function that takes in three inputs:
a) a partially-applied type-level function for a pairwise operation that is expecting two more arguments,
b) a type specifying the initial argument that will be passed into this partially-applied function,
c) a target list of types, and returns a list which contains the result of every intermediate accumulator value computed
while performing a reduce operation on the input list (also known as "cumulative fold").

The type-level function input must be a unary, curried `Kind` type as defined in this library, while being of arity 2 if uncurried.

@see {@link https://github.com/poteat/hkt-toolbelt/blob/main/docs/guides/custom-kinds.md} for details on how to create a custom kind.

| Argument name | Type | Description |
| -- | -- | -- |
| F |  | A type-level function for a pairwise operation. |
| O |  | A type specifying the initial argument that will be taken by `F`. |
| X |  | A list of types. The target of the accumulate operation. |


For example, we can use `Accumulate` to derive the sum of k = 1 to n for all elements n in a list of natural number types.

type SummationSum1to10 = $<$<$<List.Accumulate, NaturalNumber.Add>, 0>, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]>; // [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]


We can also use the `$N` applicator to invoke `Accumulate` with a list containing the required arguments
This improves readability by allowing us to avoid nesting `$` calls three level deep.

type IsFalse = $N<List.Accumulate, [
  Boolean.Xor,
  true,
  [false, true, false, true]
]>;  // [true, false, false, true]


By partially applying only the first two arguments to `Accumulate`,
we can define a type-level function that can apply the same operation to multiple list inputs.

type GetMax = $N<List.Accumulate, [Number.Max, Number.MIN_SAFE_INTEGER]>;
type IsZero = $<GetMax, [-5, -4, -3, -2, -1, 0];  // [-5, -4, -3, -2, -1, 0]
type IsHundred = $<GetMax, [1, -1, 10, -10, 100, -100]>;  // [1, 1, 10, 10, 100, 100]


Another use case for a partially-applied `Accumulate` function is to implement
sophisticated higher-order functionality by passing it into other type-level functions.

type GetMinOrJoin = $N<Conditional.If, [
  $<Conditional.Extends, number[]>,
  $N<List.Accumulate, [Number.Min, Number.MAX_SAFE_INTEGER]>,
  $<String.Join, ", ">,
]>;
type IsNegativeHundred = $<GetMinOrJoin, [1, -1, 10, -10, 100, -100]>;  // [1, -1, -1, -10, -10, -100]
type HelloWorld = $<GetMinOrJoin, ["hello", "world"]>;  // "hello, world"
 


## Utility: List.At

`At` is a type-level function that retrieves and returns an element from a tuple type.

It takes in two arguments: a tuple, and an integer specifying the index of the element to be accessed.
Both positive and negative indices are supported, with negative indices being normalized into zero-based indices under the hood.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | A tuple type. |
| POS |  | An integer type specifying the index of the element to be accessed. |

## Edge Cases

If `POS` is greater than or equal to the length of `T`, returns `never`.
If `POS` is lesser than the negated length of `T`, returns `never`.
If `POS` is not an integer type, returns `never`.


A negative index counts back from the end of the input tuple.

type MyList = ['a', 'b', 'c', 'd', 'e'];

type Head = $<$<List.At, 0>, MyList>; // 'a'
type Tail = $<$<List.At, -1>, MyList>; // 'e'

type IsNever = $<$<List.At, 5>, MyList>;  // never
type IsNever2 = $<$<List.At, -6>, MyList>;  // never
 


## Utility: List.Chunk

`Chunk` is a type-level function that takes in a number `N` and a list `T`,
and returns a list of lists, where each sublist has a length of `N`.

Trailing elements have a shorter sublist length.

| Argument name | Type | Description |
| -- | -- | -- |
| N |  | The length of each sublist. |
| T |  | The list to chunk. |


For example, we can use `Chunk` to chunk a list into sublists of length `N`:

```ts
import { $, List } from "hkt-toolbelt";

type Result = $<$<List.Chunk, 2>, [1, 2, 3, 4, 5]>; // [[1, 2], [3, 4], [5]]
```
 


## Utility: List.Concat

`Concat` is a type-level function that concatenates two tuples.

It takes in two arguments:
`T`, the tuple to concatenate onto, and `U`, the tuple to concatenate.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | A tuple type to be concatenated onto. |
| U |  | A tuple type to concatenate, or an unknown. |

If `U` is not a tuple type, it will be pushed into `T` as its new last element.

## Basic Usage


type Result = $<$<List.Concat [2, 3]>, [1, 2]>; // [0, 1, 2, 3]

## Advanced Usage

Concatenating to a tuple with a rest parameter results in a tuple that contains the concatenated tuple.


type Result = $<$<List.Concat, ["foo"]>, [1, 2, ...string[]]>; // [1, 2, ...string[], "foo"]

 


## Utility: List.Contains

`Contains` is a type-level function that takes in a value `X` and a list `T`,
and returns a boolean indicating whether `X` is present in `T`.

| Argument name | Type | Description |
| -- | -- | -- |
| X |  | The value to check. |
| T |  | The list to check. |

@returns A boolean indicating whether `X` is present in `T`.


For example, we can use `Contains` to check if a value is present in a list:

```ts
import { $, List } from "hkt-toolbelt";

type Result = $<$<List.Contains, 2>, [1, 2, 3]>; // true
```
 


## Utility: List.ContainsValue

`ContainsValue` is a type-level function that takes in a list `T` and a value
`X`, and returns a boolean indicating whether `T` contains `X`.

This has opposite arguments with respect to `Contains`.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The list to check. |
| X |  | The value to check. |

@returns A boolean indicating whether `T` contains `X`.


For example, we can use `ContainsValue` to check if a value is present in a list:

```ts
import { $, List } from "hkt-toolbelt";

type Result = $<$<List.ContainsValue, [1, 2, 3]>, 2>; // true
```
 


## Utility: List.Duplicates

`Duplicates` is a type-level function that takes in a list `T` and returns
a list of the duplicate elements in `T`, i.e. those elements that appear
more than once in `T`.

Elements are ordered in the same order as the input list. Only the first
occurrence of each element is included in the output list.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The list to check. |


For example, we can use `Duplicates` to find the duplicates in a list:

```ts
import { $, List } from "hkt-toolbelt";

type Result = $<$<List.Duplicates, [1, 2, 3, 4, 5, 1]>>; // [1]
```
 


## Utility: List.Every

`Every` is a type-level function that checks if every element in a tuple satisfies a predicate.

| Argument name | Type | Description |
| -- | -- | -- |
| F |  | The predicate function. |
| T |  | The tuple to check. |


type T0 = $<$<List.Every, $<Conditional.Extends, number>>, [1, 2, 3]> // true
type T1 = $<$<List.Every, $<Conditional.Extends, number>>, [1, 2, 3, 'x']> // false
 


## Utility: List.Filter

`Filter` is a type-level function that takes in two inputs:
a partially-applied type-level predicate that expects one more argument and returns a boolean type,
and a target list of types upon which to perform the filtering operation.
It returns a filtered list of types.

The type-level function input must be a unary, curried `Kind` type as defined in this library.

@see {@link https://github.com/poteat/hkt-toolbelt/blob/main/docs/guides/custom-kinds.md} for details on how to create a custom kind.

| Argument name | Type | Description |
| -- | -- | -- |
| F |  | A type-level function that returns a boolean type indicating whether a type should be included in the result. |
| X |  | A list of types. The target of the filtering operation. |


For example, we can define a filter for positive numbers and then apply it to a list:

type FilteredNumbers = $<$<List.Filter, Conditional.IsPositive>, [1, -2, 3, -4]>;  // [1, 3]


We can also use the `$N` applicator to invoke `Filter` with a list containing the required arguments
This improves readability by allowing us to avoid nesting `$` calls.

type FilterZeros = $N<List.Filter, [
  $<Conditional.NotEquals, 0>,
  [1, 0, 2, 0, 3]
]>;  // [1, 2, 3]


By partially applying only the first argument to `Filter`,
we can define a type-level function that can apply the same operation to multiple list inputs.

type FilterZeros = $<List.Filter, $<Conditional.NotEquals, 0>>;
type AllZero = $<FilterZeros, [0, 0, 0, 0, 0]>;  // []
type OneZero = $<FilterZeros, [0, 1, 2, 3, 4, 5]>;  // [1, 2, 3, 4, 5]


Another use case for a partially-applied `Filter` function is to implement
sophisticated higher-order functionality by passing it into other type-level functions.

type HelloWorld = $$<[
  $<List.Filter, $<Conditional.Extends, string>>
  $<String.Join, ", ">
], [42.42, null, "hello", undefined, "world"]>  // "hello, world"
 


## Utility: List.Find

`Find` is a type-level function that finds the first element in a list that satisfies a predicate.

| Argument name | Type | Description |
| -- | -- | -- |
| F |  | The predicate function. |
| X |  | The list to search. |


type T0 = $<$<List.Find, $<Conditional.Equals, 3>>, [1, 2, 3]> // 3
type T1 = $<$<List.Find, $<Conditional.Equals, 4>>, [1, 2, 3]> // never
 


## Utility: List.First

`First` is a type-level function that returns the first element of a tuple.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The tuple to get the first element of. |


type T0 = $<List.First, [1, 2, 3]> // 1
type T1 = $<List.First, []> // never
 


## Utility: List.FlatMap

`FlatMap` is a type-level function that applies a mapping function to each
element of a list, and returns a flattened list of the results (by one
level only).

Elements returned by the mapping function which are not lists will remain
in place in the flattened list.

| Argument name | Type | Description |
| -- | -- | -- |
| F |  | The type-level function to apply to each element of the list. |
| X |  | The list to apply the type-level function to. |

@returns A flattened list of the results of applying the type-level function
to each element of the list.



```ts
import { $, List, String } from "hkt-toolbelt";

type T0 = $<List.FlatMap<List.Times, [1, 2, 3]>> // [0, 0, 1, 0, 1, 2]
```
 


## Utility: List.FlattenN

`FlattenN` is a type-level function that flattens a tuple up to a specified depth level by recursively concatenating nested subtuple elements.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The input tuple. |
| N |  | Natural number specifying the depth level by which a nested tuple should be flattened. |


type MyList = [0, [1, [2, [3, [4]]]]]
type Result1 = $<$<List.FlattenN, 1>, MyList> // [0, 1, [2, [3, [4]]]]
type Result2 = $<$<List.FlattenN, 2>, MyList> // [0, 1, 2, [3, [4]]]
type Result3 = $<$<List.FlattenN, 4>, MyList> // [0, 1, 2, 3, 4]
type Result4 = $<$<List.FlattenN, 5>, MyList> // [0, 1, 2, 3, 4]
 


## Utility: List.Flatten

`Flatten` is a type-level function that completely flattens a tuple by recursively concatenating all nested elements.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The input tuple. |


type MyList = [0, [1, [2, [3, [4]]]]]
type Result = $<List.Flatten, MyList> // [0, 1, 2, 3, 4]
 


## Utility: List.Includes

`Includes` is a type-level function that checks if a list includes a certain
element.

| Argument name | Type | Description |
| -- | -- | -- |
| V |  | The value to check for. |
| X |  | The list to check. |


type T0 = $<$<List.Includes, $<Conditional.Equals, 3>>, [1, 2, 3]> // true
type T1 = $<$<List.Includes, $<Conditional.Equals, 4>>, [1, 2, 3]> // false
 


## Utility: List.Intersect

`Intersect` is a type-level function that takes in two lists `A` and `B`,
and returns a list of the elements that are common to both lists.

Elements are ordered in the same order as the first list.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | The first list. |
| B |  | The second list. |
| T |  | The common elements. |


For example, we can use `Intersect` to find the common elements in two lists:

```ts
import { $, List } from "hkt-toolbelt";

type Result = $<$<List.Intersect, [1, 2, 3]>, [1, 3, 4, 5]>; // [1, 3]
```
 


## Utility: List.IntersectMask

`IntersectMask` is a type-level function that takes in two lists `A` and `B`,
and masks out (i.e. sets to `never`) the elements in `A` that are not
present in `B`.

Elements are ordered in the same order as the first list.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | The first list. |
| B |  | The second list. |
| T |  | The common elements. |

@template T - The common elements.


For example, we can use `IntersectMask` to find the common elements in two lists:

```ts
import { $, List } from "hkt-toolbelt";

type Result = $<$<List.IntersectMask, [1, 2, 3]>, [1, 3, 4, 5]>; // [1, never, 3]
```
 


## Utility: List.InverseMapN

`InverseMapN` is a type-level function that takes in two inputs:
a list of type-level functions upon which to perform the map operation,
and a target list of arguments which will be passed into all of these functions using `$N`
It returns a list filled with the returned results of applying the functions to the arguments.

@template T - A list of type-level functions that transform inputs and return the result.
@template X - A list of types. The arguments to be passed into every element of `T`.
@returns {List.List} A list of types resulting from the elements of `X` being inversely mapped onto `T` as arguments of the elements of `T`.
 


## Utility: List.InverseMap

`InverseMap` is a type-level function that takes in two inputs:
a list of type-level functions upon which to perform the map operation,
and a target type argument which will be passed into all of these functions.
It returns a list filled with the returned results of applying the functions to the argument.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | A list of type-level functions that transform unary inputs and return the result. |
| X |  | A type. The argument to be passed into every element of `T`. |

The type-level functions in `T` must be unary, curried `Kind` types as defined in this library.
@see {@link https://github.com/poteat/hkt-toolbelt/blob/main/docs/guides/custom-kinds.md} for details on how to create a custom kind.
 


## Utility: List.IsVariadic

`IsVariadic` is a type-level function that checks if a tuple is variadic.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The tuple to check. |


type T0 = $<List.IsVariadic, [1, 2, 3, ...number[]]> // true
type T1 = $<List.IsVariadic, [1, 2, 3]> // false
 


## Utility: List.Iterate

`Iterate` is a type-level function that repeatedly applies a function over an input value for a given number of times,
and returns a list containing all of the intermediate results.

| Argument name | Type | Description |
| -- | -- | -- |
| F |  | The function to iterate with. |
| N |  | The number of times to iterate. |
| O |  | The initial input to the function. |


type T0 = $<$<$<List.Iterate, $<Boolean.Xor, true>>, 5>, true> // [true, false, true, false, true]
 


## Utility: List.Last

`Last` is a type-level function that returns the last element of a tuple.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The tuple to get the last element of. |


type T0 = $<List.Last, [1, 2, 3]> // 3
type T1 = $<List.Last, []> // never
type T2 = $<List.Last, number[]> // number
type T3 = $<List.Last, [string, ...number[]]> // number
type T4 = $<List.Last, [string, ...number[], 'foo']> // 'foo'
type T5 = $<List.Last, [string]> // string
 


## Utility: List.Length

`Length` is a type-level function that returns the length of a list.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The list to get the length of. |


type T0 = $<List.Length, [1, 2, 3]> // 3
type T1 = $<List.Length, []> // 0
 


## Utility: List.List




## Utility: List.MapN

`_$MapN` is a type-level function that takes in two inputs:
a partially-applied type-level function that expects more arguments,
and a target list of lists upon which to map the function using the `$N` operator.
It returns a mapped list of types.

@see {@link $N}

The type-level function input can be a fully or partially uncurried `Kind`.

@template F - A type-level function that can be uncurried and applied to a list of arguments.
@template X - A list of lists of arguments. The target of the map operation.
@returns a mapped list of types
 


## Utility: List.Map

`Map` is a type-level function that maps a type-level function over a list of types.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The type-level function to map. |
| X |  | The list of types to map over. |


type T0 = $<$<List.Map, $<Conditional.Equals, 'foo'>>, ['foo', 'bar']> // [true, false]
type T1 = $<$<List.Map, $<Function.Constant, 'foo'>>, ['foo', 'bar']> // ['foo', 'foo']
 


## Utility: List.Pair

`Pair` is a type-level function that generates a tuple of pairs from a tuple,
where each element is paired with the next element.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The tuple to generate pairs from. |


type T0 = $<List.Pair, [1, 2, 3, 4]> // [[1, 2], [2, 3], [3, 4]]
type T1 = $<List.Pair, []> // []
type T2 = $<List.Pair, [1]> // []
type T3 = $<List.Pair, [1, 2]> // [[1, 2]]
 


## Utility: List.PopN

`PopN` is a type-level function that pops N elements from the tail of a list.

| Argument name | Type | Description |
| -- | -- | -- |
| N |  | The number of elements to pop. |
| T |  | The list to pop elements from. |


type T0 = $<$<List.PopN, 1>, ['a', 'b', 'c']> // ['a', 'b']
 


## Utility: List.Pop

`Pop` is a type-level function that pops one element from the tail of a list.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The list to pop the tail element from. |


type T0 = $<List.Pop, ['a', 'b', 'c']> // ['a', 'b']
 


## Utility: List.Push

`Push` is a type-level function that pushes an element to the end of a tuple.

| Argument name | Type | Description |
| -- | -- | -- |
| X |  | The element to push. |
| T |  | The tuple to push the element to. |


type T0 = $<$<List.Push, 3>, [1, 2]> // [1, 2, 3]
type T1 = $<$<List.Push, 'foo'>, []> // ['foo']
 


## Utility: List.PushValue

`PushValue` is a type-level function that takes in a tuple `T` and a value
`U`, and returns a new tuple with `U` appended to the end of `T`.

This is the swapped argument order of the `List.Push` function.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The tuple to push the value to. |
| U |  | The value to push. |


```ts
type T0 = $<$<List.PushValue, [1, 2, 3]>, 4> // [1, 2, 3, 4]
```
 


## Utility: List.Range

`Range` is a type-level function that generates a range of numbers.

| Argument name | Type | Description |
| -- | -- | -- |
| START |  | The start of the range. |
| STOP |  | The end of the range. |
| STEP |  | The step size for the range. |


type T0 = $<$<$<List.Range, 0>, 10>, 1> // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
type T1 = $<$<$<List.Range, 10>, 0>, -2> // [10, 8, 6, 4, 2]
 


## Utility: List.Reduce

`Reduce` is a type-level function that takes in three inputs:
a) a partially-applied type-level function for a pairwise operation that is expecting two more arguments,
b) a type specifying the initial argument that will be passed into this partially-applied function,
c) a target list of types, and performs a reduce operation (also known as "fold") over the target list,
and returns the resulting type.

The type-level function input must be a unary, curried `Kind` type as defined in this library, while being of arity 2 if uncurried.

@see {@link https://github.com/poteat/hkt-toolbelt/blob/main/docs/guides/custom-kinds.md} for details on how to create a custom kind.

| Argument name | Type | Description |
| -- | -- | -- |
| F |  | A type-level function for a pairwise operation. |
| O |  | A type specifying the initial argument that will be taken by `F`. |
| X |  | A list of types. The target of the reduce operation. |


For example, we can use `Reduce` to derive the sum of all elements in a list of numeric types.

type Sum1to10 = $<$<$<List.Reduce, NaturalNumber.Add>, 0>, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]>;  // 55


We can also use the `$N` applicator to invoke `Reduce` with a list containing the required arguments
This improves readability by allowing us to avoid nesting `$` calls three level deep.

type IsTrue = $N<List.Reduce, [
  Boolean.Xor,
  true,
  [false, true, false, true]
]>;  // true


By partially applying only the first two arguments to `Reduce`,
we can define a type-level function that can apply the same operation to multiple list inputs.

type GetMax = $N<List.Reduce, [Number.Max, Number.MIN_SAFE_INTEGER]>;
type IsZero = $<GetMax, [-5, -4, -3, -2, -1, 0];  // 0
type IsHundred = $<GetMax, [1, -1, 10, -10, 100, -100]>;  // 100


Another use case for a partially-applied `Reduce` function is to implement
sophisticated higher-order functionality by passing it into other type-level functions.

type GetMinOrJoin = $N<Conditional.If, [
  $<Conditional.Extends, number[]>,
  $N<List.Reduce, [Number.Min, Number.MAX_SAFE_INTEGER]>,
  $<String.Join, ", ">,
]>;

type IsNegativeHundred = $<GetMinOrJoin, [1, -1, 10, -10, 100, -100]>;  // -100
type HelloWorld = $<GetMinOrJoin, ["hello", "world"]>;  // "hello, world"
 


## Utility: List.Remove

`Remove` is a type-level function that takes in a list `T` and a value `X`,
and returns a new list `T` with all instances of the value `X` removed.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The list to remove the value from. |
| X |  | The value to remove. |


For example, we can use `Remove` to remove the value `2` from a list:

```ts
import { $, List } from "hkt-toolbelt";

type Result = $<$<List.Remove, 2>, [1, 2, 3, 2, 4, 2]>; // [1, 3, 4]
```
 


## Utility: List.Repeat

`Repeat` is a type-level function that returns a tuple filled with multiple elements of a specified type.

It takes in two arguments:
`T`, the type to repeat, and `N`, the number of times to repeat `T`.

`Repeat` can handle an output tuple length of up to 2137,
which is larger than 999, the maximum recursion depth limit of TypeScript.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | An unknown type. |
| N |  | A natural number. |

If `N` is not a natural number, returns `never`.



```ts
type Result = $<$<List.Repeat, "a">, 3>; // ["a", "a", "a"]
```


By partially applying a type to `Repeat` using {@see {@link $}}
we can define a type-level function that can repeat that type multiple different number of times.

```ts
type RepeatA = $<List.Repeat, "A">
type RepeatATwice = $<RepeatA, 2> // ["A", "A"]
type RepeatAFiveTimes = $<RepeatA, 5> // ["A", "A", "A", "A", "A"]
```
 


## Utility: List.Reverse

`Reverse` is a type-level function that reverses a tuple.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The tuple to reverse. |


type T0 = $<List.Reverse, [1, 2, 3]> // [3, 2, 1]
 


## Utility: List.ShiftN

`ShiftN` is a type-level function that shifts N elements from the head of an array.

| Argument name | Type | Description |
| -- | -- | -- |
| N |  | The number of elements to shift. |
| T |  | The array to shift elements from. |


type T0 = $<$<List.ShiftN, 1>, ['a', 'b', 'c']> // ['b', 'c']
type T1 = $<$<List.ShiftN, 2>, ['a', 'b', 'c']> // ['c']
 


## Utility: List.Shift

`Shift` is a type-level function that shifts one element from the head of a list.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The list to remove the head from. |


type T0 = $<List.Shift, ['a', 'b', 'c']> // ['b', 'c']
type T1 = $<List.Shift, ['b', 'c']> // ['c']
 


## Utility: List.Slice

`Slice` is a type-level function that extracts and returns a subtuple of specified range from a tuple type.
It takes in three arguments: `START` and `END`, which respectively specify the inclusive start and exclusive end indices of a slice,
and `T`, the tuple that is to be sliced.
Both positive and negative indices are supported, with negative indices being normalized into zero-based indices under the hood.

| Argument name | Type | Description |
| -- | -- | -- |
| START |  | An integer type. |
| END |  | An integer type. |
| T |  | A tuple type. |

## Basic Usage

We apply `Slice` to `START`, `END`, and `T` respectively using the `$` type-level applicator.


type MyList = ['a', 'b', 'c', 'd', 'e'];
// Slice the first two elements of `MyList`.
type Result1 = $<$<$<List.Slice, 0>, 2>, MyList>; // ['a', 'b']
// Slice the last two elements of `MyList`.
type Result2 = $<$<$<List.Slice, -2>, 0>, MyList>; // ['d', 'e']
// Slice the middle three elements of `MyList`.
type Result3 = $<$<$<List.Slice, 1>, -1>, MyList>; // ['b', 'c', 'd']

## Edge Cases

If `START` or `END` is not an integer, returns `never`.
If `START >= T["length"]`, returns empty tuple.
If `START < -T["length"]` or `START` is omitted, `START` is subsituted with 0.
If `END` is greater than or equal to the length of `T`, all elements up to the end are extracted.
If `END` is positioned before or at `START` after normalization, returns empty tuple.
 


## Utility: List.Some

`Some` is a type-level function that checks if some element in a tuple satisfies a predicate.

| Argument name | Type | Description |
| -- | -- | -- |
| F |  | The predicate function. |
| T |  | The tuple to check. |


type T0 = $<$<List.Some, $<Conditional.Extends, number>>, [1, 2, 3, 'x']>  // true
type T1 = $<$<List.Some, $<Conditional.Extends, number>>, ['x', 'y', 'z']> // false
 


## Utility: List.Splice

`Splice` is a type-level function that changes the contents of a tuple type by removing or replacing existing elements and/or adding new elements.

It takes in four arguments:
`T`, the tuple to splice,
`START`, the index at which to start changing the tuple.
`DEL_COUNT`, the number of elements to remove from `T` at the starting index,
`INSERTS`, an array of elements to insert into `T` at the starting index.

Both positive and negative indices are supported for `START`. Negative indices will be normalized into zero-based indices.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The input tuple. |
| START |  | An integer representing the index at which to start splicing. |
| DEL_COUNT |  | A natural number representing the number of elements to remove from T at the starting index. |
| INSERTS |  | An array of elements to insert into T at the starting index. |

## Usage


type MyList = [0, 1, 2, 3, 4]
type Result1 = $<$<$<$<List.Splice, 1>, 2>, []>, [0, 1, 2, 3, 4]>; // [0, 3, 4]
type Result2 = $<<$<$<$<List.Splice, 1>, 2>, ['a', 'b']>, [0, 1, 2, 3, 4]>; // [0, 'a', 'b', 3, 4]
type Result3 = $<$<$<$<List.Splice, -2>, 2>, ['a', 'b']>, [0, 1, 2, 3, 4]>; // [0, 1, 'a', 'b', 4]

## Edge Cases

If `START >= T["length"]`, no element will be deleted, but the method will behave as an adding function, adding as many elements as provided.
If `START < -T["length"]` or `START` is omitted, `START` is subsituted with 0.
If `DEL_COUNT`is greater than or equal to the number of elements after the position specified by `START`, then all the elements from `START` to the end of the array will be deleted.
If `START` is not an integer, or `DEL_COUNT` is not a natural number, returns never.
 


## Utility: List.Times

`Times` is a type-level function that generates a list of numbers from 0 to N-1.

@template N - The length of the list to be generated.
@returns A list of non-negative integer types.
 


## Utility: List.Unique




## Utility: List.Unshift

`List.Unshift` is a type-level function that prepends an item to a list.

| Argument name | Type | Description |
| -- | -- | -- |
| X |  | The item to prepend. |
| T |  | The list to prepend to. |


type T0 = $<$<List.Unshift, 1>, [2, 3, 4]> // [1, 2, 3, 4]
 


## Utility: List.Zip

`Zip` is a type-level function that takes in one array of arrays, `T`,
and returns an array of arrays, where the i-th array contains the i-th element from each of the elements of `T`.

The zip operation stops when the shortest sub-array is exhausted.
Any remaining items in the longer sub-array are ignored, cutting off the result to the length of the shortest sub-array.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | An array of arrays. |


For example, we can use `Zip` to perform parallel iteration over multiple sub-arrays.
In this example, `Zip` is a type-level function that returns an array of arrays.

type Result = $<List.Zip, [[1, 2], ["a", "b", "c"], ["A", "B"]]>; // [[1, "a", "A"], [2, "b", "B"]]
 


# Module: Loop

The `Loop` module contains various utilities for working with loops. Loops
are a type-level programming construct that allows you to repeat a block of
code until a certain condition is met.


```ts
import { $, NaturalNumber, Loop } from 'hkt-toolbelt'

type Result = $<
  $<Loop.Until, $<NaturalNumber.IsGreaterThan, 10>>,
  $<NaturalNumber.Add, 1>,
  0
> // 11
```
 

| Utility name | Description |
| -- | -- |
  | [Until](#utility-loopuntil) | `Until` is a type-level function that takes in a looping clause kind, an update kind, and an initial value, and returns a type that represents the result of looping until the clause is satisfied. |


## Utility: Loop.Until

`Until` is a type-level function that takes in a looping clause kind, an
update kind, and an initial value, and returns a type that represents the
result of looping until the clause is satisfied.

| Argument name | Type | Description |
| -- | -- | -- |
| Clause |  | A type-level function that takes in a value and returns a |
| Updater |  | A type-level function that takes in a value and returns a |
| Initial |  | The initial value to start the loop with. |


For example, we can use `Until` to loop until a number is greater than 10:

```ts
import { $, NaturalNumber, Loop } from "hkt-toolbelt";

type Result = $<
  $<Loop.Until, $<NaturalNumber.IsGreaterThan, 10>>,
  $<NaturalNumber.Add, 1>,
  0
>; // 11
```
 


# Module: Matrix

The `Matrix` module contains various utilities for working with matrices.
Matrices are represented as arrays of arrays, i.e. an array of rows.


```ts
import { $, Matrix } from 'hkt-toolbelt'

type Result = $<Matrix.Columns, [[1, 2, 3], [4, 5, 6]]] // [[1, 4], [2, 5], [3, 6]]
```
 

| Utility name | Description |
| -- | -- |
  | [Chunk](#utility-matrixchunk) | `Chunk` is a type-level function that takes in a number `N` and a matrix `T`, and returns an array of matrices, where each matrix has dimensions `N` x `M`, i.e. N rows and M columns. |
  | [Columns](#utility-matrixcolumns) | `Columns` is a type-level function that takes in a matrix and returns the columns of the matrix. |
  | [Combine](#utility-matrixcombine) | `Combine` is a type-level function that takes in a matrix-of-matrices `T`, and concatenates the matrices into a single matrix. All inner matrices must have the same dimensions (excluding the outer dimension). |
  | [Rows](#utility-matrixrows) | `Rows` is a type-level function that takes in a matrix and returns the rows of the matrix. |
  | [Slice](#utility-matrixslice) | `Slice` is a type-level function that takes in four slice coordinates and a matrix, and returns the slice of the matrix. Coordinates are zero-based. |


## Utility: Matrix.Chunk

`Chunk` is a type-level function that takes in a number `N` and a matrix `T`,
and returns an array of matrices, where each matrix has dimensions `N` x `M`,
i.e. N rows and M columns.

Trailing submatrices have shorter dimensions if the new dimensions do not
divide evenly into the original dimensions.

| Argument name | Type | Description |
| -- | -- | -- |
| N |  | The number of rows in each resulting submatrix. |
| M |  | The number of columns in each resulting submatrix. |
| T |  | The matrix to chunk. |


For example, we can use `Chunk` to chunk a matrix into matrices of dimensions
`N` x `M`:

```ts
import { $, $N, Matrix } from "hkt-toolbelt";

type Result = $<
  $N<Matrix.Chunk, [2, 2]>,
  [[1, 2, 3, 4], [5, 6, 7, 8]]
>; // [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
```
 


## Utility: Matrix.Columns

`Columns` is a type-level function that takes in a matrix and returns the
columns of the matrix.

Since a matrix is represented as an array of arrays, i.e. an array of columns,
this function implements the zip function.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The matrix to get the columns of. |


For example, we can use `Columns` to get the columns of a matrix:

```ts
import { $, Matrix } from "hkt-toolbelt";

type Result = $<Matrix.Columns, [[1, 2, 3], [4, 5, 6]]>; // [[1, 4], [2, 5], [3, 6]]
```
 


## Utility: Matrix.Combine

`Combine` is a type-level function that takes in a matrix-of-matrices `T`,
and concatenates the matrices into a single matrix. All inner matrices must
have the same dimensions (excluding the outer dimension).

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The matrix-of-matrices to concatenate. |


type T0 = $<Matrix.Combine<
  [
    [
      [1, 2], // M1
      [3, 4],
    ],
    [
      [5, 6], // M3
      [7, 8],
    ]
  ],
  [
    [
      ["a", "b"], // M2
      ["c", "d"],
    ],
    [
      ["e", "f"], // M4
      ["g", "h"],
    ]
  ]
> // [[[1, 2, "a", "b"], [5, 6, "e", "f"]], [[3, 4, "c", "d"], [7, 8, "g", "h"]]]
// or [[M1, M2], [M3, M4]]
 


## Utility: Matrix.Rows

`Rows` is a type-level function that takes in a matrix and returns the rows
of the matrix.

Since a matrix is represented as an array of arrays, i.e. an array of rows,
this function implements the identity function.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The matrix to get the rows of. |


For example, we can use `Rows` to get the rows of a matrix:

```ts
import { $, Matrix } from "hkt-toolbelt";

type Result = $<Matrix.Rows, [[1, 2, 3], [4, 5, 6]]>; // [[1, 2, 3], [4, 5, 6]]
```
 


## Utility: Matrix.Slice

`Slice` is a type-level function that takes in four slice coordinates and
a matrix, and returns the slice of the matrix. Coordinates are zero-based.

| Argument name | Type | Description |
| -- | -- | -- |
| ROW_START |  | The starting row of the slice. |
| ROW_END |  | The ending row of the slice. |
| COL_START |  | The starting column of the slice. |
| COL_END |  | The ending column of the slice. |
| T |  | The matrix to get the slice of. |


For example, we can use `Slice` to get a slice of a matrix:

```ts
import { $, $N, Matrix } from "hkt-toolbelt";

type Result = $<
  $N<Matrix.Slice, [1, 2, 1, 2]>,
  [[1, 2, 3], [4, 5, 6]]
>; // [[2, 3], [5, 6]]
```
 


# Module: NaturalNumber

The `NaturalNumber` module contains various utilities for working with
natural numbers, i.e. integers above or equal to zero. It provides utilities
such as addition, comparison, etc.


```ts
import { $, NaturalNumber } from 'hkt-toolbelt'

type Result = $<NaturalNumber.Increment, 5> // 6
```
 

| Utility name | Description |
| -- | -- |
  | [Add](#utility-naturalnumberadd) | `Add` is a type-level function that takes in two natural numbers `A` and `B`, and returns the sum of the two natural numbers. |
  | [Compare](#utility-naturalnumbercompare) | `Compare` is a type-level function that takes in two natural number types `A` and `B`, and returns the comparison result as a number type. The result will be 1 if `A` is greater than `B`, 0 if `A` is equal to `B`, and -1 if `A` is less than `B`. |
  | [Decrement](#utility-naturalnumberdecrement) | `Decrement` is a type-level function that decrements a natural number type. It returns the decremented number. |
  | [DivideBy](#utility-naturalnumberdivideby) | `DivideBy` is a type-level function that takes in two natural number types, `A` and `B`, and returns the result of dividing `B` by `A`. |
  | [Divide](#utility-naturalnumberdivide) | `Divide` is a type-level function that takes in two natural numbers and performs a division operation. It returns the result of the division operation. |
  | [Increment](#utility-naturalnumberincrement) | `Increment` is a type-level function that increments a natural number type. It returns the incremented natural number. |
  | [IsEven](#utility-naturalnumberiseven) | `IsEven` is a type-level function that takes in a natural number type, `A`, and returns a boolean indicating whether `A` is an even number |
  | [IsGreaterThanOrEqual](#utility-naturalnumberisgreaterthanorequal) | `IsGreaterThanOrEqual` is a type-level function that takes in two natural number types, `A` and `B`, and returns a boolean indicating whether `B` is greater than or equal to `A`. |
  | [IsGreaterThan](#utility-naturalnumberisgreaterthan) | `IsGreaterThan` is a type-level function that takes in two natural number types, `A` and `B`, and returns a boolean indicating whether `B` is greater than `A`. |
  | [IsLessThanOrEqual](#utility-naturalnumberislessthanorequal) | `IsLessThanOrEqual` is a type-level function that takes in two natural number types, `A` and `B`, and returns a boolean indicating whether `B` is less than or equal to `A`. |
  | [IsLessThan](#utility-naturalnumberislessthan) | `IsLessThan` is a type-level function that takes in two natural number types, `A` and `B`, and returns a boolean indicating whether `B` is less than `A`. |
  | [IsOdd](#utility-naturalnumberisodd) | `IsOdd` is a type-level function that takes in a natural number type, `A`, and returns a boolean indicating whether `A` is an odd number |
  | [ModuloBy](#utility-naturalnumbermoduloby) | `ModuloBy` is a type-level function that takes in two natural number types, `A` and `B`, and returns the remainder of `B` divided by `A`. |
  | [Modulo](#utility-naturalnumbermodulo) | `Modulo` is a type-level function that takes in two natural number types, `A` and `B`, and returns the remainder of `A` divided by `B`. |
  | [Multiply](#utility-naturalnumbermultiply) | `Multiply` is a type-level function that multiplies a natural number by another natural number. It returns the result of the multiplication operation. |
  | [SubtractBy](#utility-naturalnumbersubtractby) | `SubtractBy` is a type-level function that takes in two natural number types, `A` and `B`, and returns the result of subtracting `A` from `B`. |
  | [Subtract](#utility-naturalnumbersubtract) | `Subtract` is a type-level function that subtracts one natural number from another. It returns the result of the subtraction. |
  | [ToList](#utility-naturalnumbertolist) | Represents a type-level utility to convert a natural number into a list of its digits. The digits are represented as strings. |


## Utility: NaturalNumber.Add

`Add` is a type-level function that takes in two natural numbers `A` and `B`,
and returns the sum of the two natural numbers.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | A natural number to be added to. |
| B | `Number.Number` | A natural number to be added. |

If one or more of the inputs is not zero or a natural number, an error is emitted.


For example, we can use `Add` to add the two natural numbers 123 and 456:

We apply `Add` to 123 and 456 respectively using
the `$` type-level applicator:

```ts
import { $, NaturalNumber } from "hkt-toolbelt"

type Result = $<$<NaturalNumber.Add, 123>, 456> // 579
```


If one of the inputs is not a natural number, `never` is returned.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type IsNever = $<NaturalNumber.Add, -42.42>; // never
```
 


## Utility: NaturalNumber.Compare

`Compare` is a type-level function that takes in
two natural number types `A` and `B`, and returns the comparison result as a number type.
The result will be 1 if `A` is greater than `B`,
0 if `A` is equal to `B`, and -1 if `A` is less than `B`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | A natural number to compare against. |
| B | `Number.Number` | A natural number to compare. |

@returns {-1 | 0 | 1}


For example, we can use `Compare` to compare two natural numbers.
In this example, we compare 123 and 321:

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result1 = $<$<NaturalNumber.Compare, 123>, 321>; // -1
type Result2 = $<$<NaturalNumber.Compare, 321>, 123>; // 1
```
 


## Utility: NaturalNumber.Decrement

`Decrement` is a type-level function that decrements a natural number type.
It returns the decremented number.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | The natural number to decrement. |

If the input is not zero or a natural number, `never` is returned.


For example, we can use `Decrement` to decrement a natural number:

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<NaturalNumber.Decrement, 1>; // 0
```


We can also use `Decrement` with zero as the input.
In this case, the output will also be zero.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<NaturalNumber.Decrement, 0>; // 0
```


If one of the inputs is not a natural number, `never` is returned.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type IsNever = $<NaturalNumber.Decrement, -42.42>; // never
```
 


## Utility: NaturalNumber.DivideBy

`DivideBy` is a type-level function that takes in two natural number types,
`A` and `B`, and returns the result of dividing `B` by `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | A natural number to divide by. |
| B | `Number.Number` | A natural number to be divided. |

The parameters are reversed from `Divide`. This is useful for partial
application, i.e. to test divisibility.


For example, we can apply `DivideBy` to the type argument 3 using the `$` type-level applicator,
and evaluate the results of dividing multiple natural numbers by 3.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type DivideByThree = $<NaturalNumber.DivideBy, 3>;

type Result1 = $<DivideByThree, 3>; // 1
type Result2 = $<DivideByThree, 7>; // 2
```


If one of the inputs is not a natural number, `never` is returned.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type IsNever = $<NaturalNumber.DivideBy, -42.42>; // never
```
 


## Utility: NaturalNumber.Divide

`Divide` is a type-level function that takes in two natural numbers and performs a division operation.
It returns the result of the division operation.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | A natural number to divide. |
| B | `Number.Number` | A natural number to divide by. |

If `A` is not a multiple of `B`, the quotient is returned and the remainder is thrown away.

If either input is not a natural number, `never` is returned.


For example, we can use `Divide` to create a division operation that divides 10 by 2:

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.Divide, 10>, 2>; // 5
```


If `A` is not a multiple of `B`, only the quotient is returned.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.Divide, 100>, 99>; // 1
```


If one of the inputs is not a natural number, `never` is returned.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type IsNever = $<NaturalNumber.Divide, -42.42>; // never
```
 


## Utility: NaturalNumber.Increment

`Increment` is a type-level function that increments a natural number type.
It returns the incremented natural number.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number_.Number` | A natural number to increment. |

If the input is not zero or a natural number, `never` is returned.


For example, we can use `Increment` to increment a natural number:

```ts
import { $, NaturalNumber, Type } from "hkt-toolbelt";

type Result = $<NaturalNumber.Increment, 10>; // 11
```


If the input is not a natural number, `never` is returned.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type IsNever = $<NaturalNumber.Increment, -42.42>; // never
```
 


## Utility: NaturalNumber.IsEven

`IsEven` is a type-level function that takes in a natural number type,
`A`, and returns a boolean indicating whether `A` is an even number

@template {Number.Number} A - A natural number.
@returns {boolean}
 


## Utility: NaturalNumber.IsGreaterThanOrEqual

`IsGreaterThanOrEqual` is a type-level function that takes in two natural number
types, `A` and `B`, and returns a boolean indicating whether `B` is greater
than or equal to `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | The natural number to compare against. |
| B | `Number.Number` | The natural number to compare. |

The parameters are ordered such that `IsGreaterThanOrEqual` can be partially applied
in a coherent manner. That is, we can apply `IsGreaterThanOrEqual` to `3`, and have a
function `IsGreaterThanOrEqualToThree`.


For example, we can use `IsGreaterThanOrEqual` to determine whether a natural number is
greater than another natural number. In this example, `3` and `4` are passed as
type arguments to the type-level function:

We apply `IsGreaterThanOrEqual` to `3`, and then to `4` respectively using the `$`
type-level applicator:

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.IsGreaterThanOrEqual, 3>, 4>; // true
```


If we apply `IsGreaterThanOrEqual` to `3` and `3`, we should expect to get `true`.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.IsGreaterThanOrEqual, 3>, 3>; // true
```


If we apply `IsGreaterThanOrEqual` to `3` and `2`, we should also expect to get
`false`.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.IsGreaterThanOrEqual, 3>, 2>; // false
```
 


## Utility: NaturalNumber.IsGreaterThan

`IsGreaterThan` is a type-level function that takes in two natural number
types, `A` and `B`, and returns a boolean indicating whether `B` is greater
than `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | A number to compare against. |
| B | `Number.Number` | A number to compare. |

The parameters are ordered such that `IsGreaterThan` can be partially applied
in a coherent manner. That is, we can apply `IsGreaterThan` to `3`, and have a
function `IsGreaterThanThree`.


For example, we can use `IsGreaterThan` to determine whether a natural number is
greater than another natural number. In this example, `3` and `4` are passed as
type arguments to the type-level function:

We apply `IsGreaterThan` to `3`, and then to `4` respectively using the `$`
type-level applicator:

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.IsGreaterThan, 3>, 4>; // true
```


If we apply `IsGreaterThan` to `3` and `3`, we should expect to get `false`.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.IsGreaterThan, 3>, 3>; // false
```


If we apply `IsGreaterThan` to `3` and `2`, we should also expect to get
`false`.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.IsGreaterThan, 3>, 2>; // false
```
 


## Utility: NaturalNumber.IsLessThanOrEqual

`IsLessThanOrEqual` is a type-level function that takes in two natural number
types, `A` and `B`, and returns a boolean indicating whether `B` is less
than or equal to `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | A number to compare against. |
| B | `Number.Number` | A number to compare. |

The parameters are ordered such that `IsLessThanOrEqual` can be partially applied
in a coherent manner. That is, we can apply `IsLessThanOrEqual` to `3`, and have a
function `IsLessThanOrEqualToThree`.


For example, we can use `IsLessThanOrEqual` to determine whether a natural number is
less than another natural number. In this example, `3` and `2` are passed as
type arguments to the type-level function:

We apply `IsLessThanOrEqual` to `3`, and then to `2` respectively using the `$`
type-level applicator:

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.IsLessThanOrEqual, 3>, 2>; // true
```


If we apply `IsLessThanOrEqual` to `3` and `3`, we should expect to get `true`.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.IsLessThanOrEqual, 3>, 3>; // true
```


If we apply `IsLessThanOrEqual` to `3` and `4`, we should also expect to get
`false`.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.IsLessThanOrEqual, 3>, 4>; // false
```
 


## Utility: NaturalNumber.IsLessThan

`IsLessThan` is a type-level function that takes in two natural number
types, `A` and `B`, and returns a boolean indicating whether `B` is less
than `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | A natural number to compare against. |
| B | `Number.Number` | A natural number to compare. |

The parameters are ordered such that `IsLessThan` can be partially applied
in a coherent manner. That is, we can apply `IsLessThan` to `3`, and have a
function `IsLessThanThree`.


For example, we can use `IsLessThan` to determine whether a natural number is
less than another natural number. In this example, `3` and `2` are passed as
type arguments to the type-level function:

We apply `IsLessThan` to `3`, and then to `2` respectively using the `$`
type-level applicator:

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.IsLessThan, 3>, 2>; // true
```


If we apply `IsLessThan` to `3` and `3`, we should expect to get `false`.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.IsLessThan, 3>, 3>; // false
```


If we apply `IsLessThan` to `3` and `4`, we should also expect to get
`false`.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.IsLessThan, 3>, 4>; // false
```
 


## Utility: NaturalNumber.IsOdd

`IsOdd` is a type-level function that takes in a natural number type,
`A`, and returns a boolean indicating whether `A` is an odd number

@template {Number.Number} A - A natural number.
@returns {boolean}
 


## Utility: NaturalNumber.ModuloBy

`ModuloBy` is a type-level function that takes in two natural number types,
`A` and `B`, and returns the remainder of `B` divided by `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | The number to divide by to calculate the remainder. |
| B |  | The numerator. |

The parameters are reversed from `Modulo`. This is useful for partial
application, i.e. to test divisibility.

## Usage Examples


For example, we can use `ModuloBy` to determine the remainder of a natural
number divided by another natural number. In this example, `3` and `4` are
passed as type arguments to the type-level function:

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type ModuloByThree = $<NaturalNumber.ModuloBy, 3>;

type Result = $<ModuloByThree, 4>; // 4 % 3 = 1
```
 


## Utility: NaturalNumber.Modulo

`Modulo` is a type-level function that takes in two natural number types,
`A` and `B`, and returns the remainder of `A` divided by `B`.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | The number to divide. |
| B |  | The number to divide by. |

## Usage Examples


For example, we can use `Modulo` to determine the remainder of a natural
number divided by another natural number. In this example, `3` and `2` are
passed as type arguments to the type-level function:

We apply `Modulo` to `3`, and then to `2` respectively using the `$`
type-level applicator:

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.Modulo, 3>, 2>; // 1
```


Here we calculate the remainder of `10` divided by `3`:

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.Modulo, 10>, 3>; // 1
```
 


## Utility: NaturalNumber.Multiply

`Multiply` is a type-level function that multiplies a natural number by another natural number.
It returns the result of the multiplication operation.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | A natural number to multiply. |
| B | `Number.Number` | A natural number to multiply by. |

If one or more of the inputs is not zero or a natural number, an error is emitted.


For example, we can use `Multiply` to multiply a natural number 42 by another natural number 12:

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Is504 = $<$<NaturalNumber.Multiply, 12>, 42>; // 504
```


If one of the inputs is zero, the result will be zero.

```ts
import { NaturalNumber } from "hkt-toolbelt";

type IsZero = $<$<NaturalNumber.Multiply, 0>, 42>; // 0
```


If one of the inputs is not a natural number, `never` is returned.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type IsNever = $<NaturalNumber.Multiply, -42.42>; // never
```
 


## Utility: NaturalNumber.SubtractBy

`SubtractBy` is a type-level function that takes in two natural number types,
`A` and `B`, and returns the result of subtracting `A` from `B`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | A natural number to subtract by. |
| B | `Number.Number` | A natural number to be subtracted from. |

The parameters are reversed from `Subtract`. This is useful for partial
application, i.e. to test divisibility.


For example, we can apply `SubtractBy` to the type argument 3 using the `$` type-level applicator,
and evaluate the results of subtracting multiple natural numbers by 3.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type SubtractByThree = $<NaturalNumber.SubtractBy, 3>;

type Result1 = $<SubtractByThree, 3>; // 0
type Result2 = $<SubtractByThree, 7>; // 4
```


If one of the inputs is not a natural number, `never` is returned.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type IsNever = $<NaturalNumber.SubtractBy, -42.42>; // never
```
 


## Utility: NaturalNumber.Subtract

`Subtract` is a type-level function that subtracts one natural number from
another. It returns the result of the subtraction.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | A natural number to subtract. |
| B | `Number.Number` | A natural number to subtract by. |


For example, we can use `Subtract` to subtract one natural number from another:

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type Result = $<$<NaturalNumber.Subtract, 50>, 25>; // 25
```


If `B` is larger than `A`, zero is returned.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type IsZero = $<$<NaturalNumber.Subtract, 25>, 50>; // 0
```


If one of the inputs is not a natural number, `never` is returned.

```ts
import { $, NaturalNumber } from "hkt-toolbelt";

type IsNever = $<NaturalNumber.Subtract, -42.42>; // never
```
 


## Utility: NaturalNumber.ToList

Represents a type-level utility to convert a natural number into a list of its digits.
The digits are represented as strings.

| Argument name | Type | Description |
| -- | -- | -- |
| F |  | The number to be converted. |

@returns A list of digits representing the number. If the number is not a natural number, it returns `never`.


// Convert the number 42 into a list of digits:
type ListOfDigits = $<NaturalNumber.ToList, 42>; // This will be inferred as ['4', '2']
// Convert the number 0 into a list of digits:
type ZeroList = $<NaturalNumber.ToList, 0>; // This will be inferred as ['0']
 


# Module: NaturalNumberTheory

The `NaturalNumberTheory` module contains various novelty utilities for
computing natural number sequences and operations. It provides utilities such
as collatz, factorial, etc.


```ts
import { $, NaturalNumberTheory } from 'hkt-toolbelt'

type Result = $<NaturalNumberTheory.Factorial, 5> // 120
```
 

| Utility name | Description |
| -- | -- |
  | [CollatzSequence](#utility-naturalnumbertheorycollatzsequence) | `CollatzSequence` is a type-level function that represents the Collatz sequence. This is a sequence of numbers generated by repeatedly applying the Collatz function, starting from a given number, until reaching 1. This sequence is generated using the FixSequence type-level function, which creates a fixed-point sequence for the Collatz function until it reaches a fixed point, which in this case is 1. |
  | [Collatz](#utility-naturalnumbertheorycollatz) | `Collatz` is a type-level function that represents the Collatz function. If the input number is even, it is divided by 2. If the input number is odd, it is multiplied by 3 and then incremented by 1. |
  | [Factorial](#utility-naturalnumbertheoryfactorial) | `Factorial` is a type-level function that calculates the factorial of a number. |
  | [FibnonacciSequence](#utility-naturalnumbertheoryfibnonaccisequence) | `FibonacciSequence` is a type-level function that generates a sequence of Fibonacci numbers, given a desired resultant length, and an initial sequence. |
  | [FizzBuzz](#utility-naturalnumbertheoryfizzbuzz) | A type-level function that returns "FizzBuzz" if the input is divisible by both 3 and 5, "Fizz" if the input is divisible by 3, "Buzz" if the input is divisible by 5, and the input otherwise. |
  | [FizzBuzzSequence](#utility-naturalnumbertheoryfizzbuzzsequence) | A type-level function that returns a list of the FizzBuzz results for the first `N` natural numbers, from 1 to `N` inclusive. |
  | [IsValidSudoku](#utility-naturalnumbertheoryisvalidsudoku) | A type-level function that checks if a given 2D array is a valid Sudoku puzzle. |
  | [MaskInvalidSudokuPlaces](#utility-naturalnumbertheorymaskinvalidsudokuplaces) | Given a 9x9 grid of numbers, mask out all invalid Sudoku places to 'never'. |


## Utility: NaturalNumberTheory.CollatzSequence

`CollatzSequence` is a type-level function that represents the Collatz sequence.
This is a sequence of numbers generated by repeatedly applying the Collatz function,
starting from a given number, until reaching 1. This sequence is generated using the FixSequence type-level function,
which creates a fixed-point sequence for the Collatz function until it reaches a fixed point, which in this case is 1.

Note: We're "artificially" making `Collatz(1)` return `1` so that we can use the fixed sequence operation.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The starting number of the sequence. |


type T0 = $<CollatzSequence, 6> // [6, 3, 10, 5, 16, 8, 4, 2, 1]
type T1 = $<CollatzSequence, 5> // [5, 16, 8, 4, 2, 1]
 


## Utility: NaturalNumberTheory.Collatz

`Collatz` is a type-level function that represents the Collatz function.
If the input number is even, it is divided by 2.
If the input number is odd, it is multiplied by 3 and then incremented by 1.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The input number. |


type T0 = $<Collatz, 6> // 3
type T1 = $<Collatz, 5> // 16
 


## Utility: NaturalNumberTheory.Factorial

`Factorial` is a type-level function that calculates the factorial of a number.

| Argument name | Type | Description |
| -- | -- | -- |
| x |  | The number to calculate the factorial of. |


type T0 = $<Factorial, 5> // 120
type T1 = $<Factorial, 0> // 1
 


## Utility: NaturalNumberTheory.FibnonacciSequence

`FibonacciSequence` is a type-level function that generates a sequence of
Fibonacci numbers, given a desired resultant length, and an initial sequence.


```ts
import { $, NaturalNumberTheory } from "hkt-toolbelt";

type Result = $<
  $<NaturalNumberTheory.FibonacciSequence, 5>,
  [0, 1]
>; // [0, 1, 1, 2, 3]
```
 


## Utility: NaturalNumberTheory.FizzBuzz

A type-level function that returns "FizzBuzz" if the input is divisible by
both 3 and 5, "Fizz" if the input is divisible by 3, "Buzz" if the input is
divisible by 5, and the input otherwise.

This function uses the `Conditional.If` type-level function to encode an
if-then-else statement.

| Argument name | Type | Description |
| -- | -- | -- |
| N |  | The number to compute the FizzBuzz result for. |


```ts
import { $, NaturalNumberTheory } from "hkt-toolbelt"

type R15 = $<NaturalNumberTheory.FizzBuzz, 15> // "FizzBuzz"
type R4 = $<NaturalNumberTheory.FizzBuzz, 4> // 4
```
 


## Utility: NaturalNumberTheory.FizzBuzzSequence

A type-level function that returns a list of the FizzBuzz results for the
first `N` natural numbers, from 1 to `N` inclusive.

| Argument name | Type | Description |
| -- | -- | -- |
| N |  | The number of FizzBuzz results to compute. |


```ts
import { $, NaturalNumberTheory } from "hkt-toolbelt"

// ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz"]
type R10 = $<NaturalNumberTheory.FizzBuzzSequence, 10>
```
 


## Utility: NaturalNumberTheory.IsValidSudoku

A type-level function that checks if a given 2D array is a valid Sudoku
puzzle.

A Sudoku puzzle is a 9x9 grid of numbers where each row, column, and 3x3 box
contains the numbers 1-9 exactly once.

The number 0 represents an uncompleted cell, which is considered valid.

@template T - The 2D array to check.
 


## Utility: NaturalNumberTheory.MaskInvalidSudokuPlaces

Given a 9x9 grid of numbers, mask out all invalid Sudoku places to 'never'.




# Module: Number

The `Number` module contains various utilities for working with
including absolute values, comparisons, etc.


```ts
import { $, Number } from 'hkt-toolbelt'

type Result = $<Number.Absolute, -42> // 42
```
 

| Utility name | Description |
| -- | -- |
  | [Absolute](#utility-numberabsolute) | `Absolute` is a type-level function that takes a number type `T`, and returns its absolute value. |
  | [Compare](#utility-numbercompare) | `Compare` is a type-level function that takes in two number types `A` and `B`, and returns the comparison result as a number type. The result will be 1 if `A` is greater than `B`, 0 if `A` is equal to `B`, and -1 if `A` is less than `B`. |
  | [FromString](#utility-numberfromstring) | `Number.FromString` is a type-level function that converts a string to a number. |
  | [IsFractional](#utility-numberisfractional) | `Number.IsFractional` is a type-level function that checks if a number is fractional. |
  | [IsGreaterThanOrEqual](#utility-numberisgreaterthanorequal) | `IsGreaterThanOrEqual` is a type-level function that takes in two number types, `A` and `B`, and returns a boolean indicating whether `B` is greater than or equal to `A`. |
  | [IsGreaterThan](#utility-numberisgreaterthan) | `IsGreaterThan` is a type-level function that takes in two number types, `A` and `B`, and returns a boolean indicating whether `B` is greater than `A`. |
  | [IsInteger](#utility-numberisinteger) | `Number.IsInteger` is a type-level function that checks if a number is an integer. |
  | [IsLessThanOrEqual](#utility-numberislessthanorequal) | `IsLessThanOrEqual` is a type-level function that takes in two number types, `A` and `B`, and returns a boolean indicating whether `B` is less than or equal to `A`. |
  | [IsLessThan](#utility-numberislessthan) | `IsLessThan` is a type-level function that takes in two number types, `A` and `B`, and returns a boolean indicating whether `B` is less than `A`. |
  | [IsNatural](#utility-numberisnatural) | `Number.IsNatural` is a type-level function that checks if a number is a natural number. In mathematics, natural numbers are either defined as positive integers (1, 2, 3, ...) or non-negative integers (0, 1, 2, 3, ...). In this case, we include 0 in the set of natural numbers. |
  | [Max](#utility-numbermax) | `Number.Max` is a type-level function that returns the maximum of two numbers. |
  | [Min](#utility-numbermin) | `Number.Min` is a type-level function that returns the minimum of two numbers. |
  | [Negate](#utility-numbernegate) | `Negate` is a type-level function that takes a number type `T`, and returns its absolute value. |
  | [MAX_SAFE_INTEGER](#utility-numbermaxsafeinteger) | `MAX_SAFE_INTEGER` is a type that represents the maximum safe integer in JavaScript. |
  | [MIN_SAFE_INTEGER](#utility-numberminsafeinteger) | `MIN_SAFE_INTEGER` is a type that represents the minimum safe integer in JavaScript. |
  | [Number](#utility-numbernumber) | `Number` is a type that represents a number. It can be a string, a number, or a bigint. |
  | [Sign](#utility-numbersign) | `Number.Sign` is a type-level function that returns the sign of a number. In this context, the sign of zero is considered positive. |
  | [ToString](#utility-numbertostring) | `ToString` is a type-level function that converts a number to a string. |


## Utility: Number.Absolute

`Absolute` is a type-level function that takes a number type `T`, and returns its absolute value.

It returns `T` if T >= 0, and `-T` if T < 0.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | A number type. |


```ts
import { Number } from "hkt-toolbelt";

type Result1 = $<Number.Absolute, 42>; // 42
type Result2 = $<Number.Absolute, -42>; // 42
```
 


## Utility: Number.Compare

`Compare` is a type-level function that takes in
two number types `A` and `B`, and returns the comparison result as a number type.
The result will be 1 if `A` is greater than `B`,
0 if `A` is equal to `B`, and -1 if `A` is less than `B`.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | A number type. |
| B |  | A number type. |


For example, we can use `Compare` to compare two numbers.

```ts
import { $, Number } from "hkt-toolbelt";

type Result1 = $<$<Number.Compare, 123>, -321>; // 1
type Result2 = $<$<Number.Compare, -123>, 321>; // -1
```
 


## Utility: Number.FromString

`Number.FromString` is a type-level function that converts a string to a number.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The string to convert to a number. |


type T0 = $<Number.FromString, '123'> // 123
type T1 = $<Number.FromString, 'abc'> // never
 


## Utility: Number.IsFractional

`Number.IsFractional` is a type-level function that checks if a number is fractional.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The number to check. |


type T0 = $<Number.IsFractional, 1.5> // true
type T1 = $<Number.IsFractional, 1> // false
 


## Utility: Number.IsGreaterThanOrEqual

`IsGreaterThanOrEqual` is a type-level function that takes in two number
types, `A` and `B`, and returns a boolean indicating whether `B` is greater
than or equal to `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | A number to compare against. |
| B | `Number.Number` | A number to evaluate. |

The parameters are ordered such that `IsGreaterThanOrEqual` can be partially applied
in a coherent manner. That is, we can apply `IsGreaterThanOrEqual` to `3`, and have a
function `IsGreaterThanOrEqualToThree`.


For example, we can use `IsGreaterThanOrEqual` to determine whether an number is
less than or equal to another number. In this example, `-3` and `-2` are passed as
type arguments to the type-level function:

We apply `IsGreaterThanOrEqual` to `-3`, and then to `-2` respectively using the `$`
type-level applicator:

```ts
import { $, Number } from "hkt-toolbelt";

type Result = $<$<Number.IsGreaterThanOrEqual, -3>, -2.9>; // true
```


If we apply `IsGreaterThanOrEqual` to `-3` and `-3`, we should expect to get `true`.

```ts
import { $, Number } from "hkt-toolbelt";

type Result = $<$<Number.IsGreaterThanOrEqual, -3>, -3>; // true
```


If we apply `IsGreaterThanOrEqual` to `-3` and `-4`, we should also expect to get
`false`.

```ts
import { $, Number } from "hkt-toolbelt";

type Result = $<$<Number.IsGreaterThanOrEqual, -3>, -3.1>; // false
```
 


## Utility: Number.IsGreaterThan

`IsGreaterThan` is a type-level function that takes in two number
types, `A` and `B`, and returns a boolean indicating whether `B` is greater
than `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | A number to compare against. |
| B | `Number.Number` | A number to evaluate. |

The parameters are ordered such that `IsGreaterThan` can be partially applied
in a coherent manner. That is, we can apply `IsGreaterThan` to `3`, and have a
function `IsGreaterThanThree`.


For example, we can use `IsGreaterThan` to determine whether an number is
greater than another number. In this example, `-2.9` and `-3` are passed as
type arguments to the type-level function:

We apply `IsGreaterThan` to `-3`, and then to `-2.9` respectively using the `$`
type-level applicator:

```ts
import { $, Number } from "hkt-toolbelt";

type Result = $<$<Number.IsGreaterThan, -3>, -2.9>; // true
```


If we apply `IsGreaterThan` to `-3` and `-3`, we should expect to get `false`.

```ts
import { $, Number } from "hkt-toolbelt";

type Result = $<$<Number.IsGreaterThan, -3>, -3>; // false
```


If we apply `IsGreaterThan` to `-3` and `-3.1`, we should expect to get `false`.

```ts
import { $, Number } from "hkt-toolbelt";

type Result = $<$<Number.IsGreaterThan, -3>, -3.1>; // false
```
 


## Utility: Number.IsInteger

`Number.IsInteger` is a type-level function that checks if a number is an integer.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The number to check. |


type T0 = $<Number.IsInteger, 1> // true
type T1 = $<Number.IsInteger, 1.5> // false
 


## Utility: Number.IsLessThanOrEqual

`IsLessThanOrEqual` is a type-level function that takes in two number
types, `A` and `B`, and returns a boolean indicating whether `B` is less
than or equal to `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | A number to compare against. |
| B | `Number.Number` | A number to evaluate. |

The parameters are ordered such that `IsLessThanOrEqual` can be partially applied
in a coherent manner. That is, we can apply `IsLessThanOrEqual` to `3`, and have a
function `IsLessThanOrEqualToThree`.


For example, we can use `IsLessThanOrEqual` to determine whether an number is
less than or equal to another number. In this example, `-3` and `-4` are passed as
type arguments to the type-level function:

We apply `IsLessThanOrEqual` to `-3`, and then to `-3.1` respectively using the `$`
type-level applicator:

```ts
import { $, Number } from "hkt-toolbelt";

type Result = $<$<Number.IsLessThanOrEqual, -3>, -3.1>; // true
```


If we apply `IsLessThanOrEqual` to `-3` and `-3`, we should expect to get `true`.

```ts
import { $, Number } from "hkt-toolbelt";

type Result = $<$<Number.IsLessThanOrEqual, -3>, -3>; // true
```


If we apply `IsLessThanOrEqual` to `-3` and `3.1`, we should also expect to get
`false`.

```ts
import { $, Number } from "hkt-toolbelt";

type Result = $<$<Number.IsLessThanOrEqual, -3>, 3.1>; // false
```
 


## Utility: Number.IsLessThan

`IsLessThan` is a type-level function that takes in two number
types, `A` and `B`, and returns a boolean indicating whether `B` is less
than `A`.

| Argument name | Type | Description |
| -- | -- | -- |
| A | `Number.Number` | A number to compare against. |
| B | `Number.Number` | A number to compare. |

The parameters are ordered such that `IsLessThan` can be partially applied
in a coherent manner. That is, we can apply `IsLessThan` to `3`, and have a
function `IsLessThanThree`.


For example, we can use `IsLessThan` to determine whether an number is
less than another number. In this example, `-3.1` and `-3` are passed as
type arguments to the type-level function:

We apply `IsLessThan` to `-3`, and then to `-3.1` respectively using the `$`
type-level applicator:

```ts
import { $, Number } from "hkt-toolbelt";

type Result = $<$<Number.IsLessThan, -3>, -3.1>; // true
```


If we apply `IsLessThan` to `-3` and `-3`, we should expect to get `false`.

```ts
import { $, Number } from "hkt-toolbelt";

type Result = $<$<Number.IsLessThan, -3>, -3>; // false
```


If we apply `IsLessThan` to `-3` and `3.1`, we should expect to get `false`.

```ts
import { $, Number } from "hkt-toolbelt";

type Result = $<$<Number.IsLessThan, -3>, 3.1>; // false
```
 


## Utility: Number.IsNatural

`Number.IsNatural` is a type-level function that checks if a number is a natural number.
In mathematics, natural numbers are either defined as positive integers (1, 2, 3, ...) or non-negative integers (0, 1, 2, 3, ...).
In this case, we include 0 in the set of natural numbers.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The number to check. |


type T0 = $<Number.IsNatural, 1> // true
type T1 = $<Number.IsNatural, 0> // true
type T2 = $<Number.IsNatural, -1> // false
type T3 = $<Number.IsNatural, 1.5> // false
 


## Utility: Number.Max

`Number.Max` is a type-level function that returns the maximum of two numbers.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | The first number. |
| B |  | The second number. |


type T0 = $<$<Number.Max, 1>, 2> // 2
type T1 = $<$<Number.Max, 5>, 10> // 10
 


## Utility: Number.Min

`Number.Min` is a type-level function that returns the minimum of two numbers.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | The first number. |
| B |  | The second number. |


type T0 = $<$<Number.Min, 1>, 2> // 1
type T1 = $<$<Number.Min, 5>, 10> // 5
 


## Utility: Number.Negate

`Negate` is a type-level function that takes a number type `T`, and returns its absolute value.

It returns `-T` if T >= 0, and `T` if T < 0.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | A number type. |


```ts
import { Number } from "hkt-toolbelt";

type Result1 = $<Number.Negate, 42>; // -42
type Result2 = $<Number.Negate, -42>; // 42
```
 


## Utility: Number.MAX_SAFE_INTEGER

`MAX_SAFE_INTEGER` is a type that represents the maximum safe integer in JavaScript.




## Utility: Number.MIN_SAFE_INTEGER

`MIN_SAFE_INTEGER` is a type that represents the minimum safe integer in JavaScript.




## Utility: Number.Number

`Number` is a type that represents a number. It can be a string, a number, or a bigint.




## Utility: Number.Sign

`Number.Sign` is a type-level function that returns the sign of a number.
In this context, the sign of zero is considered positive.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The number to get the sign of. |


type T0 = $<Number.Sign, 5> // '+'
type T1 = $<Number.Sign, -5> // '-'
type T2 = $<Number.Sign, 0> // '+'
 


## Utility: Number.ToString

`ToString` is a type-level function that converts a number to a string.

| Argument name | Type | Description |
| -- | -- | -- |
| N |  | The number to convert to a string. |


type T0 = $<ToString, 5> // '5'
 


# Module: Object

The `Object` module contains various utilities for working with
objects, including getting and setting values, merging, etc.


```ts
import { $, Object } from 'hkt-toolbelt'

type Result = $<Object.AtPath, ['name', 'first'], { name: { first: 'foo' } }> // 'foo'
```
 

| Utility name | Description |
| -- | -- |
  | [AtPathN](#utility-objectatpathn) | `AtPathN` is a type-level function that retrieves values from nested properties of an object based on a path. |
  | [AtPath](#utility-objectatpath) |  |
  | [At](#utility-objectat) | `At` is a type-level function that returns the value at a given key in an object. |
  | [DeepInputOf](#utility-objectdeepinputof) | Given a higher-kinded type `K`, returns a union of either the input of `K`, or a recursive object whose values are exclusively the input of `K`. |
  | [DeepMapValues](#utility-objectdeepmapvalues) |  |
  | [Emplace](#utility-objectemplace) |  |
  | [KeyOrPath](#utility-objectkeyorpath) |  |
  | [Keys](#utility-objectkeys) |  |
  | [MapKeys](#utility-objectmapkeys) |  |
  | [MapValues](#utility-objectmapvalues) |  |
  | [Merge](#utility-objectmerge) |  |
  | [Paths](#utility-objectpaths) |  |
  | [UpdateN](#utility-objectupdaten) | `UpdateN` is a type-level function that updates nested properties of an object based on multiple paths. |
  | [Update](#utility-objectupdate) | `Update` is a type-level function that updates nested properties of an object. |
  | [Values](#utility-objectvalues) |  |


## Utility: Object.AtPathN

`AtPathN` is a type-level function that retrieves values from nested properties of an object based on a path.




## Utility: Object.AtPath




## Utility: Object.At

`At` is a type-level function that returns the value at a given key in an object.

| Argument name | Type | Description |
| -- | -- | -- |
| K |  | The key to get the value of. |


type T0 = $<$<Object.At, 'a'>, { a: 1; b: 2; c: 3 }> // 1
type T1 = $<$<Object.At, 'b'>, { a: 1; b: 2; c: 3 }> // 2
 


## Utility: Object.DeepInputOf

Given a higher-kinded type `K`, returns a union of either the input of `K`,
or a recursive object whose values are exclusively the input of `K`.


$<Object.DeepInputOf, Number.IsInteger>>
// number | { [key: string]: number | { [key: string]: number | { ... } } }
 


## Utility: Object.DeepMapValues




## Utility: Object.Emplace




## Utility: Object.KeyOrPath




## Utility: Object.Keys




## Utility: Object.MapKeys




## Utility: Object.MapValues




## Utility: Object.Merge




## Utility: Object.Paths




## Utility: Object.UpdateN

`UpdateN` is a type-level function that updates nested properties of an object based on multiple paths.




## Utility: Object.Update

`Update` is a type-level function that updates nested properties of an object.




## Utility: Object.Values




# Module: Parser

The `Parser` module contains various utilities for building type-level
parsers, which take in a string literal and return a type representing the
result of parsing the string.

These utilities are particularly useful for parsing input strings and
converting them into more meaningful types.


```ts
import { $, Parser } from "hkt-toolbelt";

type Result = $<
  $<
    Parser.Run,
    $<
      Parser.Sequence,
      [$<Parser.String, 'hello'>, $<Parser.String, ' '>, Parser.Letters]
    >
  >,
  'hello worlds'
> // ["hello", " ", "worlds"]
```
 

| Utility name | Description |
| -- | -- |
  | [Choice](#utility-parserchoice) |  |
  | [Letter](#utility-parserletter) |  |
  | [Letters](#utility-parserletters) |  |
  | [Many1](#utility-parsermany1) |  |
  | [Map](#utility-parsermap) |  |
  | [ObjectSequence](#utility-parserobjectsequence) |  |
  | [Optional](#utility-parseroptional) |  |
  | [Parser](#utility-parserparser) |  |
  | [Run](#utility-parserrun) |  |
  | [Sequence](#utility-parsersequence) |  |
  | [String](#utility-parserstring) |  |
  | [TakeSequence](#utility-parsertakesequence) |  |


## Utility: Parser.Choice




## Utility: Parser.Letter




## Utility: Parser.Letters




## Utility: Parser.Many1




## Utility: Parser.Map




## Utility: Parser.ObjectSequence




## Utility: Parser.Optional




## Utility: Parser.Parser




## Utility: Parser.Run




## Utility: Parser.Sequence




## Utility: Parser.String




## Utility: Parser.TakeSequence




# Module: Stress

The `Stress` module contains various utilities for stress testing
type-level functions, including generating large tuples and objects. This is
used internally to ensure that type-level functions are robust and can handle
large inputs without crashing.


```ts
import { $, Stress, List } from 'hkt-toolbelt'

type Result = $<List.Length, Stress.HundredTuple> // 100
```
 

| Utility name | Description |
| -- | -- |
  | [HundredBooleanList](#utility-stresshundredbooleanlist) |  |
  | [HundredFalseList](#utility-stresshundredfalselist) |  |
  | [HundredTrueList](#utility-stresshundredtruelist) |  |
  | [HundredNumberList](#utility-stresshundrednumberlist) |  |
  | [HundredString](#utility-stresshundredstring) |  |
  | [HundredTuple](#utility-stresshundredtuple) |  |
  | [TenBooleanList](#utility-stresstenbooleanlist) |  |
  | [TenFalseList](#utility-stresstenfalselist) |  |
  | [TenTrueList](#utility-stresstentruelist) |  |
  | [TenNumberList](#utility-stresstennumberlist) |  |
  | [TenString](#utility-stresstenstring) |  |
  | [TenTuple](#utility-stresstentuple) |  |
  | [ThousandBooleanList](#utility-stressthousandbooleanlist) |  |
  | [ThousandFalseList](#utility-stressthousandfalselist) |  |
  | [ThousandTrueList](#utility-stressthousandtruelist) |  |
  | [ThousandNumberList](#utility-stressthousandnumberlist) |  |
  | [ThousandString](#utility-stressthousandstring) |  |
  | [ThousandTuple](#utility-stressthousandtuple) |  |


## Utility: Stress.HundredBooleanList




## Utility: Stress.HundredFalseList




## Utility: Stress.HundredTrueList




## Utility: Stress.HundredNumberList




## Utility: Stress.HundredString




## Utility: Stress.HundredTuple




## Utility: Stress.TenBooleanList




## Utility: Stress.TenFalseList




## Utility: Stress.TenTrueList




## Utility: Stress.TenNumberList




## Utility: Stress.TenString




## Utility: Stress.TenTuple




## Utility: Stress.ThousandBooleanList




## Utility: Stress.ThousandFalseList




## Utility: Stress.ThousandTrueList




## Utility: Stress.ThousandNumberList




## Utility: Stress.ThousandString




## Utility: Stress.ThousandTuple




# Module: String

The `String` module contains various utilities for working with
strings, including manipulating string types, joining strings, etc.


```ts
import { $, String } from 'hkt-toolbelt'

type Result = $<$<String.Append, 'bar'>, 'foo'> // 'foobar'
```
 

| Utility name | Description |
| -- | -- |
  | [Append](#utility-stringappend) | `String.Append` is a type-level function that appends a suffix to a string. |
  | [EndsWith](#utility-stringendswith) | `String.EndsWith` is a type-level function that checks if a string ends with a given suffix. |
  | [First](#utility-stringfirst) | `String.First` is a type-level function that extracts the first character from a string. |
  | [FromList](#utility-stringfromlist) | `String.FromList` is a type-level function that joins a list of strings into a single string. |
  | [Includes](#utility-stringincludes) | `String.Includes` is a type-level function that checks if a string includes a given infix. |
  | [Init](#utility-stringinit) | `String.Init` is a type-level function that extracts every element before the last element of a string. |
  | [IsString](#utility-stringisstring) | `String.IsString` is a type-level function that checks if a type is a string. |
  | [IsTemplate](#utility-stringistemplate) | `String.IsTemplate` is a type-level function that checks if a string is a template literal string. A template literal string is a string that includes embedded expressions, which will be evaluated and then converted into a resulting string. |
  | [Join](#utility-stringjoin) | `String.Join` is a type-level function that joins an array of strings into a single string. |
  | [Last](#utility-stringlast) | `String.Last` is a type-level function that extracts the last character from a string. |
  | [Length](#utility-stringlength) | `String.Length` is a type-level function that returns the length of a string. |
  | [Prepend](#utility-stringprepend) | `String.Prepend` is a type-level function that prepends a prefix to a string. |
  | [Replace](#utility-stringreplace) | `String.Replace` is a type-level function that replaces all instances of a string with another string. |
  | [Reverse](#utility-stringreverse) | `String.Reverse` is a type-level function that reverses the order of characters in a string. |
  | [Slice](#utility-stringslice) | `String.Slice` is a type-level function that slices a string from a given index. |
  | [Split](#utility-stringsplit) | `String.Split` is a type-level function that splits a string into an array of substrings. |
  | [StartsWith](#utility-stringstartswith) | `String.StartsWith` is a type-level function that checks if a string starts with a given prefix. |
  | [Tail](#utility-stringtail) | `String.Tail` is a type-level function that extracts every element after the first element of a string. |
  | [ToList](#utility-stringtolist) | `String.ToList` is a type-level function that splits a string into a list of its characters. |
  | [ToLower](#utility-stringtolower) | `String.ToLower` is a type-level function that converts a string to lowercase. |
  | [ToUpper](#utility-stringtoupper) | `String.ToUpper` is a type-level function that converts a string to uppercase. |


## Utility: String.Append

`String.Append` is a type-level function that appends a suffix to a string.

| Argument name | Type | Description |
| -- | -- | -- |
| Suffix |  | The string to append. |
| S |  | The original string. |


type T0 = $<$<String.Append, 'bar'>, 'foo'> // 'foobar'
type T1 = $<$<String.Append, ''>, 'foo'> // 'foo'
 


## Utility: String.EndsWith

`String.EndsWith` is a type-level function that checks if a string ends with a given suffix.

| Argument name | Type | Description |
| -- | -- | -- |
| Suffix |  | The suffix to check for. |
| S |  | The string to check. |


type T0 = $<$<String.EndsWith, 'bar'>, 'foobar'> // true
type T1 = $<$<String.EndsWith, 'foo'>, 'foobar'> // false
 


## Utility: String.First

`String.First` is a type-level function that extracts the first character from a string.

| Argument name | Type | Description |
| -- | -- | -- |
| S |  | The string to extract the first character from. |


type T0 = $<String.First, 'hello'> // 'h'
type T1 = $<String.First, ''> // ''
 


## Utility: String.FromList

`String.FromList` is a type-level function that joins a list of strings into a single string.


type T0 = $<String.FromList, ['hello', ' ', 'world']> // 'hello world'
type T1 = $<String.FromList, []> // ''
 


## Utility: String.Includes

`String.Includes` is a type-level function that checks if a string includes a given infix.

| Argument name | Type | Description |
| -- | -- | -- |
| Infix |  | The infix to check for. |
| S |  | The string to check. |


type T0 = $<$<String.Includes, 'oba'>, 'foobar'> // true
type T1 = $<$<String.Includes, 'qux'>, 'foobar'> // false
 


## Utility: String.Init

`String.Init` is a type-level function that extracts every element before the last element of a string.

| Argument name | Type | Description |
| -- | -- | -- |
| S |  | The string to extract the init from. |


type T0 = $<String.Init, 'foo'> // 'fo'
type T1 = $<String.Init, ''> // ''
 


## Utility: String.IsString

`String.IsString` is a type-level function that checks if a type is a string.

| Argument name | Type | Description |
| -- | -- | -- |
| S |  | The type to check. |


type T0 = $<String.IsString, 'hello'> // true
type T1 = $<String.IsString, 123> // false
 


## Utility: String.IsTemplate

`String.IsTemplate` is a type-level function that checks if a string is a template literal string.
A template literal string is a string that includes embedded expressions, which will be evaluated and then converted into a resulting string.

| Argument name | Type | Description |
| -- | -- | -- |
| S |  | The string to check. |


type T0 = $<String.IsTemplate, `foo${string}`> // true
type T1 = $<String.IsTemplate, string> // false
 


## Utility: String.Join

`String.Join` is a type-level function that joins an array of strings into a single string.

| Argument name | Type | Description |
| -- | -- | -- |
| D |  | The delimiter to use when joining the strings. |
| T |  | The array of strings to join. |


type T0 = $<$<String.Join, ''>, ['foo', 'bar']> // 'foobar'
type T1 = $<$<String.Join, ' '>, ['foo', 'bar', 'qux']> // 'foo bar qux'
 


## Utility: String.Last

`String.Last` is a type-level function that extracts the last character from a string.

| Argument name | Type | Description |
| -- | -- | -- |
| S |  | The string to extract the last character from. |


type T0 = $<String.Last, 'foo'> // 'o'
type T1 = $<String.Last, ''> // ''
 


## Utility: String.Length

`String.Length` is a type-level function that returns the length of a string.

| Argument name | Type | Description |
| -- | -- | -- |
| S |  | The string to get the length of. |


type T0 = $<String.Length, 'hello'> // 5
type T1 = $<String.Length, ''> // 0
 


## Utility: String.Prepend

`String.Prepend` is a type-level function that prepends a prefix to a string.

| Argument name | Type | Description |
| -- | -- | -- |
| Prefix |  | The prefix to prepend. |
| S |  | The string to prepend to. |


type T0 = $<$<String.Prepend, 'foo'>, 'bar'> // 'foobar'
type T1 = $<$<String.Prepend, ''>, 'foo'> // 'foo'
 


## Utility: String.Replace

`String.Replace` is a type-level function that replaces all instances of a string with another string.

| Argument name | Type | Description |
| -- | -- | -- |
| From |  | The string to replace. |
| To |  | The string to replace with. |
| S |  | The string to replace in. |


type T0 = $<$<$<String.Replace, 'foo'>, 'bar'>, 'foobar'> // 'barbar'
type T1 = $<$<$<String.Replace, 'foo'>, ''>, 'foo'> // ''
 


## Utility: String.Reverse

`String.Reverse` is a type-level function that reverses the order of characters in a string.

| Argument name | Type | Description |
| -- | -- | -- |
| S |  | The string to reverse. |


type T0 = $<String.Reverse, 'foo'> // 'oof'
type T1 = $<String.Reverse, ''> // ''
 


## Utility: String.Slice

`String.Slice` is a type-level function that slices a string from a given index.

| Argument name | Type | Description |
| -- | -- | -- |
| N |  | The index from which to start the slice. |
| S |  | The string to slice. |


type T0 = $<$<String.Slice, 1>, 'hello'> // 'ello'
type T1 = $<$<String.Slice, 0>, 'hello'> // 'hello'
 


## Utility: String.Split

`String.Split` is a type-level function that splits a string into an array of substrings.

| Argument name | Type | Description |
| -- | -- | -- |
| S |  | The string to split. |
| Delimiter |  | The delimiter to split the string by. |


type T0 = $<$<String.Split, ''>, 'foobar'> // ['f', 'o', 'o', 'b', 'a', 'r']
type T1 = $<$<String.Split, ' '>, 'foo bar'> // ['foo', 'bar']
 


## Utility: String.StartsWith

`String.StartsWith` is a type-level function that checks if a string starts with a given prefix.

| Argument name | Type | Description |
| -- | -- | -- |
| Prefix |  | The prefix to check for. |
| S |  | The string to check. |


type T0 = $<$<String.StartsWith, 'foo'>, 'foobar'> // true
type T1 = $<$<String.StartsWith, 'bar'>, 'foobar'> // false
 


## Utility: String.Tail

`String.Tail` is a type-level function that extracts every element after the first element of a string.

| Argument name | Type | Description |
| -- | -- | -- |
| S |  | The string to extract the tail from. |


type T0 = $<String.Tail, 'hello'> // 'ello'
type T1 = $<String.Tail, ''> // ''
 


## Utility: String.ToList

`String.ToList` is a type-level function that splits a string into a list of its characters.

| Argument name | Type | Description |
| -- | -- | -- |
| S |  | The string to split. |


type T0 = $<String.ToList, 'hello'> // ['h', 'e', 'l', 'l', 'o']
type T1 = $<String.ToList, ''> // []
 


## Utility: String.ToLower

`String.ToLower` is a type-level function that converts a string to lowercase.

| Argument name | Type | Description |
| -- | -- | -- |
| S |  | The string to convert to lowercase. |


type T0 = $<String.ToLower, 'HELLO'> // 'hello'
type T1 = $<String.ToLower, 'WORLD'> // 'world'
 


## Utility: String.ToUpper

`String.ToUpper` is a type-level function that converts a string to uppercase.

| Argument name | Type | Description |
| -- | -- | -- |
| S |  | The string to convert to uppercase. |


type T0 = $<String.ToUpper, 'foo'> // 'FOO'
type T1 = $<String.ToUpper, 'bar'> // 'BAR'
 


# Module: Test

The `Test` module contains various utilities for testing type-level
functions, including expecting types to be equal, etc. This is used
internally to ensure correctness.


```ts
import { $, Test } from 'hkt-toolbelt'

type Result = Test.Expect<true, false> // compiler error
```
 

| Utility name | Description |
| -- | -- |
  | [ExpectNot](#utility-testexpectnot) | `ExpectNot` is a type-level function that checks if a type `X` does not equal a type `V`. It causes a compiler error to be emitted if the types are equivalent. |
  | [Expect](#utility-testexpect) | `Expect` is a type-level function that checks if a type `X` equals a type `V`. If `X` equals `V`, it returns `V`. If `X` does not equal `V`, it returns `V & _`. If `V` is never, it returns `X`. If `X` is never, it returns `Expect<X, V>`. The purpose of this function is to cause a compiler error to be emitted if the types are not equivalent. |


## Utility: Test.ExpectNot

`ExpectNot` is a type-level function that checks if a type `X` does not equal a type `V`.
It causes a compiler error to be emitted if the types are equivalent.

| Argument name | Type | Description |
| -- | -- | -- |
| X |  | The type to check. |
| V |  | The type to compare with. Defaults to `false`. |


type T0 = ExpectNot<true, false> // true
type T1 = ExpectNot<true, true> // Compiler error
 


## Utility: Test.Expect

`Expect` is a type-level function that checks if a type `X` equals a type `V`.
If `X` equals `V`, it returns `V`. If `X` does not equal `V`, it returns `V & _`.
If `V` is never, it returns `X`. If `X` is never, it returns `Expect<X, V>`.
The purpose of this function is to cause a compiler error to be emitted if the types are not equivalent.

Finally, if `never` is provided and it doesn't match, we cause an infinite
loop error to be emitted so that the tests fail.

| Argument name | Type | Description |
| -- | -- | -- |
| X |  | The type to check. |
| V |  | The type to compare with. Default is `true`. |


type T0 = Expect<true> // true
type T1 = Expect<false> // false & _ (compiler error)
type T2 = Expect<number, true> // true & _ (compiler error)
type T3 = Expect<never, true> // Expect<never, true> (inf compiler error)
 


# Module: Type

The `Type` module contains various utilities for working with
types, including casting, displaying, and inferring types.


```ts
import { $, Type } from 'hkt-toolbelt'

type Result = Type._$cast<42, number> // 42
```
 

| Utility name | Description |
| -- | -- |
  | [Assert](#utility-typeassert) | `Assert` is a type-level function that casts a type `T` to a type `U`, but only if `U` is a more or less specific version of `T`. If an impossible coercion to an unrelated type is attempted, it returns `never`. |
  | [Cast](#utility-typecast) | `Cast` is a type-level function that coercively downcasts a type `T` to a type `U`. Returns the narrower out of the two types. If the two types are unrelated, returns `U`. |
  | [Display](#utility-typedisplay) | `Display` is a type-level function that forces the compiler to resolve types such that IDEs can display them on hover. |
  | [Infer](#utility-typeinfer) | `Infer` is a type-level function that infers the most specific type of a value. |
  | [Intersect](#utility-typeintersect) | `Intersect` is a type-level function that takes two types `A` and `B`, and returns the intersection of `A` and `B`. |
  | [IntersectAll](#utility-typeintersectall) | `IntersectAll` is a type-level function that takes a tuple of types `T`, and returns the intersection of all types in `T`. |
  | [IsNever](#utility-typeisnever) | `IsNever` is a type-level function that checks if a type is `never`. |
  | [Union](#utility-typeunion) | `Union` is a type-level function that takes two types `A` and `B`, and returns the union of `A` and `B`. |
  | [UnionAll](#utility-typeunionall) | `UnionAll` is a type-level function that takes a tuple of types `T`, and returns the union of all types in `T`. |
  | [ValueOf](#utility-typevalueof) | `ValueOf` is a type-level function that extracts the values associated with the type, if any exist, via `keyof`. For arrays, values consist of their elements, while for objects, values consist of the values associated with each key. In both circumstances, we receive a union of all possible entries. |


## Utility: Type.Assert

`Assert` is a type-level function that casts a type `T` to a type `U`, but only if `U` is a more or less specific version of `T`.
If an impossible coercion to an unrelated type is attempted, it returns `never`.

This behavior is modeled after TypeScript's type assertion using the `as` operator.

@see {@link Type._$cast} for a more permissive version of this function that only performs downcasts or coercions to unrelated types.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The type to assert. |
| U |  | The type to assert to. |


type T0 = $<$<Assert, true>, true> // true
type T1 = $<$<Assert, boolean>, true> // true
type T2 = $<$<Assert, true>, boolean> // boolean
type T3 = $<$<Assert, boolean>, 0> // never
 


## Utility: Type.Cast

`Cast` is a type-level function that coercively downcasts a type `T` to a type `U`.
Returns the narrower out of the two types. If the two types are unrelated, returns `U`.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The type to cast. |
| U |  | The type to cast to. |


type T0 = $<$<Cast, true>, true> // true
type T1 = $<$<Cast, boolean>, true> // true
type T2 = $<$<Cast, true>, boolean> // true
type T3 = $<$<Cast, boolean>, 0> // 0
 


## Utility: Type.Display

`Display` is a type-level function that forces the compiler to resolve
types such that IDEs can display them on hover.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The type to be displayed. |


type T0 = $<Display, 'foo'> // 'foo'
 


## Utility: Type.Infer

`Infer` is a type-level function that infers the most specific type of a value.

| Argument name | Type | Description |
| -- | -- | -- |
| X |  | The value to infer the type of. |


type T0 = $<Infer, 'foo'> // 'foo'


// Demonstrating usage of Infer for const parameters in functions
function inferType<T>(x: $<Type.Infer, T>): typeof x {
  return x
}

const x = inferType(['foo', { x: ['x'] }, 'bar', ['foo']])
// x is inferred as ['foo', { x: ['x'] }, 'bar', ['foo']]
 


## Utility: Type.Intersect

`Intersect` is a type-level function that takes two types `A` and `B`, and
returns the intersection of `A` and `B`.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | The first type to intersect. |
| B |  | The second type to intersect. |


```ts
type T0 = $<Intersect, [], number> // [] & number
type T1 = $<Intersect, string, string> // string
```
 


## Utility: Type.IntersectAll

`IntersectAll` is a type-level function that takes a tuple of types `T`, and
returns the intersection of all types in `T`.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The tuple of types to intersect. |


```ts
type T0 = $<IntersectAll, [number, string]> // number & string
type T1 = $<IntersectAll, [string, string]> // string
```
 


## Utility: Type.IsNever

`IsNever` is a type-level function that checks if a type is `never`.

| Argument name | Type | Description |
| -- | -- | -- |
| X |  | The type to check. |


type T0 = $<IsNever, '1'> // false
type T1 = $<IsNever, never> // true
type T2 = $<IsNever, unknown> // false
type T3 = $<IsNever, any> // false
 


## Utility: Type.Union

`Union` is a type-level function that takes two types `A` and `B`, and
returns the union of `A` and `B`.

| Argument name | Type | Description |
| -- | -- | -- |
| A |  | The first type to union. |
| B |  | The second type to union. |


```ts
type T0 = $<Union, [], number> // number
type T1 = $<Union, string, string> // string
```
 


## Utility: Type.UnionAll

`UnionAll` is a type-level function that takes a tuple of types `T`, and
returns the union of all types in `T`.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The tuple of types to union. |


```ts
type T0 = $<UnionAll, [number, string]> // number | string
type T1 = $<UnionAll, [string, string]> // string
```
 


## Utility: Type.ValueOf

`ValueOf` is a type-level function that extracts the values associated
with the type, if any exist, via `keyof`. For arrays, values consist of their
elements, while for objects, values consist of the values associated with each key.
In both circumstances, we receive a union of all possible entries.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The type to extract values from. |


type T0 = $<ValueOf, ['foo', 'bar']> // 'foo' | 'bar'
type T1 = $<ValueOf, { foo: 'foo'; bar: 'bar' }> // 'foo' | 'bar'
 


# Module: Union

The `Union` module contains various utilities for working with union types,
including converting to intersections, lists, etc.


```ts
import { $, Union } from 'hkt-toolbelt'

type Result = $<Union.Length, { foo: 'bar' } | 'bar' | { bar: 'foo' }> // 3
```
 

| Utility name | Description |
| -- | -- |
  | [FromList](#utility-unionfromlist) | `Union.FromList` is a type-level function that converts a list to a union. |
  | [Length](#utility-unionlength) | `Union.Length` is a type-level function that returns the length of a union. Notably, for 'boolean', the length is 2 due to it being `true | false`. |
  | [ToIntersection](#utility-uniontointersection) | `ToIntersection` is a type-level function that converts a type to an intersection type. An intersection type combines multiple types into one. This allows you to add together existing types to get a single type that has all the features you need. |
  | [ToList](#utility-uniontolist) | `ToList` is a type-level function that converts a union type to a list (tuple) type. |


## Utility: Union.FromList

`Union.FromList` is a type-level function that converts a list to a union.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The list to convert to a union. |


type T0 = $<Union.FromList, [1, 2, 3]> // 1 | 2 | 3
type T1 = $<Union.FromList, []> // never
 


## Utility: Union.Length

`Union.Length` is a type-level function that returns the length of a union.
Notably, for 'boolean', the length is 2 due to it being `true | false`.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The union to get the length of. |


type T0 = $<Union.Length, 1 | 2 | 3> // 3
type T1 = $<Union.Length, never> // 0
type T2 = $<Union.Length, boolean> // 2
 


## Utility: Union.ToIntersection

`ToIntersection` is a type-level function that converts a type to an intersection type.
An intersection type combines multiple types into one. This allows you to add together existing types to get a single type that has all the features you need.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The type to convert to an intersection type. |


type T0 = $<ToIntersection, { a: 'foo' } | { b: 'foo' }> // { a: 'foo'; b: 'foo' }
 


## Utility: Union.ToList

`ToList` is a type-level function that converts a union type to a list (tuple) type.

| Argument name | Type | Description |
| -- | -- | -- |
| T |  | The union type to convert to a list. |


type T0 = $<ToList, 1 | 2 | 3> // [1, 2, 3]
type T1 = $<ToList, string | boolean> // [string, false, true]
 

