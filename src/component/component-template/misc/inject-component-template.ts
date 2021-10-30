import { nodeAppendChild } from '../../../light-dom/node/move/derived/dom-like/node/node-append-child';
import { IGenericHTMLTemplate } from '../../../light-dom/template/template.type';
import { createReferencesMapGetterAndSetter, getMissingReference } from '../../../transpilers/references/create-references-map';
import { IComponentTemplate, IGetNodeReferenceFunction, IGetTemplateReferenceFunction } from '../component-template.type';

export interface IInjectComponentTemplateReturn {
  getNodeReference: IGetNodeReferenceFunction;
  getTemplateReference: IGetTemplateReferenceFunction;
}

export const DEFAULT_INJECT_COMPONENT_TEMPLATE_RETURN = {
  getNodeReference: getMissingReference,
  getTemplateReference: getMissingReference,
};

export function injectComponentTemplate<GData extends object>(
  template: IComponentTemplate<GData>,
  container: Node,
  data: GData,
  content: DocumentFragment,
): IInjectComponentTemplateReturn {
  // const nodeReferencesMap: IReferencesMap<HTMLElement> = createReferencesMap();
  // const templateReferencesMap: IReferencesMap<HTMLElement> = createReferencesMap();
  const {
    getReference: getNodeReference,
    setReference: setNodeReference,
  } = createReferencesMapGetterAndSetter<HTMLElement>();

  const {
    getReference: getTemplateReference,
    setReference: setTemplateReference,
  } = createReferencesMapGetterAndSetter<IGenericHTMLTemplate>();

  nodeAppendChild(
    container,
    template({
      data,
      content,
      getNodeReference,
      setNodeReference,
      getTemplateReference,
      setTemplateReference,
    }),
  );

  return {
    getNodeReference,
    getTemplateReference,
  };
}

