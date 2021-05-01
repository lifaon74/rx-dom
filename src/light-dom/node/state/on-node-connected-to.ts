import { getParentNode } from '../properties/get-parent-node';
import {
  IEmitFunction, ISubscribeFunction, IUnsubscribeFunction, noop, pipeSubscribeFunction, shareSubscribePipe
} from '@lifaon/rx-js-light';
import { getDocument } from '../explore';
import { onNodeParentChangeListener } from '../move';
import { getShadowRootHost } from '../properties/get-shadow-root-host';
import { documentFragmentIsAShadowRoot } from '../shadow';
import { isDocumentFragment } from '../type';
import { nodeContainsTraversingShadowDOM } from '../explore/node-contains-traversing-shadow-dom';
import { nodeContains } from '../explore/node-contains';

export interface IOnNodeConnectedToOptions {
  traverseShadowDOM?: boolean;
}

export function onNodeConnectedTo(
  node: Node,
  parentNode: Node = getDocument(),
  {
    traverseShadowDOM = true,
  }: IOnNodeConnectedToOptions = {},
): ISubscribeFunction<boolean> {
  if (node === parentNode) {
    throw new Error(`Invalid parentNode`);
  }

  return (emit: IEmitFunction<boolean>): IUnsubscribeFunction => {
    let running: boolean = true;
    let _unsubscribeFunctions: IUnsubscribeFunction[] = [];
    let _connected: boolean = traverseShadowDOM
      ? nodeContainsTraversingShadowDOM(parentNode, node)
      : nodeContains(parentNode, node);

    const update = (
      referenceNode: Node,
    ): void => {
      let _node: Node = referenceNode;

      while (true) {
        const index: number = _unsubscribeFunctions.length;
        const _isDocumentFragment: boolean = isDocumentFragment(_node);

        _unsubscribeFunctions.push(
          _isDocumentFragment
            ? noop
            // if any of node or its parents have a change in their parent, the node referenceNode change
            : onNodeParentChangeListener(_node)((): void => {
              // removes all unsubscribeFunctions for parents over this node
              while (_unsubscribeFunctions.length > index) {
                (_unsubscribeFunctions.pop() as IUnsubscribeFunction)();
              }
              update(referenceNode);
            })
        );

        const _parentNode: Node | null = (traverseShadowDOM && _isDocumentFragment && documentFragmentIsAShadowRoot(_node as DocumentFragment))
          ? getShadowRootHost(_node as ShadowRoot)
          : getParentNode(_node);

        if (_parentNode === null) {
          if (_connected) {
            _connected = false;
            emit(false);
          }
          break;
        } else if (_parentNode === parentNode) {
          if (!_connected) {
            _connected = true;
            emit(true);
          }
          break;
        } else {
          _node = _parentNode;
        }
      }
    };

    update(node);

    return (): void => {
      if (running) {
        running = false;
        for (let i = 0, l = _unsubscribeFunctions.length; i < l; i++) {
          _unsubscribeFunctions[i]();
        }
      }
    };
  };
}


export function onNodeConnectedToWithImmediate(
  node: Node,
  parentNode: Node = getDocument(),
  options?: IOnNodeConnectedToOptions,
): ISubscribeFunction<boolean> {
  const listener: ISubscribeFunction<boolean> = onNodeConnectedTo(node, parentNode, options);
  return (emit: IEmitFunction<boolean>): IUnsubscribeFunction => {
    emit(parentNode.contains(node));
    return listener(emit);
  };
}


/*---*/

const ON_NODE_CONNECTED_TO_CACHE = new WeakMap<Node, WeakMap<Node, Map<string, ISubscribeFunction<boolean>>>>();

export function onNodeConnectedToCached(
  node: Node,
  parentNode: Node = getDocument(),
  options: IOnNodeConnectedToOptions = {},
): ISubscribeFunction<boolean> {
  let map1 = ON_NODE_CONNECTED_TO_CACHE.get(node);
  if (map1 === void 0) {
    map1 = new WeakMap<Node, Map<string, ISubscribeFunction<boolean>>>();
    ON_NODE_CONNECTED_TO_CACHE.set(node, map1);
  }

  let map2 = map1.get(parentNode);
  if (map2 === void 0) {
    map2 = new Map<string, ISubscribeFunction<boolean>>();
    map1.set(parentNode, map2);
  }

  const _options: string = JSON.stringify(options);
  let subscribe = map2.get(_options);
  if (subscribe === void 0) {
    subscribe = pipeSubscribeFunction(onNodeConnectedTo(node, parentNode), [
      shareSubscribePipe<boolean>(),
    ]);
    map2.set(_options, subscribe);
  }

  return subscribe;
}


export function onNodeConnectedToWithImmediateCached(
  node: Node,
  parentNode: Node = getDocument(),
  options?: IOnNodeConnectedToOptions,
): ISubscribeFunction<boolean> {
  const traverseShadowDOM: boolean = ((options === void 0) || (options.traverseShadowDOM === void 0))
    ? true
    : options.traverseShadowDOM;

  const listener: ISubscribeFunction<boolean> = onNodeConnectedToCached(node, parentNode);
  return (emit: IEmitFunction<boolean>): IUnsubscribeFunction => {
    emit(
      traverseShadowDOM
        ? nodeContainsTraversingShadowDOM(parentNode, node)
        : nodeContains(parentNode, node)
    );
    return listener(emit);
  };
}

// // TODO cache options too
// const ON_NODE_CONNECTED_TO_CACHE = new WeakMap<Node, WeakMap<Node, ISubscribeFunction<boolean>>>();
//
// export function onNodeConnectedToCached(
//   node: Node,
//   parentNode: Node = getDocument(),
// ): ISubscribeFunction<boolean> {
//   let map1 = ON_NODE_CONNECTED_TO_CACHE.get(node);
//   if (map1 === void 0) {
//     map1 = new WeakMap<Node, ISubscribeFunction<boolean>>();
//     ON_NODE_CONNECTED_TO_CACHE.set(node, map1);
//   }
//
//
//   let subscribe = map1.get(parentNode);
//   if (subscribe === void 0) {
//     subscribe = pipeSubscribeFunction(onNodeConnectedTo(node, parentNode), [
//       shareSubscribePipe<boolean>(),
//     ]);
//     map1.set(parentNode, subscribe);
//   }
//
//   return subscribe;
// }
//
//
// export function onNodeConnectedToWithImmediateCached(
//   node: Node,
//   parentNode: Node = getDocument(),
// ): ISubscribeFunction<boolean> {
//   const listener: ISubscribeFunction<boolean> = onNodeConnectedToCached(node, parentNode);
//   return (emit: IEmitFunction<boolean>): IUnsubscribeFunction => {
//     emit(parentNode.contains(node));
//     return listener(emit);
//   };
// }
