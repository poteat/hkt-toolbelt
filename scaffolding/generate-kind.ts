import ts, {
  factory,
  SyntaxKind,
  type InterfaceDeclaration,
  type TypeNode
} from 'typescript'

/**
 * The `unknown` keyword node. Used as the type-parameter constraint and the
 * `Type._$cast` bound wherever no constraint is supplied.
 */
const UNKNOWN_NODE = factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword)

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

/**
 * An empty source file used only as printing context. `printNode` needs a
 * `SourceFile` to resolve formatting against, but never reads its text when
 * the node being printed is synthesized.
 */
const CONTEXT_FILE = ts.createSourceFile(
  'generated.ts',
  '',
  ts.ScriptTarget.Latest,
  false,
  ts.ScriptKind.TS
)

/**
 * Reports whether `name` can be used as a declared interface name, by asking
 * the parser rather than approximating with a pattern. A pattern over identifier
 * characters accepts reserved words such as `class` and `function`, which would
 * emit a chain that does not parse.
 *
 * Contextual keywords like `type` and `any` are accepted, since they are legal
 * in this position.
 *
 * @param name - Candidate kind name.
 */
function isDeclarableName(name: string): boolean {
  const file = ts.createSourceFile(
    'name.ts',
    `interface ${name} {}`,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  )
  const [statement] = file.statements

  return (
    file.statements.length === 1 &&
    statement !== undefined &&
    ts.isInterfaceDeclaration(statement) &&
    statement.name.text === name
  )
}

/**
 * Parses a constraint's type text into a `TypeNode` by wrapping it in a
 * throwaway type alias. Constraints arrive as text because that keeps call
 * sites readable - `'Record<PropertyKey, unknown>'` rather than a tree of
 * factory calls - and the parsed node embeds directly in the synthesized
 * declarations.
 *
 * @param text - The constraint as it would appear after `extends`.
 */
function parseConstraint(text: string): TypeNode {
  const source = `type __C = ${text}`
  const file = ts.createSourceFile(
    'constraint.ts',
    source,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  )
  const [statement] = file.statements

  if (
    file.statements.length !== 1 ||
    statement === undefined ||
    !ts.isTypeAliasDeclaration(statement) ||
    statement.type.end <= statement.type.pos ||
    source.slice(statement.type.end).trim() !== ''
  ) {
    throw new TypeError(
      `constraint is not a single type expression: ${JSON.stringify(text)}`
    )
  }

  return statement.type
}

/**
 * Derives the conventional `_$`-prefixed implementation name for a kind by
 * lowercasing its first character, e.g. `ExampleKind` becomes `_$exampleKind`.
 *
 * @param name - The PascalCase name of the kind.
 */
function toImplementationName(name: string): string {
  return `_$${name[0].toLowerCase()}${name.slice(1)}`
}

/**
 * Names the type parameter holding the argument applied at the given step.
 * Sole definition of the `X1`, `X2`, ... scheme - both the declarations and the
 * references that forward them are derived from this.
 *
 * @param index - Zero-based index of the applied argument.
 */
function toTypeParameterName(index: number): string {
  return `X${index + 1}`
}

/**
 * Builds the type parameters accumulated by the given step: one parameter per
 * argument already applied, each bounded by that argument's constraint.
 *
 * @param step - Zero-based position in the chain.
 * @param constraints - Parsed per-argument constraints; missing entries fall
 *   back to `unknown`.
 */
function createAccumulatedTypeParameters(
  step: number,
  constraints: TypeNode[]
) {
  return Array.from({ length: step }, (_, index) =>
    factory.createTypeParameterDeclaration(
      undefined,
      factory.createIdentifier(toTypeParameterName(index)),
      constraints[index] ?? UNKNOWN_NODE,
      undefined
    )
  )
}

/**
 * Builds a step's `x` parameter: `Type._$cast<this[Kind._], B>`, where `B` is
 * the constraint of the argument applied at that step (`unknown` when none is
 * supplied). The hand-written kinds vary this bound per step, which is what
 * makes an applied argument arrive already narrowed.
 *
 * @param bound - The cast target for this step's argument.
 */
function createArgumentParameter(bound: TypeNode) {
  return factory.createParameterDeclaration(
    undefined,
    undefined,
    factory.createIdentifier('x'),
    undefined,
    factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier('Type'),
        factory.createIdentifier('_$cast')
      ),
      [
        factory.createIndexedAccessTypeNode(
          factory.createThisTypeNode(),
          factory.createTypeReferenceNode(
            factory.createQualifiedName(
              factory.createIdentifier('Kind'),
              factory.createIdentifier('_')
            ),
            undefined
          )
        ),
        bound
      ]
    ),
    undefined
  )
}

/**
 * Builds the return type of a step's `f` method: the next interface in the
 * chain, or the `_$` implementation type once every argument has been applied.
 *
 * Type arguments are the parameters accumulated so far, plus `typeof x` for the
 * argument being applied at this step.
 *
 * @param step - Zero-based position in the chain.
 * @param arity - Total number of arguments the kind accepts.
 * @param name - The PascalCase name of the kind.
 */
function createStepReturnType(step: number, arity: number, name: string) {
  const isFinalStep = step === arity - 1

  return factory.createTypeReferenceNode(
    factory.createIdentifier(
      isFinalStep ? toImplementationName(name) : `${name}_T${step + 1}`
    ),
    [
      ...Array.from({ length: step }, (_, index) =>
        factory.createTypeReferenceNode(
          factory.createIdentifier(toTypeParameterName(index)),
          undefined
        )
      ),
      factory.createTypeQueryNode(factory.createIdentifier('x'), undefined)
    ]
  )
}

/**
 * Builds the `step`-th interface of a curried kind chain.
 *
 * Step `0` is the exported entry point, named `name`. Intermediate steps are
 * named `${name}_T${step}` and are not exported, since they are only reachable
 * through the entry point.
 *
 * @param step - Zero-based position in the chain.
 * @param arity - Total number of arguments the kind accepts.
 * @param name - The PascalCase name of the kind.
 * @param constraints - Parsed per-argument constraints; missing entries fall
 *   back to `unknown`.
 */
function createChainStep(
  step: number,
  arity: number,
  name: string,
  constraints: TypeNode[]
): InterfaceDeclaration {
  const typeParameters = createAccumulatedTypeParameters(step, constraints)

  const extendsKind = factory.createHeritageClause(SyntaxKind.ExtendsKeyword, [
    factory.createExpressionWithTypeArguments(
      factory.createPropertyAccessExpression(
        factory.createIdentifier('Kind'),
        factory.createIdentifier('Kind')
      ),
      undefined
    )
  ])

  const method = factory.createMethodSignature(
    undefined,
    factory.createIdentifier('f'),
    undefined,
    undefined,
    [createArgumentParameter(constraints[step] ?? UNKNOWN_NODE)],
    createStepReturnType(step, arity, name)
  )

  return factory.createInterfaceDeclaration(
    step === 0 ? [factory.createToken(SyntaxKind.ExportKeyword)] : undefined,
    factory.createIdentifier(step === 0 ? name : `${name}_T${step}`),
    typeParameters.length > 0 ? typeParameters : undefined,
    [extendsKind],
    [method]
  )
}

/**
 * Validates the inputs shared by both public entry points.
 *
 * @param name - The PascalCase name of the kind.
 * @param arity - Total number of arguments the kind accepts.
 * @param constraints - Per-argument constraint texts; either empty or exactly
 *   one per argument.
 */
function assertValidInputs(
  name: string,
  arity: number,
  constraints: string[]
): void {
  if (!isDeclarableName(name)) {
    throw new TypeError(
      `kind name must be usable as an interface name, received: ${JSON.stringify(
        name
      )}`
    )
  }

  if (!Number.isInteger(arity) || arity < 1) {
    throw new RangeError(
      `arity must be a positive integer, received: ${String(arity)}`
    )
  }

  if (constraints.length > 0 && constraints.length !== arity) {
    throw new RangeError(
      `expected ${arity} constraints, one per argument, received ${constraints.length}`
    )
  }
}

/**
 * Generates the chain of interface declarations implementing a curried kind of
 * the given arity.
 *
 * The chain applies one argument per step, threading each applied argument
 * forward as a type parameter, and bottoms out in a reference to the
 * hand-written `_$` implementation type.
 *
 * @param name - The PascalCase name of the kind, e.g. `ExampleKind`.
 * @param arity - Total number of arguments the kind accepts. Must be >= 1.
 * @param constraints - Per-argument constraint type texts, one per argument.
 *   Each becomes both the bound on its accumulated type parameter and the
 *   `Type._$cast` target at the step that applies the argument. Omit to bound
 *   everything by `unknown`.
 */
export function generateKindInterfaces(
  name: string,
  arity: number,
  constraints: string[] = []
): InterfaceDeclaration[] {
  assertValidInputs(name, arity, constraints)

  const constraintNodes = constraints.map(parseConstraint)

  return Array.from({ length: arity }, (_, step) =>
    createChainStep(step, arity, name, constraintNodes)
  )
}

/**
 * Generates a curried kind chain and prints each declaration to source text.
 *
 * @param name - The PascalCase name of the kind, e.g. `ExampleKind`.
 * @param arity - Total number of arguments the kind accepts. Must be >= 1.
 * @param constraints - Per-argument constraint type texts; see
 *   {@link generateKindInterfaces}.
 */
export function printKindInterfaces(
  name: string,
  arity: number,
  constraints: string[] = []
): string[] {
  return generateKindInterfaces(name, arity, constraints).map((node) =>
    printer.printNode(ts.EmitHint.Unspecified, node, CONTEXT_FILE)
  )
}

/**
 * Prints a generated chain to stdout.
 *
 * @param argv - Positional arguments: the kind name, the arity, then optional
 *   per-argument constraint type texts.
 */
function main(argv: string[]): void {
  const [name, rawArity, ...constraints] = argv

  if (name === undefined || rawArity === undefined) {
    console.error(
      'usage: generate-kind <PascalCaseName> <arity> [constraint ...]'
    )
    process.exitCode = 1
    return
  }

  console.log(
    printKindInterfaces(name, Number(rawArity), constraints).join('\n\n')
  )
}

if (require.main === module) {
  main(process.argv.slice(2))
}
