import { linesToString } from '../../../transpilers/helpers/lines-formatting-helpers';
import {
  transpileReactiveHTMLAsRawComponentTemplateFunctionWithImportsAsFirstArgumentToReactiveDOMJSLines,
} from '../../../transpilers/reactive-html/html/transpile-reactive-html-as-raw-component-template-function-with-imports-as-first-argument-to-reactive-dom-js-lines';
import {
  IRawComponentTemplateFunctionWithImportsAsFirstArgument,
} from '../../../transpilers/reactive-html/html/types/raw-component-template-function-with-imports-as-first-argument.type';
import { IRawComponentTemplateFunctionArguments } from '../../../transpilers/reactive-html/html/types/raw-component-template-function.type';
import {
  DEFAULT_REQUIRE_EXTERNAL_FUNCTION_CONSTANTS_TO_IMPORT,
} from '../../../transpilers/reactive-html/require-external/default-require-external-function-constants-to-import.constant';
import { IComponentTemplate } from '../component-template.type';
import {
  convertRawComponentTemplateToComponentTemplate,
  IConvertRawComponentTemplateToComponentTemplateOptions,
} from '../convert/convert-raw-component-template-to-component-template';

export interface ICompileReactiveHTMLAsComponentTemplateOptions extends Omit<IConvertRawComponentTemplateToComponentTemplateOptions<any>, 'template'> {
  html: string;
}

export function compileReactiveHTMLAsComponentTemplate<GData extends object>(
  {
    html,
    ...options
  }: ICompileReactiveHTMLAsComponentTemplateOptions,
): IComponentTemplate<GData> {
  const compiledReactiveHTML: string = linesToString(
    transpileReactiveHTMLAsRawComponentTemplateFunctionWithImportsAsFirstArgumentToReactiveDOMJSLines(html),
  );

  const rawComponentTemplateFunctionWithImportsAsFirstArgument: IRawComponentTemplateFunctionWithImportsAsFirstArgument<GData> = new Function(
    '...a',
    `return(${compiledReactiveHTML})(...a);`,
  ) as IRawComponentTemplateFunctionWithImportsAsFirstArgument<GData>;

  const template = <GParentNode extends Node>(
    ...args: [
      GParentNode,
      ...IRawComponentTemplateFunctionArguments<GData>
    ]
  ): GParentNode => {
    return rawComponentTemplateFunctionWithImportsAsFirstArgument<GParentNode>(
      DEFAULT_REQUIRE_EXTERNAL_FUNCTION_CONSTANTS_TO_IMPORT,
      ...args,
    );
  };

  return convertRawComponentTemplateToComponentTemplate<GData>({
    template,
    ...options,
  });
}


