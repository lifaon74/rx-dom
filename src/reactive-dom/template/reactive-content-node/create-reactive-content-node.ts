import { ISubscribeFunction } from '@lifaon/rx-js-light';
import { createReferenceNode, IReferenceNode } from '../../../light-dom/node/create/reference-node/create-reference-node';
import { moveNodesWithReferenceNode } from '../../../light-dom/node/create/reference-node/move-nodes-with-reference-node';
import { detachManyNodes } from '../../../light-dom/node/move/devired/batch/detach-many-nodes';
import { getNextSibling } from '../../../light-dom/node/properties/get-next-sibling';
import { getParentNode, IParentNode } from '../../../light-dom/node/properties/get-parent-node';
import { attachOptionalTemplateFragment, IDocumentFragmentOrNull } from '../../../light-dom/template/attach-template';
import { IHTMLTemplateNodeList } from '../../../light-dom/template/template.type';
import { createIncrementalUUID } from '../../../misc';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';

export type IReactiveContent = ISubscribeFunction<IDocumentFragmentOrNull>;

const INCREMENTAL_REACTIVE_CONTENT_UUID = createIncrementalUUID('REACTIVE-CONTENT');

export function createReactiveContentNode(
  subscribe: IReactiveContent,
  transparent?: boolean,
): IReferenceNode {
  const referenceNode: IReferenceNode = createReferenceNode(INCREMENTAL_REACTIVE_CONTENT_UUID(), transparent);

  let nodes: IHTMLTemplateNodeList = [];

  moveNodesWithReferenceNode(
    referenceNode,
    () => nodes,
  );

  subscribeOnNodeConnectedTo<IDocumentFragmentOrNull>(referenceNode, subscribe, (fragment: IDocumentFragmentOrNull) => {
    detachManyNodes(nodes);
    nodes = attachOptionalTemplateFragment(
      fragment,
      getParentNode(referenceNode) as IParentNode,
      getNextSibling(referenceNode),
    );
  });

  return referenceNode;
}

