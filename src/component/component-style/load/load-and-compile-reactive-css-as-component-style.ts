import { compileReactiveCSSAsComponentStyle } from '../compile/compile-reactive-css-as-component-style';
import { createNetworkErrorFromResponse } from '@lifaon/rx-js-light';


export function loadAndCompileReactiveCSSAsComponentStyle(
  url: string,
): Promise<HTMLStyleElement> {
  return fetch(url)
    .then((response: Response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw createNetworkErrorFromResponse(response);
      }
    })
    .then((content: string) => {
      return compileReactiveCSSAsComponentStyle(content);
    });
}
