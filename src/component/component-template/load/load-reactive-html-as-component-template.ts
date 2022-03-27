import { createNetworkErrorFromResponse } from '@lifaon/rx-js-light';
import { stringOrURLToString } from '../../../misc/types/string-or-url-to-string';
import { IStringOrURL } from '../../../misc/types/string-or-url.type';
import {
  compileReactiveHTMLAsComponentTemplate,
  ICompileReactiveHTMLAsComponentTemplateOptions,
} from '../compile/compile-reactive-html-as-component-template';
import { IComponentTemplate } from '../component-template.type';

export interface ILoadReactiveHTMLAsComponentTemplateOptions extends Omit<ICompileReactiveHTMLAsComponentTemplateOptions, 'html'> {
  url: IStringOrURL;
}

export function loadReactiveHTMLAsComponentTemplate<GData extends object>(
  {
    url,
    ...options
  }: ILoadReactiveHTMLAsComponentTemplateOptions,
): Promise<IComponentTemplate<GData>> {
  return fetch(stringOrURLToString(url))
    .then((response: Response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw createNetworkErrorFromResponse(response);
      }
    })
    .then((html: string) => {
      return compileReactiveHTMLAsComponentTemplate({
        ...options,
        html,
      });
    });
}
