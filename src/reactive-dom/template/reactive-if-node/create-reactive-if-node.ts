import { distinctEmitPipe, ISubscribeFunction } from '@lifaon/rx-js-light';
import { createReferenceNode, IReferenceNode } from '../../../light-dom/node/create/reference-node/create-reference-node';
import { moveNodesWithReferenceNode } from '../../../light-dom/node/create/reference-node/move-nodes-with-reference-node';
import { detachManyNodes } from '../../../light-dom/node/move/derived/batch/detach-many-nodes';
import { getNextSibling } from '../../../light-dom/node/properties/get-next-sibling';
import { getParentNode, IParentNode } from '../../../light-dom/node/properties/get-parent-node';
import { attachOptionalTemplate } from '../../../light-dom/template/attach-template';
import { IGenericHTMLTemplateOrNull, IHTMLTemplateNodeList } from '../../../light-dom/template/template.type';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { createIncrementalUUID } from '../../../misc/uuid/incremental-uuid';

const INCREMENTAL_IF_UUID = createIncrementalUUID('IF');

export function createReactiveIfNode(
  subscribe: ISubscribeFunction<boolean>,
  templateTrue: IGenericHTMLTemplateOrNull = null,
  templateFalse: IGenericHTMLTemplateOrNull = null,
  transparent?: boolean,
): IReferenceNode {
  const referenceNode: IReferenceNode = createReferenceNode(INCREMENTAL_IF_UUID(), transparent);

  let nodes: IHTMLTemplateNodeList = [];

  moveNodesWithReferenceNode(
    referenceNode,
    () => nodes,
  );

  subscribeOnNodeConnectedTo<boolean>(referenceNode, subscribe, distinctEmitPipe<boolean>()((value: boolean) => {
    detachManyNodes(nodes); // with events fine because we are connected, so parent cannot be a document fragment
    nodes = attachOptionalTemplate(
      (
        value
          ? templateTrue
          : templateFalse
      ),
      {},
      getParentNode(referenceNode) as IParentNode,
      getNextSibling(referenceNode),
    );
  }));

  return referenceNode;
}

// export function createReactiveIfNode(
//   subscribe: ISubscribeFunction<boolean>,
//   templateTrue: ITemplate<[]> = createDocumentFragment,
//   templateFalse: ITemplate<[]> = createDocumentFragment,
// ): Comment {
//   const containerNode: ContainerNode = new ContainerNode(`IF - ${ uuid() }`, false);
//
//   let nodes: ITemplateNodeList = [];
//
//   subscribeOnNodeConnectedTo<boolean>(containerNode, subscribe, (value: boolean) => {
//     for (let i = 0, l = nodes.length; i < l; i++) {
//       detachNodeWithEvent(nodes[i]);
//     }
//     nodes = attachTemplate<[]>(
//       value
//         ? templateTrue
//         : templateFalse,
//       [],
//       containerNode,
//       null
//     );
//   });
//
//   return containerNode;
// }

// export function attachReactiveIf(
//   subscribe: ISubscribeFunction<boolean>,
//   templateTrue: ITemplate<[]> | null,
//   templateFalse: ITemplate<[]> | null,
//   parentNode: Node,
//   referenceNode: Node | null = null,
//   transparent: boolean = false,
// ): void {
//   const _referenceNode: Text | Comment = transparent
//       ? createTextNode()
//       : createCommentNode(`IF - ${ uuid() }`);
//   attachNode(_referenceNode, parentNode, referenceNode);
//
//   let nodes: ITemplateNodeList = [];
//
//   subscribeOnNodeConnectedTo<boolean>(referenceNode, subscribe, (value: boolean) => {
//     for (let i = 0, l = nodes.length; i < l; i++) {
//       detachNodeWithEvent(nodes[i]);
//     }
//     nodes = attachTemplate<[]>(
//       value
//         ? templateTrue
//         : templateFalse,
//       [],
//       referenceNode,
//       null
//     );
//   });
//
//   return referenceNode;
// }
