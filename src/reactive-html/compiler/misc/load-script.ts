export function loadScript(
  url: string,
): Promise<void> {
  return new Promise<void>((
    resolve: (value: void | PromiseLike<void>) => void,
    reject: (reason?: any) => void,
  ): void => {
    const scriptElement: HTMLScriptElement = document.createElement('script');

    const clear = () => {
      // document.head.removeChild(scriptElement);
    };

    scriptElement.onerror = () => {
      clear();
      reject(new Error(`Failed to load`));
    };

    scriptElement.onload = () => {
      clear();
      resolve();
    };

    scriptElement.src = url;

    document.head.appendChild(scriptElement);
  });
}
