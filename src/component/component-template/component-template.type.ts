/** COMPILE **/

export interface IComponentTemplateCompileOptions {
  dataName?: string;
  contentName?: string;
}

export interface ICompiledComponentTemplateFunctionVariables<GData extends object> {
  data: GData;
  content: DocumentFragment;
}

export interface ICompiledComponentTemplateFunction<GData extends object> {
  (
    variables: ICompiledComponentTemplateFunctionVariables<GData>,
    constants: object,
  ): DocumentFragment;
}

/** RUN **/

export interface IComponentTemplate<GData extends object> {
  (
    variables: ICompiledComponentTemplateFunctionVariables<GData>,
  ): DocumentFragment;
}
