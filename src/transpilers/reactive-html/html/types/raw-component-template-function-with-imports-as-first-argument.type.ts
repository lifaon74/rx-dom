import { IRawComponentTemplateFunctionArguments } from './raw-component-template-function.type';

export interface IRawComponentTemplateFunctionWithImportsAsFirstArgument<GData extends object> {
  <GParentNode extends Node>(
    toImport: object, // what to import
    parentNode: GParentNode,
    ...args: IRawComponentTemplateFunctionArguments<GData>
  ): GParentNode;
}

