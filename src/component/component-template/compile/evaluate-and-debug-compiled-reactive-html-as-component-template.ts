import { stringToLinesRaw } from '../../../transpilers';
import { ICompiledComponentTemplateFunctionVariables, IComponentTemplate } from '../component-template.type';
import { evaluateTranspiledReactiveHTMLAsComponentTemplate } from './evaluate-transpiled-reactive-html-as-component-template';

function copyToClipboard(
  text: string,
): Promise<void> {
  window.focus();
  return navigator.clipboard.writeText(text)
    .then(
      () => {
        console.warn('Copied into clipboard');
      },
      (error: Error) => {
        console.error(`Unable to copy into your clipboard: ${error.message}`);
      },
    );
}

export function evaluateAndDebugCompiledReactiveHtmlAsComponentTemplate<GData extends object>(
  compiledReactiveHTML: string,
  constantsToImport: object,
): IComponentTemplate<GData> {
  let componentTemplate: IComponentTemplate<GData>;
  try {
    componentTemplate = evaluateTranspiledReactiveHTMLAsComponentTemplate(compiledReactiveHTML, constantsToImport);
  } catch (error) {
    if (stringToLinesRaw(compiledReactiveHTML).length < 50) {
      console.log(compiledReactiveHTML);
    }
    copyToClipboard(compiledReactiveHTML);
    throw error;
  }

  return (variables: ICompiledComponentTemplateFunctionVariables<GData>): DocumentFragment => {
    try {
      return componentTemplate(variables);
    } catch (error: any) {
      debugComponentTemplateError(error, compiledReactiveHTML);
      throw error;
    }
  };
}

export function debugComponentTemplateError(
  error: Error,
  compiledReactiveHTML: string,
  lineOffset: number = -2,
): void {
  if (error.stack) {
    const reg: RegExp = /<anonymous>:(\d+)\:(\d+)/;
    const stack: string[] = error.stack.split('\n');
    for (let i = 1, l = stack.length; i < l; i++) {
      const stackLine: string = stack[i];
      const match: RegExpExecArray | null = reg.exec(stackLine);
      if (match !== null) {
        const line: number = parseInt(match[1], 10) - 1 + lineOffset;
        const column: number = parseInt(match[2], 10);
        const lines: string[] = stringToLinesRaw(compiledReactiveHTML);
        console.log(
          `%cError '${error.message}' at ${line + 1}:${column}: \n`
          + '%c' + lines.slice(line - 3, line).join('\n') + '\n'
          + '%c' + lines[line] + '\n'
          + '%c' + lines.slice(line + 1, line + 4).join('\n')
          , `color: #f00`, `color: #000`, `color: #f50`, `color: #000`);

        const copy = () => {
          return copyToClipboard(compiledReactiveHTML);
        };

        const log = () => {
          console.log(compiledReactiveHTML);
        };

        console.log(`Type log() to output the compiled reactive html`);

        debugger;
        break;
      }
    }
  }
}
