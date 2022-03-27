import { ILines } from '../../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../../require-external/require-external-function.type';
import {
  IRequireSetReactiveEventListenerKey,
  REQUIRE_SET_REACTIVE_EVENT_LISTENER_CONSTANT,
} from '../../../../../require-external/types/require-set-reactive-event-listener.type';
import { IEventProperty } from '../extract-event-property-from-reactive-html-attribute';

/**
 * Syntax:
 *  - standard: (event)
 *  - prefixed: on-event
 */

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveEventListenerToReactiveDOMJSLines =
  | IRequireSetReactiveEventListenerKey
  ;

export function transpileReactiveHTMLReactiveEventListenerToReactiveDOMJSLines(
  eventProperty: IEventProperty,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveEventListenerToReactiveDOMJSLines>,
): ILines {
  const setReactiveEventListener: string = requireExternalFunction(REQUIRE_SET_REACTIVE_EVENT_LISTENER_CONSTANT);
  return [
    `// reactive event listener '${eventProperty.name}'`,
    `${setReactiveEventListener}(${eventProperty.value}, node, ${JSON.stringify(eventProperty.name)});`,
  ];
}

