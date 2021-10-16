import { Node } from 'acorn';
import { full } from 'acorn-walk';
import { generate } from 'astring';
import {
  CallExpression,
  ClassBody, EmptyStatement, ExpressionStatement,
  Identifier, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier,
  MethodDefinition,
  ObjectExpression,
  Property,
  PropertyDefinition,
  SpreadElement,
} from 'estree';
import {
  compileReactiveHTMLAsComponentTemplate,
} from '../../component';
import { parseEcmaScript } from '../shared/parse/parse-ecsmascript';

function fixPropertyDefinition(
  ast: Node,
): Node {
  full(ast, (node: Node) => {
    switch (node.type) {
      case 'ClassBody': {
        const classBody: ClassBody = node as unknown as ClassBody;
        for (let i = 0; i < classBody.body.length; i++) {
          const childNode: MethodDefinition | PropertyDefinition = classBody.body[i];
          if (childNode.type === 'PropertyDefinition') {
            classBody.body.splice(i, 1);
            i--;
          }
        }
        break;
      }
    }
  });
  return ast;
}

function isCallExpression(
  node: any,
): node is CallExpression {
  return node.type === 'CallExpression';
}

function isIdentifier(
  node: any,
): node is Identifier {
  return node.type === 'Identifier';
}

function isObjectExpression(
  node: any,
): node is ObjectExpression {
  return node.type === 'ObjectExpression';
}

function isProperty(
  node: any,
): node is Property {
  return node.type === 'Property';
}

function isImportDeclaration(
  node: any,
): node is ImportDeclaration {
  return node.type === 'ImportDeclaration';
}

function isExpressionStatement(
  node: any,
): node is ExpressionStatement {
  return node.type === 'ExpressionStatement';
}

function isImportDefaultSpecifier(
  node: any,
): node is ImportDefaultSpecifier {
  return node.type === 'ImportDefaultSpecifier';
}

function isEmptyStatement(
  node: any,
): node is EmptyStatement {
  return node.type === 'EmptyStatement';
}

function createEmptyStatement(): EmptyStatement {
  return {
    type: 'EmptyStatement',
  };
}

/*----------------*/

function createAOTPropertyNode(
  path: string,
): Property {
  return {
    type: 'Property',
    key: {
      type: 'Identifier',
      name: 'aotPath',
    },
    value: {
      type: 'Literal',
      value: path,
      raw: JSON.stringify(path),
    },
    kind: 'init',
    method: false,
    shorthand: false,
    computed: false,
  };
}

/*----------------*/

// export function compile(
//   html: string,
//   constantsToImport?: IObjectProperties,
// ): Promise<string> {
//   return compileAndEvaluateReactiveHTMLAsComponentTemplate(
//     html,
//     constantsToImport,
//   )
//     .then((lines: ILines) => {
//       return linesToString(lines);
//     })
// }

/*----------------*/

async function analyseCompileAndEvaluateReactiveHTMLAsComponentTemplateCallExpression(
  node: CallExpression,
  ast: Node,
) {
  // fullAncestor(ast, (node: Node, _state: any, ancestors: Node[]) => {
  //   if (
  //     isImportDeclaration(node)
  //     // isExpressionStatement(node)
  //   ) {
  //     for (let i = 0, l = node.specifiers.length; i < l; i++) {
  //       const specifier: ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier = node.specifiers[i];
  //
  //       if (
  //         isImportDefaultSpecifier(specifier)
  //         && isIdentifier(specifier.local)
  //       ) {
  //         console.log(specifier);
  //       }
  //     }
  //
  //     // console.log('import', node);
  //   }
  // });

  console.log(node);
}

async function analyseTemplateProperty(
  node: Property,
  ast: Node,
) {
  if (
    isCallExpression(node.value)
    && isIdentifier(node.value.callee)
  ) { // function call
    if (node.value.callee.name === 'compileAndEvaluateReactiveHTMLAsComponentTemplate') {
      await analyseCompileAndEvaluateReactiveHTMLAsComponentTemplateCallExpression(node.value, ast);
    }
  }
  // console.log(node);
}

/*----------------*/

async function runAOT(
  src: string,
  path: string,
): Promise<string> {
  // enableComponentTemplateAOT();

  const ast: Node = parseEcmaScript(src);

  // if (src.includes('Component')) {
  //   console.log(src);
  //   console.log(ast);
  // }

  const promises: Promise<void>[] = [];

  fixPropertyDefinition(ast);

  full(ast, (node: Node) => {
    if (
      isCallExpression(node)
      && isIdentifier(node.callee)
      && (node.callee.name === 'Component')
      && (node.arguments.length > 0)
      && isObjectExpression(node.arguments[0])
    ) {
      const properties: Array<Property | SpreadElement> = node.arguments[0].properties;

      for (let i = 0, l = properties.length; i < l; i++) {
        const property: (Property | SpreadElement) = properties[i];
        if (
          isProperty(property)
          && isIdentifier(property.key)
        ) {
          if (property.key.name === 'template') {
            promises.push(analyseTemplateProperty(property, ast));
          }
        }
      }
      // console.log(properties);
      // node.arguments[0].properties.push(
      //   createAOTPropertyNode(path),
      // );
    }
  });

  await Promise.all(promises);
  return generate(ast);
  // try {
  //   return generate(ast);
  // } catch(e) {
  //   console.log(src);
  //   throw e;
  // }
}

export function aotPlugin(): any {
  return {
    name: 'aot',

    transform: async (
      src: string,
      path: string,
    ): Promise<any> => {
      if (path.endsWith('.ts')) {
        return {
          code: await runAOT(src, path),
          map: null,
        };
      }
    },
  };
}

