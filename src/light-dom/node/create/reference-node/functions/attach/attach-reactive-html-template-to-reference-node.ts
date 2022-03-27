import { IReactiveHTMLTemplate } from '../../../../../template/reactive-html-template.type';
import { createDocumentFragment } from '../../../create-document-fragment';
import { IReferenceNodeChildren } from '../../reference-node-children.type';
import { IReferenceNode } from '../../reference-node.type';
import { attachDocumentFragmentToReferenceNode } from './attach-document-fragment-to-reference-node';

export function attachReactiveHTMLTemplateToReferenceNode<GTemplateArgument extends object>(
  template: IReactiveHTMLTemplate<GTemplateArgument>,
  templateArgument: GTemplateArgument,
  referenceNode: IReferenceNode,
): IReferenceNodeChildren {
  return attachDocumentFragmentToReferenceNode(
    template(
      createDocumentFragment(),
      templateArgument,
    ),
    referenceNode,
  );
}
