import { IReactiveHTMLTemplate } from '../../../../../template/reactive-html-template.type';
import { IReferenceNodeChildren } from '../../reference-node-children.type';
import { IReferenceNode } from '../../reference-node.type';
import { attachReactiveHTMLTemplateToReferenceNode } from './attach-reactive-html-template-to-reference-node';

export function attachOptionalReactiveHTMLTemplateToReferenceNode<GTemplateArgument extends object>(
  template: IReactiveHTMLTemplate<GTemplateArgument> | null,
  templateArgument: GTemplateArgument,
  referenceNode: IReferenceNode,
): IReferenceNodeChildren {
  if (template === null) {
    return [];
  } else {
    return attachReactiveHTMLTemplateToReferenceNode<GTemplateArgument>(
      template,
      templateArgument,
      referenceNode,
    );
  }
}
