import { getAttributeValue } from '../../../../../../light-dom/attribute/get-attribute-value';
import { hasAttribute } from '../../../../../../light-dom/attribute/has-attribute';
import { removeAttribute } from '../../../../../../light-dom/attribute/remove-attribute';
import { getTagName } from '../../../../../../light-dom/node/properties/get-tag-name';
import { hasChildNodes } from '../../../../../../light-dom/node/state/has-child-nodes';
import { generateFullOptionalObjectPropertiesLines, IObjectProperties } from '../../../../../helpers/generate-object-properties-lines';
import { generateTemplateVariableName } from '../../../../../helpers/generate-template-variable-name';
import { scopeLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  extractRXAttributesFromReactiveHTMLAttribute,
  IMappedAttributes,
} from '../helpers/extract-rx-attributes-from-reactive-html-attribute';
import {
  generateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement,
  IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement,
} from '../helpers/generate-reactive-dom-js-lines-for-local-template-from-rx-container-element';
import { extractRXForLoopCommand, IRXForLoopCommand } from './extract-rx-for-loop-command';
import {
  generateReactiveDOMJSLinesForRXForLoop,
  IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXForLoop,
} from './generate-reactive-dom-js-lines-for-rx-for-loop';

/*
Syntax:

<rx-for-loop
  items="itemsObservable"
  template="templateReference"
  track-by="trackByFunction"
></rx-for-loop>

 */

/*
Syntax - alternative:

<element
  *for="let item of items; index as index; trackBy: trackByFn"
>
  ...content
</element>

====> equivalent

<rx-template
  name="uuid"
>
  ...content
</rx-template>
<rx-for-loop
  items="items"
  template="uuid"
  track-by="trackByFn"
></rx-for-loop>

 */

const TAG_NAME: string = 'rx-for-loop';
const COMMAND_NAME: string = '*for';

const ITEMS_ATTRIBUTE_NAME: string = 'items';
const TEMPLATE_ATTRIBUTE_NAME: string = 'template';
const TRACK_BY_ATTRIBUTE_NAME: string = 'track-by';

const LOCAL_TEMPLATE_NAME: string = 'template';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  ITEMS_ATTRIBUTE_NAME,
  TEMPLATE_ATTRIBUTE_NAME,
  TRACK_BY_ATTRIBUTE_NAME,
]);

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLRXForLoopToReactiveDOMJSLines =
  | IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXForLoop
  | IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement
  ;

// export function compileRXForLoop(
export function transpileReactiveHTMLRXForLoopToReactiveDOMJSLines(
  node: Element,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLRXForLoopToReactiveDOMJSLines>,
): ILinesOrNull {
  const name: string = getTagName(node);
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(node.attributes, ATTRIBUTE_NAMES);
    const items: string | undefined = attributes.get(ITEMS_ATTRIBUTE_NAME);
    const template: string | undefined = attributes.get(TEMPLATE_ATTRIBUTE_NAME);
    const trackBy: string | undefined = attributes.get(TRACK_BY_ATTRIBUTE_NAME);

    const options: IObjectProperties = [];

    if (items === void 0) {
      throw new Error(`Missing attribute '${ITEMS_ATTRIBUTE_NAME}'`);
    }

    if (template === void 0) {
      throw new Error(`Missing attribute '${TEMPLATE_ATTRIBUTE_NAME}'`);
    }

    if (trackBy !== void 0) {
      options.push(['trackBy', trackBy]);
    }

    if (hasChildNodes(node)) {
      throw new Error(`Should not have any children`);
    }

    return generateReactiveDOMJSLinesForRXForLoop(
      items,
      generateTemplateVariableName(template),
      generateFullOptionalObjectPropertiesLines(options, ','),
      requireExternalFunction,
    );
  } else if (hasAttribute(node, COMMAND_NAME)) {
    const command: IRXForLoopCommand = extractRXForLoopCommand(getAttributeValue(node, COMMAND_NAME) as string);
    removeAttribute(node, COMMAND_NAME);

    const options: IObjectProperties = [];
    if (command.trackBy !== void 0) {
      options.push(['trackBy', command.trackBy]);
    }

    const properties: IObjectProperties = [];

    if (command.item !== void 0) {
      properties.push(['item', command.item]);
    }

    if (command.index !== void 0) {
      properties.push(['index', command.index]);
    }

    return scopeLines([
      ...generateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement(
        node,
        LOCAL_TEMPLATE_NAME,
        generateFullOptionalObjectPropertiesLines(properties, ','),
        requireExternalFunction,
      ),
      ...generateReactiveDOMJSLinesForRXForLoop(
        command.items,
        LOCAL_TEMPLATE_NAME,
        generateFullOptionalObjectPropertiesLines(options, ','),
        requireExternalFunction,
      ),
    ]);
  } else {
    return null;
  }
}

