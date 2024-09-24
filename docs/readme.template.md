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

The toolbelt has {{numberOfUtilities}} utilities organized into {{numberOfModules}} modules.

# Module List

| Module name | Description |
| -- | -- |
{{#modules}}
| [{{name}}]({{#slug}}#module-{{slug}}{{/slug}}{{^slug}}#module{{/slug}}) | {{{shortDescription}}} |
{{/modules}}

{{#modules}}

# Module: {{{name}}}

{{{fullDescription}}}

| Utility name | Description |
| -- | -- |
{{#files}}
  {{#utilities}}
  | [{{name}}](#utility-{{moduleSlug}}{{slug}}) | {{{shortDescription}}} |
  {{/utilities}}
{{/files}}

{{#files}}
  {{#utilities}}

## Utility: {{moduleName}}.{{name}}

{{{fullDescription}}}

  {{/utilities}}
{{/files}}
{{/modules}}