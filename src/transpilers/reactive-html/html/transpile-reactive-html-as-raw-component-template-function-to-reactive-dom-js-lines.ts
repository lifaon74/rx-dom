import { optionalLines } from '../../helpers/lines-formatting-helpers';
import { ILines } from '../../types/lines.type';
import {
  generateReactiveDOMJSLinesForRXTemplate,
} from '../dom/rx-component/transpilers/rx-template/generate-reactive-dom-js-lines-for-rx-template';
import { IRequireExternalFunction } from '../require-external/require-external-function.type';
import {
  IRequireCreateCustomElementKey,
  REQUIRE_CREATE_CUSTOM_ELEMENT_CONSTANT,
} from '../require-external/types/require-create-custom-element.type';
import {
  IRequireGetNodeModifierKey,
  REQUIRE_GET_NODE_MODIFIER_CONSTANT,
} from '../require-external/types/require-get-node-modifier.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLToReactiveDOMJSLines,
  transpileReactiveHTMLToReactiveDOMJSLines,
} from './transpile-reactive-html-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLAsRawComponentTemplateFunctionToReactiveDOMJSLines =
  | IRequireCreateCustomElementKey
  | IRequireGetNodeModifierKey
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLToReactiveDOMJSLines
  ;

/**
 * Returns lines with the shape of: IRawComponentTemplateFunction
 */
export function transpileReactiveHTMLAsRawComponentTemplateFunctionToReactiveDOMJSLines(
  html: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLAsRawComponentTemplateFunctionToReactiveDOMJSLines>,
): ILines {
  const createCustomElement: string = requireExternalFunction(REQUIRE_CREATE_CUSTOM_ELEMENT_CONSTANT);
  const getNodeModifier: string = requireExternalFunction(REQUIRE_GET_NODE_MODIFIER_CONSTANT);
  return generateReactiveDOMJSLinesForRXTemplate(
    [
      `$,`,
      `$content,`,
      `${createCustomElement},`,
      `${getNodeModifier},`,
    ],
    optionalLines(transpileReactiveHTMLToReactiveDOMJSLines(html, requireExternalFunction)),
  );
}

