import { ILines } from '../../../../../../../types/lines.type';
import { IBindProperty } from '../../extract-bind-property-from-reactive-html-attribute';

/**
 * Syntax:
 *  - standard: [property]
 *  - prefixed: bind-property
 */
export function transpileReactiveHTMLReactivePropertyToReactiveDOMJSLines(
  bindProperty: IBindProperty,
): ILines {
  return [
    `// reactive property '${bindProperty.name}'`,
    `setReactiveProperty(toSubscribeFunction(${bindProperty.value}), node, ${JSON.stringify(bindProperty.name)});`,
  ];
}

