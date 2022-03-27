import { distinctObserverPipe, IObservable } from '@lifaon/rx-js-light';
import { createReferenceNode } from '../../../light-dom/node/create/reference-node/create-reference-node';
import {
  attachOptionalReactiveHTMLTemplateToReferenceNode,
} from '../../../light-dom/node/create/reference-node/functions/attach/attach-optional-reactive-html-template-to-reference-node';
import { moveNodesWithReferenceNode } from '../../../light-dom/node/create/reference-node/functions/move/move-nodes-with-reference-node';
import { IReferenceNodeChildren } from '../../../light-dom/node/create/reference-node/reference-node-children.type';
import { IReferenceNode } from '../../../light-dom/node/create/reference-node/reference-node.type';
import { detachManyNodes } from '../../../light-dom/node/move/derived/batch/detach-many-nodes';
import { IGenericReactiveHTMLTemplateOrNull } from '../../../light-dom/template/reactive-html-template.type';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { createIncrementalUUID } from '../../../misc/uuid/incremental-uuid';

const INCREMENTAL_SWITCH_UUID = createIncrementalUUID('SWITCH');

export function createReactiveSwitchNode<GValue>(
  subscribe: IObservable<GValue>,
  templates: Map<GValue, IGenericReactiveHTMLTemplateOrNull>,
  defaultTemplate: IGenericReactiveHTMLTemplateOrNull = null,
  transparent?: boolean,
): IReferenceNode {
  const referenceNode: IReferenceNode = createReferenceNode(INCREMENTAL_SWITCH_UUID(), transparent);

  let nodes: IReferenceNodeChildren = [];

  moveNodesWithReferenceNode(
    referenceNode,
    () => nodes,
  );

  subscribeOnNodeConnectedTo<GValue>(referenceNode, subscribe, distinctObserverPipe<GValue>()((value: GValue) => {
    detachManyNodes(nodes); // with events fine because we are connected, so parent cannot be a document fragment
    nodes = attachOptionalReactiveHTMLTemplateToReferenceNode(
      templates.get(value) ?? defaultTemplate,
      {},
      referenceNode,
    );
  }));

  return referenceNode;
}

