import { compileAndEvaluateReactiveHTMLAsComponentTemplate } from '../compile/with-evaluation/compile-and-evaluate-reactive-html-as-component-template';
import { createNetworkErrorFromResponse } from '@lifaon/rx-js-light';
import { IComponentTemplate, IComponentTemplateCompileOptions } from '../component-template.type';


export function loadCompileAndEvaluateReactiveHTMLAsComponentTemplate<GData extends object>(
  url: string,
  constantsToImport: object,
  options?: IComponentTemplateCompileOptions,
): Promise<IComponentTemplate<GData>> {
  return fetch(url)
    .then((response: Response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw createNetworkErrorFromResponse(response);
      }
    })
    .then((content: string) => {
      return compileAndEvaluateReactiveHTMLAsComponentTemplate(content, constantsToImport, options);
    });
}
