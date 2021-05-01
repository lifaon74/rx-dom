import { onNodeParentChangeListener } from '../../move';
import { IUnsubscribeFunction } from '@lifaon/rx-js-light';
import { getNextSibling, getParentNode, IParentNode } from '../../properties';
import { attachManyNodes } from '../../move/devired/batch/attach-many-nodes';
import { detachManyNodes } from '../../move/devired/batch/detach-many-nodes';

export function moveNodesWithReferenceNode(
  referenceNode: Node,
  listNodes: () => ArrayLike<ChildNode>,
): IUnsubscribeFunction {
  return onNodeParentChangeListener(referenceNode)(() => {
    const parentNode: IParentNode | null = getParentNode(referenceNode);
    if (parentNode === null) {
      detachManyNodes(listNodes());
    } else {
      attachManyNodes(listNodes(), parentNode, getNextSibling(referenceNode));
    }
  });
}
