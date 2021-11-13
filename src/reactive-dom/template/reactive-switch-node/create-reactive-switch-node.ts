import { distinctObserverPipe, IObservable } from '@lifaon/rx-js-light';
import { createReferenceNode, IReferenceNode } from '../../../light-dom/node/create/reference-node/create-reference-node';
import { moveNodesWithReferenceNode } from '../../../light-dom/node/create/reference-node/move-nodes-with-reference-node';
import { detachManyNodes } from '../../../light-dom/node/move/derived/batch/detach-many-nodes';
import { getNextSibling } from '../../../light-dom/node/properties/get-next-sibling';
import { getParentNode, IParentNode } from '../../../light-dom/node/properties/get-parent-node';
import { attachOptionalTemplate } from '../../../light-dom/template/attach-template';
import { IGenericHTMLTemplateOrNull, IHTMLTemplateNodeList } from '../../../light-dom/template/template.type';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { createIncrementalUUID } from '../../../misc/uuid/incremental-uuid';

const INCREMENTAL_SWITCH_UUID = createIncrementalUUID('SWITCH');

export function createReactiveSwitchNode<GValue>(
  subscribe: IObservable<GValue>,
  templates: Map<GValue, IGenericHTMLTemplateOrNull>,
  defaultTemplate: IGenericHTMLTemplateOrNull = null,
  transparent?: boolean,
): IReferenceNode {
  const referenceNode: IReferenceNode = createReferenceNode(INCREMENTAL_SWITCH_UUID(), transparent);

  let nodes: IHTMLTemplateNodeList = [];

  moveNodesWithReferenceNode(
    referenceNode,
    () => nodes,
  );

  subscribeOnNodeConnectedTo<GValue>(referenceNode, subscribe, distinctObserverPipe<GValue>()((value: GValue) => {
    detachManyNodes(nodes); // with events fine because we are connected, so parent cannot be a document fragment
    nodes = attachOptionalTemplate(
      templates.has(value)
        ? templates.get(value) as IGenericHTMLTemplateOrNull
        : defaultTemplate,
      {},
      getParentNode(referenceNode) as IParentNode,
      getNextSibling(referenceNode),
    );
  }));

  return referenceNode;
}

