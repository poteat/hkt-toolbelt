import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import ts from 'typescript'
import { printKindInterfaces } from './generate-kind'

const LIBRARY = path.join(__dirname, '..', 'src').replace(/\\/g, '/')
const SKILL = path.join(
  __dirname,
  '..',
  '.claude',
  'skills',
  'hkt-util',
  'SKILL.md'
)

/**
 * Extracts the TypeScript fenced blocks from a markdown document, in order.
 *
 * @param markdown - Document text.
 */
function typescriptBlocks(markdown: string): string[] {
  // Tolerates CRLF, since a checkout with `core.autocrlf` enabled would
  // otherwise find no blocks at all and fail on unchanged content.
  return [...markdown.matchAll(/```ts\r?\n([\s\S]*?)```/g)].map((match) =>
    match[1].trimEnd()
  )
}

/**
 * Finds the single extracted block containing `marker`, failing loudly when the
 * document no longer contains exactly one such block - a rename should surface
 * here rather than silently reducing coverage.
 *
 * @param blocks - Extracted blocks.
 * @param marker - Substring identifying the wanted block.
 */
function blockContaining(blocks: string[], marker: string): string {
  const matches = blocks.filter((block) => block.includes(marker))

  if (matches.length !== 1) {
    throw new Error(
      `expected exactly one block containing ${JSON.stringify(marker)}, found ${matches.length}`
    )
  }

  return matches[0]
}

/** Drops import statements so blocks can share one assembled module. */
function withoutImports(block: string): string {
  return block
    .split('\n')
    .filter((line) => !line.startsWith('import '))
    .join('\n')
}

const blocks = typescriptBlocks(fs.readFileSync(SKILL, 'utf-8'))

describe('hkt-util skill examples', () => {
  it('type-level examples compile and their witnesses hold', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-examples-'))

    try {
      const file = path.join(dir, 'subject.ts')

      // Assembled exactly as the skill instructs: the base type it shows, the
      // chain its `generate-kind` invocation produces, then its witnesses.
      fs.writeFileSync(
        file,
        [
          `import { $, Kind, Type, Test, Number, String } from '${LIBRARY}'`,
          ``,
          withoutImports(blockContaining(blocks, '_$clamp')),
          ``,
          printKindInterfaces('Clamp', 3, [
            'Number.Number',
            'Number.Number',
            'Number.Number'
          ]).join('\n\n'),
          ``,
          blockContaining(blocks, 'Clamp_Spec'),
          ``,
          withoutImports(blockContaining(blocks, '_$isPalindrome')),
          ``,
          `type __used = [`,
          `  Clamp_Spec,`,
          `  _$isPalindrome<'racecar'>,`,
          `  Type._$cast<unknown, unknown>,`,
          `  Kind.Kind,`,
          `  String.Reverse`,
          `]`,
          ``
        ].join('\n')
      )

      const program = ts.createProgram([file], {
        strict: true,
        target: ts.ScriptTarget.ES2020,
        lib: ['lib.es2021.d.ts'],
        module: ts.ModuleKind.CommonJS,
        esModuleInterop: true,
        noEmit: true,
        skipLibCheck: true
      })

      expect(
        [
          ...program.getSyntacticDiagnostics(),
          ...program.getSemanticDiagnostics()
        ].map((d) => ts.flattenDiagnosticMessageText(d.messageText, ' '))
      ).toEqual([])
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('finds the same blocks when the document has CRLF line endings', () => {
    const document = fs.readFileSync(SKILL, 'utf-8')
    const crlf = document.replace(/\r?\n/g, '\r\n')

    expect(typescriptBlocks(crlf)).toHaveLength(
      typescriptBlocks(document).length
    )
    expect(typescriptBlocks(crlf).length).toBeGreaterThan(0)
  })

  it('witnesses match what the runtime function in the skill returns', () => {
    // The skill's central discipline is that a conversion's witnesses come from
    // the original function's actual output. That only holds if the two agree,
    // so both sides are taken from the document rather than restated here.
    const runtime = ts.transpileModule(
      withoutImports(blockContaining(blocks, 'Math.min')),
      { compilerOptions: { target: ts.ScriptTarget.ES2020 } }
    ).outputText

    const clamp = new Function(`${runtime}; return clamp`)() as (
      lo: number,
      hi: number
    ) => (x: number) => number

    const witnesses = [
      ...blockContaining(blocks, 'Clamp_Spec').matchAll(
        /Test\.Expect<\$<\$<\$<Clamp, (-?\d+)>, (-?\d+)>, (-?\d+)>, (-?\d+)>/g
      )
    ].map((m) => m.slice(1, 5).map(Number) as [number, number, number, number])

    expect(witnesses).toHaveLength(3)

    for (const [lo, hi, x, expected] of witnesses) {
      expect(clamp(lo, hi)(x)).toBe(expected)
    }
  })
})
