import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { IGenericHTMLTemplateOrNull, IHTMLTemplateNodeList } from '../../../light-dom/template/template.type';
import { getParentNode, IParentNode } from '../../../light-dom/node/properties/get-parent-node';
import { getNextSibling } from '../../../light-dom/node/properties/get-next-sibling';
import { detachManyNodesWithEvent } from '../../../light-dom/node/move/node/with-event/bulk/detach-many-nodes-with-event';
import { attachOptionalTemplate } from '../../../light-dom/template/attach-template';
import { moveNodesWithReferenceNode } from '../../../light-dom/node/create/reference-node/move-nodes-with-reference-node';
import {
  createReferenceNode, IReferenceNode
} from '../../../light-dom/node/create/reference-node/create-reference-node';
import { distinctEmitPipe, ISubscribeFunction } from '@lifaon/rx-js-light';
import { incrementalUUID } from '../../../misc';


export function createReactiveSwitchNode<GValue>(
  subscribe: ISubscribeFunction<GValue>,
  templates: Map<GValue, IGenericHTMLTemplateOrNull>,
  defaultTemplate: IGenericHTMLTemplateOrNull = null,
  transparent?: boolean,
): IReferenceNode {
  const referenceNode: IReferenceNode = createReferenceNode(incrementalUUID('SWITCH'), transparent);

  let nodes: IHTMLTemplateNodeList = [];

  moveNodesWithReferenceNode(
    referenceNode,
    () => nodes,
  );

  subscribeOnNodeConnectedTo<GValue>(referenceNode, subscribe, distinctEmitPipe<GValue>()((value: GValue) => {
    detachManyNodesWithEvent(nodes); // with events fine because we are connected, so parent cannot be a document fragment
    nodes = attachOptionalTemplate(
      templates.has(value)
        ? templates.get(value) as IGenericHTMLTemplateOrNull
        : defaultTemplate,
      {},
      getParentNode(referenceNode) as IParentNode,
      getNextSibling(referenceNode)
    );
  }));

  return referenceNode;
}

