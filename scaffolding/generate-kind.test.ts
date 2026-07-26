import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import ts from 'typescript'
import { generateKindInterfaces, printKindInterfaces } from './generate-kind'

const LIBRARY = path.join(__dirname, '..', 'src').replace(/\\/g, '/')

/**
 * Typechecks `source` as a standalone module resolving imports against the real
 * library, and returns the resulting diagnostics.
 *
 * Compiling the generator's output is the only check that catches the output
 * ceasing to be valid hkt-toolbelt code - the string assertions above would
 * keep passing regardless.
 *
 * @param source - Module source to typecheck.
 */
function typecheck(source: string): ts.Diagnostic[] {
  return typecheckAll({ subject: source }).subject
}

/**
 * Typechecks several modules in a single program, keyed by name, and returns
 * each module's diagnostics. Sharing one program keeps the cost of compiling
 * against the library to a single pass.
 *
 * @param sources - Module sources keyed by basename.
 */
function typecheckAll(
  sources: Record<string, string>
): Record<string, ts.Diagnostic[]> {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'generate-kind-'))

  try {
    const files = Object.entries(sources).map(([name, source]) => {
      const file = path.join(dir, `${name}.ts`)
      fs.writeFileSync(file, source)
      return [name, file] as const
    })

    const program = ts.createProgram(Object.values(Object.fromEntries(files)), {
      strict: true,
      target: ts.ScriptTarget.ES2020,
      // Matches the root tsconfig; the library uses `replaceAll`.
      lib: ['lib.es2021.d.ts'],
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
      noEmit: true,
      skipLibCheck: true
    })

    return Object.fromEntries(
      files.map(([name, file]) => {
        const sourceFile = program.getSourceFile(file)!
        return [
          name,
          [
            ...program.getSyntacticDiagnostics(sourceFile),
            ...program.getSemanticDiagnostics(sourceFile)
          ]
        ]
      })
    )
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

/**
 * Wraps a generated chain in a module that supplies an implementation and any
 * trailing assertions.
 *
 * @param impl - The `_$` implementation the chain bottoms out in.
 * @param chain - Generated interface declarations.
 * @param trailer - Assertions appended after the chain.
 */
function moduleWith(impl: string, chain: string, trailer = '') {
  return [
    `import { $, Kind, Type, Test } from '${LIBRARY}'`,
    ``,
    impl,
    ``,
    chain,
    ``,
    trailer,
    `type __used = [Type._$cast<unknown, unknown>, Kind.Kind, $<Kind.Reify, never>]`,
    ``
  ].join('\n')
}

describe('generated chains compile', () => {
  const chain = printKindInterfaces('Triple', 3).join('\n\n')

  it('is a working Kind that threads every applied argument in order', () => {
    const diagnostics = typecheck(
      moduleWith(
        'type _$triple<A, B, C> = [A, B, C]',
        chain,
        [
          'type Spec = [',
          '  Test.Expect<$<$<$<Triple, 1>, 2>, 3>, [1, 2, 3]>,',
          "  Test.Expect<$<$<$<Triple, 'a'>, 'b'>, 'c'>, ['a', 'b', 'c']>,",
          '  Test.Expect<$<Triple, 1> extends Kind.Kind ? true : false, true>',
          ']',
          'type __spec = Spec'
        ].join('\n')
      )
    )

    expect(
      diagnostics.map((d) =>
        ts.flattenDiagnosticMessageText(d.messageText, ' ')
      )
    ).toEqual([])
  })

  it('fails the same assertions when the expected type is wrong', () => {
    const diagnostics = typecheck(
      moduleWith(
        'type _$triple<A, B, C> = [A, B, C]',
        chain,
        [
          'type Spec = [Test.Expect<$<$<$<Triple, 1>, 2>, 3>, [1, 2, 4]>]',
          'type __spec = Spec'
        ].join('\n')
      )
    )

    // Guards the test above: if Test.Expect were inert, that assertion would
    // pass for any output and prove nothing.
    expect(diagnostics.length).toBeGreaterThan(0)
  })

  // Real multi-arity kinds whose `_$` implementations constrain their
  // parameters, paired with the constraints their hand-written chains declare.
  const REAL_KINDS = [
    {
      kind: 'PadEnd',
      module: 'string/pad-end',
      impl: '_$padEnd',
      constraints: ['Number_.Number', 'string', 'string'],
      preamble: `import { Number as Number_ } from '${LIBRARY}'`
    },
    {
      kind: 'Assign',
      module: 'object/assign',
      impl: '_$assign',
      constraints: ['PropertyKey', 'unknown', 'Record<PropertyKey, unknown>'],
      preamble: ''
    },
    {
      kind: 'Replace',
      module: 'list/replace',
      impl: '_$replace',
      constraints: ['unknown', 'unknown', 'unknown[]'],
      preamble: ''
    }
  ]

  /**
   * Builds the module for one real kind: the generated chain wired to that
   * kind's existing `_$` implementation.
   *
   * @param entry - The real-kind fixture.
   * @param constrained - Whether to generate with the hand-written constraints.
   * @param trailer - Assertions appended after the chain.
   */
  function realKindModule(
    entry: (typeof REAL_KINDS)[number],
    constrained: boolean,
    trailer = ''
  ) {
    return moduleWith(
      [
        `import { ${entry.impl} } from '${LIBRARY}/${entry.module}'`,
        entry.preamble
      ]
        .filter(Boolean)
        .join('\n'),
      printKindInterfaces(
        entry.kind,
        entry.constraints.length,
        constrained ? entry.constraints : []
      ).join('\n\n'),
      trailer
    )
  }

  it('satisfies the constrained kinds in this library when given their constraints', () => {
    const diagnostics = typecheckAll(
      Object.fromEntries(
        REAL_KINDS.map((entry) => [entry.kind, realKindModule(entry, true)])
      )
    )

    for (const { kind } of REAL_KINDS) {
      expect(
        diagnostics[kind].map((d) =>
          ts.flattenDiagnosticMessageText(d.messageText, ' ')
        )
      ).toEqual([])
    }
  })

  it('behaves like the hand-written kinds it mirrors', () => {
    const padEnd = REAL_KINDS[0]
    const replace = REAL_KINDS[2]

    // The same cases the hand-written specs assert, e.g. string/pad-end.test.ts.
    const diagnostics = typecheckAll({
      PadEnd: realKindModule(
        padEnd,
        true,
        [
          'type Spec = [',
          "  Test.Expect<$<$<$<PadEnd, 8>, '0'>, 'foo'>, 'foo00000'>,",
          "  Test.Expect<$<$<$<PadEnd, 4>, '0'>, 'foobar'>, 'foobar'>",
          ']',
          'type __spec = Spec'
        ].join('\n')
      ),
      Replace: realKindModule(
        replace,
        true,
        [
          'type Spec = [Test.Expect<$<$<$<Replace, 1>, 2>, [1, 3, 1]>, [2, 3, 2]>]',
          'type __spec = Spec'
        ].join('\n')
      )
    })

    for (const name of ['PadEnd', 'Replace']) {
      expect(
        diagnostics[name].map((d) =>
          ts.flattenDiagnosticMessageText(d.messageText, ' ')
        )
      ).toEqual([])
    }
  })

  it('fails against the same kinds when constraints are omitted', () => {
    const diagnostics = typecheckAll(
      Object.fromEntries(
        REAL_KINDS.map((entry) => [entry.kind, realKindModule(entry, false)])
      )
    )

    // Paired control for the two passing cases above: their clean compiles are
    // attributable to constraint emission, not to the harness. Without
    // constraints the chain remains a scaffold that needs hand-editing.
    for (const { kind } of REAL_KINDS) {
      expect(diagnostics[kind].map((d) => d.code)).toContain(2344)
    }
  })
})

describe('printKindInterfaces', () => {
  it('generates the documented chain for a four-argument kind', () => {
    expect(printKindInterfaces('ExampleKind', 4)).toEqual([
      'export interface ExampleKind extends Kind.Kind {\n' +
        '    f(x: Type._$cast<this[Kind._], unknown>): ExampleKind_T1<typeof x>;\n' +
        '}',
      'interface ExampleKind_T1<X1 extends unknown> extends Kind.Kind {\n' +
        '    f(x: Type._$cast<this[Kind._], unknown>): ExampleKind_T2<X1, typeof x>;\n' +
        '}',
      'interface ExampleKind_T2<X1 extends unknown, X2 extends unknown> extends Kind.Kind {\n' +
        '    f(x: Type._$cast<this[Kind._], unknown>): ExampleKind_T3<X1, X2, typeof x>;\n' +
        '}',
      'interface ExampleKind_T3<X1 extends unknown, X2 extends unknown, X3 extends unknown> extends Kind.Kind {\n' +
        '    f(x: Type._$cast<this[Kind._], unknown>): _$exampleKind<X1, X2, X3, typeof x>;\n' +
        '}'
    ])
  })

  it('collapses a single-argument kind straight to the implementation', () => {
    expect(printKindInterfaces('ExampleKind', 1)).toEqual([
      'export interface ExampleKind extends Kind.Kind {\n' +
        '    f(x: Type._$cast<this[Kind._], unknown>): _$exampleKind<typeof x>;\n' +
        '}'
    ])
  })

  it('exports only the entry point of the chain', () => {
    const printed = printKindInterfaces('ExampleKind', 3)

    expect(printed[0].startsWith('export interface')).toBe(true)
    expect(printed.slice(1).every((step) => step.startsWith('interface'))).toBe(
      true
    )
  })

  it('lowercases only the first character of the implementation name', () => {
    expect(printKindInterfaces('HTTPKind', 1)[0]).toContain('_$hTTPKind<')
  })

  it('threads supplied constraints into the parameter bounds and the casts', () => {
    expect(
      printKindInterfaces('PadEnd', 3, ['Number_.Number', 'string', 'string'])
    ).toEqual([
      'export interface PadEnd extends Kind.Kind {\n' +
        '    f(x: Type._$cast<this[Kind._], Number_.Number>): PadEnd_T1<typeof x>;\n' +
        '}',
      'interface PadEnd_T1<X1 extends Number_.Number> extends Kind.Kind {\n' +
        '    f(x: Type._$cast<this[Kind._], string>): PadEnd_T2<X1, typeof x>;\n' +
        '}',
      'interface PadEnd_T2<X1 extends Number_.Number, X2 extends string> extends Kind.Kind {\n' +
        '    f(x: Type._$cast<this[Kind._], string>): _$padEnd<X1, X2, typeof x>;\n' +
        '}'
    ])
  })
})

describe('generateKindInterfaces', () => {
  it('emits one declaration per argument', () => {
    expect(generateKindInterfaces('ExampleKind', 1)).toHaveLength(1)
    expect(generateKindInterfaces('ExampleKind', 7)).toHaveLength(7)
  })

  it('rejects a non-positive or fractional arity', () => {
    expect(() => generateKindInterfaces('ExampleKind', 0)).toThrow(RangeError)
    expect(() => generateKindInterfaces('ExampleKind', -1)).toThrow(RangeError)
    expect(() => generateKindInterfaces('ExampleKind', 1.5)).toThrow(RangeError)
    expect(() => generateKindInterfaces('ExampleKind', NaN)).toThrow(RangeError)
  })

  it('rejects a name that is not a valid identifier', () => {
    expect(() => generateKindInterfaces('', 1)).toThrow(TypeError)
    expect(() => generateKindInterfaces('Example Kind', 1)).toThrow(TypeError)
    expect(() => generateKindInterfaces('1Example', 1)).toThrow(TypeError)
  })

  it('rejects a reserved word that identifier characters alone would allow', () => {
    // `class` and `function` are made of identifier characters but cannot be
    // declared as interface names, so a chain using one would not parse.
    expect(() => generateKindInterfaces('class', 1)).toThrow(TypeError)
    expect(() => generateKindInterfaces('function', 1)).toThrow(TypeError)
  })

  it('accepts contextual keywords, which are legal in this position', () => {
    expect(() => generateKindInterfaces('type', 1)).not.toThrow()
    expect(() => generateKindInterfaces('any', 1)).not.toThrow()
  })

  it('rejects a constraint count that does not match the arity', () => {
    expect(() => generateKindInterfaces('ExampleKind', 3, ['unknown'])).toThrow(
      RangeError
    )
  })

  it('rejects a constraint that is not a single type expression', () => {
    expect(() => generateKindInterfaces('ExampleKind', 1, [''])).toThrow(
      TypeError
    )
    expect(() => generateKindInterfaces('ExampleKind', 1, ['}'])).toThrow(
      TypeError
    )
    expect(() =>
      generateKindInterfaces('ExampleKind', 1, ['number; extra'])
    ).toThrow(TypeError)
  })
})
