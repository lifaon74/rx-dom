import { IReferencesMapGetter, IReferencesMapSetter } from '../../reactive-html/references/create-references-map';

/** COMPILE **/

export interface IComponentTemplateCompileOptions {
  dataName?: string;
  contentName?: string;
}

export type IGetNodeReferenceFunction = IReferencesMapGetter<HTMLElement>;
export type ISetNodeReferenceFunction = IReferencesMapSetter<HTMLElement>;
export type IGetTemplateReferenceFunction = IReferencesMapGetter<HTMLElement>;
export type ISetTemplateReferenceFunction = IReferencesMapSetter<HTMLElement>;

export interface ICompiledComponentTemplateFunctionVariables<GData extends object> {
  data: GData;
  content: DocumentFragment;
  getNodeReference: IGetNodeReferenceFunction;
  setNodeReference: ISetNodeReferenceFunction;
  getTemplateReference: IGetTemplateReferenceFunction;
  setTemplateReference: ISetTemplateReferenceFunction;
}

export interface ICompiledComponentTemplateFunction<GData extends object> {
  (
    variables: ICompiledComponentTemplateFunctionVariables<GData>,
    constants: object,
  ): DocumentFragment;
}

/** RUN **/

// export type IComponentTemplateOptions<GData extends object> = Omit<ICompiledComponentTemplateFunctionOptions<GData>, 'constantsToImport'>;

export interface IComponentTemplate<GData extends object> {
  (
    variables: ICompiledComponentTemplateFunctionVariables<GData>,
  ): DocumentFragment;
}

export type IComponentTemplateAsync<GData extends object> =
  IComponentTemplate<GData>
  | Promise<IComponentTemplate<GData>>
  ;

