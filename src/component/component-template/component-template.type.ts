export interface IComponentTemplateCompileOptions {
  dataName?: string;
  contentName?: string;
}

export interface IComponentTemplate<GData extends object> {
  (data: GData, content: DocumentFragment): DocumentFragment;
}

export type IComponentTemplateAsync<GData extends object> =
  IComponentTemplate<GData>
  | Promise<IComponentTemplate<GData>>
  ;



