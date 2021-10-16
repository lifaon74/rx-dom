import { ILinesOrNull } from '../../../../../types/lines.type';

export function transpileReactiveHTMLStaticAttributeToReactiveDOMJSLines(
  attribute: Attr,
): ILinesOrNull {
  return (attribute.name === 'is')
    ? null
    : [
      `// static attribute '${attribute.name}'`,
      `setAttributeValue(node, ${JSON.stringify(attribute.name)}, ${JSON.stringify(attribute.value)});`,
    ];
}

