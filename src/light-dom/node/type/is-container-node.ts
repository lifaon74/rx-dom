import { ContainerNode } from '../create/__container-node/container-node';

export function isContainerNode(
  node: Node,
): node is ContainerNode {
  return (node instanceof ContainerNode);
}


