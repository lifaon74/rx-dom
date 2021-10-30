import { INodeOrString, nodeOrStringAsNode } from '../../../../create/derived/node-or-string-as-node';
import { getFirstChild } from '../../../../properties/get-first-child';
import { nodeInsertBefore } from '../node/node-insert-before';

/**
 * Equivalent of:
 *  node.prepend(...nodes: (Node | string)[]): void;
 */
export function nodePrepend(
  node: ParentNode & Node,
  nodes: INodeOrString[],
): void {
  const firstChild: ChildNode | null = getFirstChild(node);
  for (let i = 0, l = nodes.length; i < l; i++) {
    nodeInsertBefore(
      node,
      nodeOrStringAsNode(nodes[i]),
      firstChild,
    );
  }
}
