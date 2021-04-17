import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { IHTMLTemplateNodeList } from '../../../light-dom/template/template.type';
import { getParentNode, IParentNode } from '../../../light-dom/node/properties/get-parent-node';
import { getNextSibling } from '../../../light-dom/node/properties/get-next-sibling';
import { detachManyNodesWithEvent } from '../../../light-dom/node/move/node/__with-event/bulk/detach-many-nodes-with-event';
import { attachOptionalTemplateFragment, IDocumentFragmentOrNull } from '../../../light-dom/template/attach-template';
import { moveNodesWithReferenceNode } from '../../../light-dom/node/create/reference-node/move-nodes-with-reference-node';
import {
  createReferenceNode, IReferenceNode
} from '../../../light-dom/node/create/reference-node/create-reference-node';
import { ISubscribeFunction } from '@lifaon/rx-js-light';
import { incrementalUUID } from '../../../misc';

export type IReactiveContent = ISubscribeFunction<IDocumentFragmentOrNull>;

export function createReactiveContentNode(
  subscribe: IReactiveContent,
  transparent?: boolean,
): IReferenceNode {
  const referenceNode: IReferenceNode = createReferenceNode(incrementalUUID('REACTIVE-CONTENT'), transparent);

  let nodes: IHTMLTemplateNodeList = [];

  moveNodesWithReferenceNode(
    referenceNode,
    () => nodes,
  );

  subscribeOnNodeConnectedTo<IDocumentFragmentOrNull>(referenceNode, subscribe, (fragment: IDocumentFragmentOrNull) => {
    detachManyNodesWithEvent(nodes); // with events fine because we are connected, so parent cannot be a document fragment
    nodes = attachOptionalTemplateFragment(
      fragment,
      getParentNode(referenceNode) as IParentNode,
      getNextSibling(referenceNode)
    );
  });

  return referenceNode;
}

