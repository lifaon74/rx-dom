import { IHTMLTemplate, IHTMLTemplateNodeList } from './template.type';
import { getChildNodes } from '../node/properties/get-child-nodes';
import { attachDocumentFragmentToStandardNode } from '../node/move/node/__with-event/derived/attach-document-fragment-to-standard-node';
import { isDocumentFragment } from '../node/type/is-document-fragment';
import { attachNode } from '../node/move/node/attach-node';


export function attachTemplate<GArgument extends object>(
  template: IHTMLTemplate<GArgument>,
  templateArgument: GArgument,
  parentNode: Node,
  referenceNode?: Node | null,
): IHTMLTemplateNodeList {
  return attachTemplateFragment(template(templateArgument), parentNode, referenceNode);
}

export function attachOptionalTemplate<GArgument extends object>(
  template: IHTMLTemplate<GArgument> | null,
  templateArgument: GArgument,
  parentNode: Node,
  referenceNode?: Node | null,
): IHTMLTemplateNodeList {
  if (template === null) {
    return [];
  } else {
    return attachTemplate<GArgument>(template, templateArgument, parentNode, referenceNode);
  }
}

/*---------------------*/


export function attachTemplateFragment(
  fragment: DocumentFragment,
  parentNode: Node,
  referenceNode?: Node | null,
): IHTMLTemplateNodeList {
  const nodes: IHTMLTemplateNodeList = getChildNodes(fragment) as IHTMLTemplateNodeList;
  if (isDocumentFragment(parentNode)) {
    attachNode(fragment, parentNode, referenceNode);
  } else {
    attachDocumentFragmentToStandardNode(fragment, parentNode, referenceNode);
  }
  return nodes;
}

export type IDocumentFragmentOrNull = DocumentFragment | null;

export function attachOptionalTemplateFragment(
  fragment: IDocumentFragmentOrNull,
  parentNode: Node,
  referenceNode?: Node | null,
): IHTMLTemplateNodeList {
  if (fragment === null) {
    return [];
  } else {
    return attachTemplateFragment(fragment, parentNode, referenceNode);
  }
}
