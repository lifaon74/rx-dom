import { nodeInsertBefore } from '../light-dom';

export function bootstrap(
  node: Element,
  parentNode: Element = document.body,
  referenceNode: Node | null = null,
) {
  nodeInsertBefore(parentNode, node, referenceNode);
}

