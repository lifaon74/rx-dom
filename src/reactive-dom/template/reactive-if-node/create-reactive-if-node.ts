import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { IGenericHTMLTemplateOrNull, IHTMLTemplateNodeList } from '../../../light-dom/template/template.type';
import { getParentNode, IParentNode } from '../../../light-dom/node/properties/get-parent-node';
import { getNextSibling } from '../../../light-dom/node/properties/get-next-sibling';
import { attachOptionalTemplate } from '../../../light-dom/template/attach-template';
import { moveNodesWithReferenceNode } from '../../../light-dom/node/create/reference-node/move-nodes-with-reference-node';
import {
  createReferenceNode, IReferenceNode
} from '../../../light-dom/node/create/reference-node/create-reference-node';
import { distinctEmitPipe, ISubscribeFunction } from '@lifaon/rx-js-light';
import { incrementalUUID } from '../../../misc';
import { detachManyNodes } from '../../../light-dom/node/move/devired/batch/detach-many-nodes';


export function createReactiveIfNode(
  subscribe: ISubscribeFunction<boolean>,
  templateTrue: IGenericHTMLTemplateOrNull = null,
  templateFalse: IGenericHTMLTemplateOrNull = null,
  transparent?: boolean,
): IReferenceNode {
  const referenceNode: IReferenceNode = createReferenceNode(incrementalUUID('IF'), transparent);

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
      getNextSibling(referenceNode)
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
