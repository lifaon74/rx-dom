import { ContainerNode } from './container-node';

export function isContainerNode(
  node: Node,
): node is ContainerNode {
  return (node instanceof ContainerNode);
}


