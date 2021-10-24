import { ISubscribeFunction, mapSubscribePipe, pipeSubscribeFunction } from '@lifaon/rx-js-light';
import {
  createDocumentFragment,
  createTextNode,
  IDocumentFragmentOrNull,
  IGenericHTMLTemplate,
  isDocumentFragment,
  isDOMNode,
  isHTMLTemplate,
  nodeAppendChild,
} from '../../../light-dom';
import { toSubscribeFunctionThrowIfUndefined } from '../../../misc';
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

