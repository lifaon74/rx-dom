import { ISubscribeFunction, mapSubscribePipe, pipeSubscribeFunction } from '@lifaon/rx-js-light';
import { createDocumentFragment } from '../../../light-dom/node/create/create-document-fragment';
import { createTextNode } from '../../../light-dom/node/create/create-text-node';
import { nodeAppendChild } from '../../../light-dom/node/move/derived/dom-like/node/node-append-child';
import { isDocumentFragment } from '../../../light-dom/node/type/is-document-fragment';
import { isDOMNode } from '../../../light-dom/node/type/is-dom-node';
import { IDocumentFragmentOrNull } from '../../../light-dom/template/attach-template';
import { isHTMLTemplate } from '../../../light-dom/template/is-html-template';
import { IGenericHTMLTemplate } from '../../../light-dom/template/template.type';
import { toSubscribeFunctionThrowIfUndefined } from '../../../misc/to-subscribe-function';
import { IReactiveContent } from './create-reactive-content-node';

export type IToReactiveContentValue =
  string
  | DocumentFragment
  | IGenericHTMLTemplate
  | null
  ;

export type IToReactiveContentInput =
  IToReactiveContentValue
  | ISubscribeFunction<IToReactiveContentValue>
  ;

export function toReactiveContent(
  input: IToReactiveContentInput,
): IReactiveContent {
  return pipeSubscribeFunction(toSubscribeFunctionThrowIfUndefined(input), [
    mapSubscribePipe<IToReactiveContentValue, IDocumentFragmentOrNull>((value: IToReactiveContentValue): IDocumentFragmentOrNull => {
      if (value === null) {
        return null;
      } else if (typeof value === 'string') {
        const fragment: DocumentFragment = createDocumentFragment();
        nodeAppendChild(fragment, createTextNode(value));
        return fragment;
      } else if (isDOMNode(value) && isDocumentFragment(value)) {
        return value;
      } else if (isHTMLTemplate(value)) {
        return value({});
      } else {
        throw new Error(`Invalid toReactiveContent value`);
      }
    }),
  ]);
}

