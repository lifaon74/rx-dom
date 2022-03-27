import { IObservable } from '@lifaon/rx-js-light';
import { createReferenceNode } from '../../../light-dom/node/create/reference-node/create-reference-node';
import {
  attachOptionalDocumentFragmentToReferenceNode,
} from '../../../light-dom/node/create/reference-node/functions/attach/attach-optional-document-fragment-to-reference-node';
import { moveNodesWithReferenceNode } from '../../../light-dom/node/create/reference-node/functions/move/move-nodes-with-reference-node';
import { IReferenceNodeChildren } from '../../../light-dom/node/create/reference-node/reference-node-children.type';
import { IReferenceNode } from '../../../light-dom/node/create/reference-node/reference-node.type';
import { detachManyNodes } from '../../../light-dom/node/move/derived/batch/detach-many-nodes';
import { IDocumentFragmentOrNull } from '../../../light-dom/node/type/document-fragment-or-null.type';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { createIncrementalUUID } from '../../../misc/uuid/incremental-uuid';

export type IReactiveContent = IObservable<IDocumentFragmentOrNull>;

const INCREMENTAL_REACTIVE_CONTENT_UUID = createIncrementalUUID('REACTIVE-CONTENT');

export function createReactiveContentNode(
  subscribe: IReactiveContent,
  transparent?: boolean,
): IReferenceNode {
  const referenceNode: IReferenceNode = createReferenceNode(INCREMENTAL_REACTIVE_CONTENT_UUID(), transparent);

  let nodes: IReferenceNodeChildren = [];

  moveNodesWithReferenceNode(
    referenceNode,
    () => nodes,
  );

  subscribeOnNodeConnectedTo<IDocumentFragmentOrNull>(referenceNode, subscribe, (fragment: IDocumentFragmentOrNull) => {
    detachManyNodes(nodes);
    nodes = attachOptionalDocumentFragmentToReferenceNode(
      fragment,
      referenceNode,
    );
  });

  return referenceNode;
}

