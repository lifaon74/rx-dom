import { ILines } from '../../../../../../types/lines.type';
import { IEventProperty } from '../extract-event-property-from-reactive-html-attribute';

/**
 * Syntax:
 *  - standard: (event)
 *  - prefixed: on-event
 */
export function transpileReactiveHTMLReactiveEventListenerToReactiveDOMJSLines(
  eventProperty: IEventProperty,
): ILines {
  return [
    `// reactive event listener '${eventProperty.name}'`,
    `setReactiveEventListener(${eventProperty.value}, node, ${JSON.stringify(eventProperty.name)});`,
  ];
}

