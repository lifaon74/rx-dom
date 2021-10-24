import { createNetworkErrorFromResponse } from '@lifaon/rx-js-light';
import { compileReactiveHTMLAsGenericComponentTemplate, ICompileReactiveHTMLAsGenericComponentTemplateOptions } from '../compile';
import { IComponentTemplate } from '../component-template.type';

export interface ILoadReactiveHTMLAsGenericComponentTemplateOptions extends Omit<ICompileReactiveHTMLAsGenericComponentTemplateOptions, 'html'> {
  url: string | URL;
}

export function loadReactiveHTMLAsGenericComponentTemplate<GData extends object>(
  {
    url,
    ...options
  }: ILoadReactiveHTMLAsGenericComponentTemplateOptions,
): Promise<IComponentTemplate<GData>> {
  return fetch((typeof url === 'string') ? url : url.href)
    .then((response: Response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw createNetworkErrorFromResponse(response);
      }
    })
    .then((html: string) => {
      return compileReactiveHTMLAsGenericComponentTemplate({
        ...options,
        html,
      });
    });
}
