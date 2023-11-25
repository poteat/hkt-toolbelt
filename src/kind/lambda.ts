/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable import/no-named-as-default-member */
import { Kind, Type, Function } from '..'
import ts, {
  factory,
  InterfaceDeclaration,
  SyntaxKind,
  type TypeNode
} from 'typescript'

const resultFile = ts.createSourceFile(
  'someFileName.ts',
  `import hkt, { Kind, Type, Function } from 'hkt-toolbelt';\n`,
  ts.ScriptTarget.Latest,
  /*setParentNodes*/ false,
  ts.ScriptKind.TS
)
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

const UNKNOWN_NODE = factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword)

const result = outputInterfaces(
  'ExampleKind',
  4
  /** [
    'Kind.Kind<(x: never) => Kind.Kind>',
    'unknown',
    'unknown[]'
  ] */
).map((node) => printer.printNode(ts.EmitHint.Unspecified, node, resultFile))

console.log(result)

function outputInterfaces(name: string, n: number, paramTypes: string[] = []) {
  const interfaces: InterfaceDeclaration[] = Array.from(
    { length: n },
    (_, i) => generateInterface(i, n, name)!
  )
  /** for (const [i, paramType] of paramTypes.entries()) {
    console.log(interfaces[i].typeParameters?.[0].constraint)
  } */
  return interfaces
}

function generateInterface(i: number, n: number, name: string) {
  if (i < 0 || i >= n) return

  const _typeParams =
    i === 0
      ? undefined
      : Array.from({ length: i }, (_, j) => {
          return factory.createTypeParameterDeclaration(
            /** modifiers: Modifier[] | undefined */
            undefined,
            /** name: string | Identifier */
            factory.createIdentifier(`X${j + 1}`),
            /** constraint?: TypeNode */
            UNKNOWN_NODE,
            /** defaultType?: TypeNode */
            undefined
          )
        })

  const _extendsKind = factory.createHeritageClause(
    /** token: HeritageClause["token"] */
    SyntaxKind.ExtendsKeyword,
    /** types: ExpressionWithTypeArguments[] */
    [
      factory.createExpressionWithTypeArguments(
        /** expression: Expression */
        factory.createPropertyAccessExpression(
          factory.createIdentifier('Kind'),
          factory.createIdentifier('Kind')
        ),
        /** typeArguments: TypeNode[] | undefined */
        undefined
      )
    ]
  )

  const _methodMemberParam = factory.createParameterDeclaration(
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
        UNKNOWN_NODE
      ]
    ),
    undefined
  )

  const _methodMemberReturnType = factory.createTypeReferenceNode(
    /** typeName: string | EntityName */
    factory.createIdentifier(
      i < n - 1
        ? `${name}_T${i + 1}`
        : `_$${name[0].toLowerCase() + name.slice(1)}`
    ),
    /** typeArguments: TypeNode[] | undefined */
    [
      ...Array.from({ length: i }, (_, j) => {
        return factory.createTypeReferenceNode(
          factory.createIdentifier(`X${j + 1}`),
          undefined
        )
      }),
      factory.createTypeQueryNode(factory.createIdentifier('x'), undefined)
    ]
  )

  const _methodMember = factory.createMethodSignature(
    /** modifiers: Modifier[] | undefined */
    undefined,
    /** name: string | PropertyName */
    factory.createIdentifier('f'),
    /** questionToken: QuestionToken | undefined */
    undefined,
    /** typeParameters: TypeParameterDeclaration[] | undefined */
    undefined,
    /** parameters: ParameterDeclaration[] */
    [_methodMemberParam],
    /** type: TypeNode | undefined */
    _methodMemberReturnType
  )

  return factory.createInterfaceDeclaration(
    /** modifiers: ModifierLike[] | undefined */
    i === 0 ? [factory.createToken(SyntaxKind.ExportKeyword)] : undefined,
    /** name: string | Identifier */
    factory.createIdentifier(i === 0 ? name : `${name}_T${i}`),
    /** typeParameters: TypeParameterDeclaration[] | undefined */
    _typeParams,
    /** heritageClauses: HeritageClause[] | undefined */
    [_extendsKind],
    /** members: TypeElement[] */
    [_methodMember]
  )
}
